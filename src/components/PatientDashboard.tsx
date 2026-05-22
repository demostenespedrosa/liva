import React from 'react';
import { Smile, CalendarDays, Activity, ShieldAlert, HeartPulse } from 'lucide-react';
import { motion } from 'motion/react';

export const PatientDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans pb-20">
      <header className="bg-brand-600 text-white rounded-b-[2.5rem] pt-12 pb-8 px-6 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-medium">Bom dia, João.</h1>
            <p className="text-brand-100/80 text-sm mt-1">Como você está se sentindo hoje?</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <HeartPulse className="w-6 h-6 text-white" />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 mt-8 space-y-6">
        
        {/* Mood Tracker */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-brand-100/50">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Diário Emocional</h2>
          <div className="flex justify-between">
            {['Péssimo', 'Ruim', 'Neutro', 'Bem', 'Ótimo'].map((mood, i) => (
              <button key={i} className="flex flex-col items-center gap-2 group">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${i === 3 ? 'bg-brand-100 text-brand-600 ring-2 ring-brand-500 ring-offset-2' : 'bg-gray-50 text-gray-400 hover:bg-brand-50 hover:text-brand-500'}`}>
                  <Smile className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-medium text-gray-500">{mood}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Trilha de Autocuidado */}
        <section>
          <h2 className="text-base font-semibold text-brand-900 mb-3 ml-1">Para você hoje</h2>
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-brand-100/50 flex gap-4">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex-shrink-0 flex items-center justify-center">
              <Activity className="w-8 h-8 text-orange-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-brand-900 leading-tight">Respiração Guiada (5 min)</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">Uma técnica rápida para reduzir a ansiedade antes de uma reunião importante.</p>
              <button className="text-xs font-semibold text-brand-600 mt-2">Começar agora</button>
            </div>
          </div>
        </section>

        {/* Agendamento */}
        <section>
           <h2 className="text-base font-semibold text-brand-900 mb-3 ml-1">Sua Equipe de Cuidado</h2>
           <button className="w-full bg-brand-50 p-5 rounded-3xl border border-brand-100/50 flex items-center justify-between hover:bg-brand-100/50 transition-colors">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                 <CalendarDays className="w-6 h-6 text-brand-600" />
               </div>
               <div className="text-left">
                 <h3 className="text-sm font-medium text-brand-900">Agendar Sessão</h3>
                 <p className="text-xs text-gray-500">Psicologia ou Psiquiatria</p>
               </div>
             </div>
             <span className="text-brand-500">→</span >
           </button>
        </section>

        {/* Botão de Alerta */}
        <button className="w-full mt-4 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-4 rounded-full font-medium shadow-sm hover:bg-red-100 transition-colors border border-red-100">
          <ShieldAlert className="w-5 h-5" />
          <span>Preciso de Acolhimento Imediato (SOS)</span>
        </button>

      </main>
    </div>
  );
};
