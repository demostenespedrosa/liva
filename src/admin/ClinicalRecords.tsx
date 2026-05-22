import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Lock, Save, History, AlertTriangle, Calendar as CalendarIcon, Check, Loader2, BrainCircuit, Activity, ChevronDown, BellRing } from 'lucide-react';
import { getAccessToken } from '../lib/auth';
import { format, addDays } from 'date-fns';

export const ClinicalRecords: React.FC = () => {
  const { patientId } = useParams();
  const [recordText, setRecordText] = useState("");
  const [activeTab, setActiveTab] = useState<'pep' | 'intelligence'>('pep');
  const [approachTemplate, setApproachTemplate] = useState('tcc');
  
  // Scheduling state
  const [showSchedule, setShowSchedule] = useState(false);
  const [nextApptDate, setNextApptDate] = useState(format(addDays(new Date(), 7), "yyyy-MM-dd'T'14:00"));
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    getAccessToken().then(token => !!token).then(setHasToken);
  }, []);

  const handleApplyTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
     const value = e.target.value;
     setApproachTemplate(value);
     if (value === 'tcc') {
        setRecordText("1. Humor/Queixa Principal:\n\n2. Ponte com a última sessão:\n\n3. Pauta da sessão (Agenda):\n\n4. Intervenções / Técnicas Utilizadas:\n\n5. Plano de Ação (Para casa):\n");
     } else if (value === 'psicanalise') {
        setRecordText("Associações Livres:\n\nTransferência / Contratransferência:\n\nElaborações do Analista:\n");
     } else if (value === 'humanista') {
        setRecordText("Sentimentos e vivências emergentes:\n\nProcessos de atualização e congruência:\n\nReflexões facilitadoras:\n");
     } else {
        setRecordText("");
     }
  };

  const handleScheduleNext = async () => {
    // Keep existing integration logic
    const token = await getAccessToken();
    if (!token) {
      alert("Conecte sua conta do Google Calendar na página de Configurações primeiro.");
      return;
    }

    setIsScheduling(true);
    setScheduleSuccess(false);

    try {
      const eventStart = new Date(nextApptDate);
      const eventEnd = new Date(eventStart.getTime() + 50 * 60 * 1000);

      const event = {
        summary: `Sessão Liva - Paciente #${patientId || '1'}`,
        description: `Agendamento automático criado via prontuário Liva.`,
        start: { dateTime: eventStart.toISOString(), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
        end: { dateTime: eventEnd.toISOString(), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
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
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
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

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-6">
         <button 
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'pep' ? 'border-brand-600 text-brand-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('pep')}
         >
            Evolução (PEP)
         </button>
         <button 
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'intelligence' ? 'border-brand-600 text-brand-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('intelligence')}
         >
            <BrainCircuit className="w-4 h-4" /> Inteligência Clínica
         </button>
      </div>

      {activeTab === 'pep' && (
         <div className="bg-white border text-gray-800 border-gray-200 rounded-2xl shadow-sm p-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
               <label className="block text-sm font-medium text-gray-700">Nova Evolução Clínica</label>
               <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <span className="text-xs text-gray-500 font-medium">Template:</span>
                  <select 
                     value={approachTemplate}
                     onChange={handleApplyTemplate}
                     className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-2 py-1 text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  >
                     <option value="livre">Texto Livre</option>
                     <option value="tcc">TCC</option>
                     <option value="psicanalise">Psicanálise</option>
                     <option value="humanista">Humanista</option>
                  </select>
               </div>
            </div>
            
            <textarea 
               className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none resize-none font-sans"
               placeholder="Descreva a evolução da sessão..."
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
      )}

      {activeTab === 'intelligence' && (
         <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white border text-gray-800 border-gray-200 rounded-2xl shadow-sm p-6 relative">
                  <h3 className="text-base font-medium text-gray-900 mb-4 flex items-center gap-2">
                     <Activity className="w-5 h-5 text-brand-500" />
                     Espelhamento do Diário Emocional
                  </h3>
                  <div className="h-48 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center flex-col gap-2 relative">
                     <div className="absolute inset-x-8 bottom-8 top-8 border-b border-l border-gray-300 flex items-end px-4 gap-4">
                        {/* Mock bars for chart */}
                        {[20, 40, 30, 80, 60, 50, 90].map((h, i) => (
                           <div key={i} className="w-full bg-brand-200 rounded-t-sm" style={{ height: `${h}%` }}></div>
                        ))}
                     </div>
                     <span className="text-xs text-gray-400 mt-auto pt-2 block text-center absolute bottom-2 w-full">Variação de Ansiedade (últimos 7 dias)</span>
                  </div>
               </div>

               <div className="bg-white border text-gray-800 border-gray-200 rounded-2xl shadow-sm p-6 relative flex flex-col">
                  <h3 className="text-base font-medium text-gray-900 mb-4 flex items-center gap-2">
                     <AlertTriangle className="w-5 h-5 text-red-500" />
                     Gestão de Crise & Riscos
                  </h3>
                  <div className="flex-1 space-y-4">
                     <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                        <p className="text-xs font-semibold text-red-800 flex items-center justify-between">
                           ALERTA DE SEGURANÇA <BellRing className="w-3 h-3" />
                        </p>
                        <p className="text-sm text-red-700 mt-1">
                           O paciente acionou o botão "Preciso de ajuda agora" no app móvel em 18/05/2026.
                        </p>
                     </div>
                     <div>
                        <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Tags de Risco Psicossocial Ativas</p>
                        <div className="flex flex-wrap gap-2">
                           <span className="px-3 py-1.5 bg-orange-100 text-orange-800 text-xs font-semibold rounded-lg shadow-sm border border-orange-200">Burnout</span>
                           <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-lg shadow-sm border border-yellow-200">Ansiedade Severa</span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-3 relative pl-3 border-l-2 border-gray-200">Estas tags alimentam de forma anonimizada o painel da empresa (em caso de convênio corporativo), protegendo a identidade do paciente.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}

      {activeTab === 'pep' && (
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
      )}

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
