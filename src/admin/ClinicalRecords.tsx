import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Lock, Save, History, AlertTriangle, Calendar as CalendarIcon, Check, Loader2 } from 'lucide-react';
import { getAccessToken } from '../lib/auth';
import { format, addDays } from 'date-fns';

export const ClinicalRecords: React.FC = () => {
  const { patientId } = useParams();
  const [recordText, setRecordText] = useState("");
  
  // Scheduling state
  const [showSchedule, setShowSchedule] = useState(false);
  const [nextApptDate, setNextApptDate] = useState(format(addDays(new Date(), 7), "yyyy-MM-dd'T'14:00"));
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    // Check if user is authenticated with Google Calendar
    getAccessToken().then(token => !!token).then(setHasToken);
  }, []);

  const handleScheduleNext = async () => {
    const token = await getAccessToken();
    if (!token) {
      alert("Conecte sua conta do Google Calendar na página de Configurações primeiro.");
      return;
    }

    setIsScheduling(true);
    setScheduleSuccess(false);

    try {
      const eventStart = new Date(nextApptDate);
      const eventEnd = new Date(eventStart.getTime() + 50 * 60 * 1000); // 50 mins session

      const event = {
        summary: `Sessão Liva - Paciente #${patientId || '1'}`,
        description: `Agendamento automático criado via prontuário Liva.`,
        start: {
          dateTime: eventStart.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: eventEnd.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 30 },
          ],
        },
      };

      const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (!res.ok) throw new Error("Erro ao criar evento na agenda");
      
      setScheduleSuccess(true);
      setTimeout(() => {
        setShowSchedule(false);
        setScheduleSuccess(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      alert("Houve um erro ao agendar no Google Calendar. Verifique suas permissões.");
    } finally {
      setIsScheduling(false);
    }
  };
  
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-brand-600 mb-2">
          <Lock className="w-5 h-5" />
          <span className="font-medium text-sm">Ambiente Seguro (Conformidade LGPD)</span>
        </div>
        <h2 className="text-2xl font-display font-semibold text-gray-900">
          Prontuário Eletrônico do Paciente
        </h2>
        <p className="text-sm text-gray-500">
          Paciente Ref: #{patientId || '1'} (Rafael Silva). 
          Os dados inseridos aqui são criptografados antes de serem persistidos no banco de dados. Apenas o SEU usuário autenticado no Firebase (Firestore Rule: "Strict access for clinical records owner only") tem permissão de descriptografar e visualizar este texto.
        </p>
      </div>

      <div className="bg-white border text-gray-800 border-gray-200 rounded-2xl shadow-sm p-6 relative">
        <label className="block text-sm font-medium text-gray-700 mb-4">Nova Evolução Clínica (Criptografada e protegida por RLS)</label>
        <textarea 
          className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none resize-none font-sans"
          placeholder="O paciente relatou que ao longo da semana..."
          value={recordText}
          onChange={(e) => setRecordText(e.target.value)}
        ></textarea>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-6 border-b border-gray-100 pb-6 mb-4">
          <div className="flex items-center gap-2 text-xs text-brand-600 bg-brand-50 px-3 py-2 rounded-lg border border-brand-100">
            <Lock className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Criptografado com chaves AES-256 no banco e AES-GCM em tempo de trânsito.</span>
          </div>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-600 text-white px-6 py-3 sm:py-2.5 rounded-xl text-sm font-medium hover:bg-brand-700 transition-colors">
            <Save className="w-4 h-4" />
            Salvar Evolução Criptografada
          </button>
        </div>

        {/* Schedule next appointment integration */}
        <div className="pt-2">
          {!showSchedule ? (
            <button 
              onClick={() => setShowSchedule(true)}
              className="flex items-center gap-2 text-gray-600 font-medium text-sm hover:text-brand-600 transition-colors"
            >
              <CalendarIcon className="w-4 h-4" />
              Agendar próxima sessão no Google Calendar
            </button>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
               <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
                 <CalendarIcon className="w-5 h-5 text-gray-400" />
                 <input 
                   type="datetime-local" 
                   className="w-full sm:w-auto bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                   value={nextApptDate}
                   onChange={(e) => setNextApptDate(e.target.value)}
                 />
               </div>
               <div className="flex items-center gap-2 w-full sm:w-auto">
                 <button 
                    onClick={() => setShowSchedule(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition"
                    disabled={isScheduling}
                 >
                    Cancelar
                 </button>
                 <button 
                    onClick={handleScheduleNext}
                    disabled={isScheduling || !hasToken || scheduleSuccess}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#4285F4] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#3367D6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {isScheduling ? <Loader2 className="w-4 h-4 animate-spin" /> : 
                     scheduleSuccess ? <Check className="w-4 h-4" /> : null}
                    {scheduleSuccess ? 'Sincronizado!' : 
                     !hasToken ? 'Conecte o Calendar' : 'Sincronizar Agenda'}
                 </button>
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
          <History className="w-5 h-5 text-gray-500" />
          Histórico de Evoluções
        </h3>

        <div className="space-y-4">
          <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm relative">
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mb-3">
              <span className="text-sm font-medium text-gray-500">14 de Maio, 2026</span>
              <div className="self-start sm:self-auto flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">
                <Lock className="w-3 h-3" />
                Descriptografado
              </div>
            </div>
            <p className="text-gray-800 text-sm leading-relaxed">
              Paciente relata melhora na higiene do sono. Discutimos ferramentas de descompressão antes de dormir.
            </p>
          </div>
          
          <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm relative">
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mb-3">
              <span className="text-sm font-medium text-gray-500">07 de Maio, 2026</span>
              <div className="self-start sm:self-auto flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">
                <Lock className="w-3 h-3" />
                Descriptografado
              </div>
            </div>
            <p className="text-gray-800 text-sm leading-relaxed">
              Primeira sessão. Coleta de histórico da ansiedade e problemas recentes no trabalho. Definimos meta de entender os gatilhos emocionais.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
         <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
         <div>
           <h4 className="text-sm font-medium text-yellow-900">Retenção de Arquivos (Resolução CFP Nº 01/2009)</h4>
           <p className="text-xs text-yellow-800 mt-1 max-w-2xl leading-relaxed">
             A Liva garante o armazenamento dos seus prontuários pelo período mínimo de 5 (cinco) anos após o último atendimento. Após este período, você pode solicitar a exclusão definitiva ou exportação dos mesmos no formato estruturado para sua guarda pessoal.
           </p>
         </div>
      </div>
    </div>
  );
};
