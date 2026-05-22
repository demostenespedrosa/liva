import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, RefreshCw, Smartphone, BellRing, Settings2, Clock } from 'lucide-react';

export const Agenda: React.FC = () => {
  const [syncing, setSyncing] = useState(false);
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const dates = Array.from({ length: 35 }, (_, i) => i - 2); // mockup days

  const handleSync = () => {
     setSyncing(true);
     setTimeout(() => setSyncing(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Smart controls area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
               <RefreshCw className={`w-5 h-5 text-brand-600 ${syncing ? 'animate-spin' : ''}`} />
               <h3 className="font-semibold text-gray-900">Sincronização Bidirecional</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">Sua agenda está espelhada no Google Calendar.</p>
            <button 
               onClick={handleSync}
               className="text-xs font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors py-2 px-4 rounded-xl self-start flex items-center gap-2"
            >
               Sincronizar agora
            </button>
         </div>

         <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <BellRing className="w-16 h-16" />
            </div>
            <div className="flex items-center gap-3 mb-2">
               <Smartphone className="w-5 h-5 text-green-600" />
               <h3 className="font-semibold text-gray-900">Notificações Humanizadas</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4 pr-12">Lembretes empáticos via WhatsApp ativados 24h antes da sessão para reduzir faltas.</p>
            <button className="text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 transition-colors py-2 px-4 rounded-xl self-start flex items-center gap-2">
               <Settings2 className="w-4 h-4" /> Configurar Mensagem
            </button>
         </div>

         <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-2xl border border-gray-700 shadow-sm flex flex-col justify-center text-white">
            <div className="flex items-center gap-3 mb-2">
               <Clock className="w-5 h-5 text-brand-400" />
               <h3 className="font-semibold">Política Anti-furos</h3>
            </div>
            <p className="text-xs text-gray-400 mb-4">
               Reagendamentos com menos de 24h cobram taxa automática e liberam o slot para novos pacientes.
            </p>
            <div className="flex items-center justify-between text-xs font-medium">
               <span>Proteção Ativa</span>
               <div className="w-8 h-4 bg-brand-500 rounded-full relative">
                  <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
               </div>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <h2 className="text-xl font-display font-semibold text-gray-900">Maio 2026</h2>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-600 text-white px-4 py-2.5 sm:py-2 rounded-xl text-sm font-medium hover:bg-brand-700 transition-colors">
            <Plus className="w-4 h-4" />
            Novo Agendamento
          </button>
        </div>
        
        <div className="p-4 sm:p-6 overflow-x-auto">
          <div className="grid grid-cols-7 gap-px rounded-lg overflow-hidden border border-gray-200 bg-gray-200 min-w-[760px]">
            {days.map(day => (
              <div key={day} className="bg-gray-50 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {day}
              </div>
            ))}
            {dates.map((date, i) => (
              <div 
                key={i} 
                className={`min-h-[120px] bg-white p-2 transition-colors hover:bg-gray-50 ${
                  date > 0 && date <= 31 ? 'text-gray-900' : 'text-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                   <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${date === 21 ? 'bg-brand-600 text-white shadow-sm' : ''}`}>
                     {date > 0 && date <= 31 ? date : (date <= 0 ? 30 + date : date - 31)}
                   </span>
                   {date === 21 && <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 mr-1"></span>}
                </div>
                
                {date === 21 && (
                  <div className="mt-3 flex flex-col gap-1.5">
                    <div className="px-2 py-1.5 bg-blue-50/80 text-blue-800 text-[10px] rounded-md border border-blue-100/50 truncate flex items-center justify-between group cursor-pointer hover:bg-blue-100/80 transition-colors">
                      <span className="font-semibold">14:00 Rafael S.</span>
                      <span className="opacity-0 group-hover:opacity-100 text-blue-500">ver</span>
                    </div>
                    <div className="px-2 py-1.5 bg-green-50/80 text-green-800 text-[10px] rounded-md border border-green-100/50 truncate flex items-center justify-between group cursor-pointer hover:bg-green-100/80 transition-colors">
                      <span className="font-semibold">15:30 Ana B.</span>
                      <span className="opacity-0 group-hover:opacity-100 text-green-500">ver</span>
                    </div>
                    <div className="px-2 py-1.5 bg-yellow-50/80 text-yellow-800 text-[10px] rounded-md border border-yellow-100/50 truncate flex items-center justify-between group cursor-pointer hover:bg-yellow-100/80 transition-colors">
                      <span className="font-semibold line-through text-yellow-600/70">17:00 Lucas M.</span>
                      <span className="font-bold text-yellow-600">Furo Liberado</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
