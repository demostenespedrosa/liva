import React, { useState } from 'react';
import { Pill, Wind, Play, CheckCircle2, ChevronRight, Check } from 'lucide-react';
import { motion } from 'motion/react';

export const PatientCare: React.FC = () => {
  const [medTaken, setMedTaken] = useState(false);

  return (
    <div className="flex-1 flex flex-col pt-12">
      <header className="px-6 pb-6 border-b border-brand-100/50 bg-white sticky top-0 z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-display font-medium text-brand-900"
        >
          Cuidado & Rotina
        </motion.h1>
      </header>

      <main className="px-6 py-8 space-y-8 no-scrollbar">

        {/* Farmácia Virtual / Lembrete de Medicação */}
        <section>
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-base font-semibold text-brand-900">Sua Medicação</h2>
             <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">Hoje</span>
          </div>

          <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-brand-100/50">
             <div className="flex items-start gap-4">
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${medTaken ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-500'}`}>
                 <Pill className="w-6 h-6" />
               </div>
               <div className="flex-1">
                 <h3 className="text-sm font-semibold text-brand-900">Escitalopram 10mg</h3>
                 <p className="text-xs text-gray-500 mt-1">1 comprimido após o café da manhã</p>
                 
                 <div className="mt-4 flex gap-2">
                    {medTaken ? (
                       <div className="bg-green-50 text-green-700 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 w-full border border-green-100">
                          <CheckCircle2 className="w-4 h-4" /> Tomado às 08:30
                       </div>
                    ) : (
                       <button 
                         onClick={() => setMedTaken(true)}
                         className="bg-brand-500 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex-1 hover:bg-brand-600 transition-colors"
                       >
                         Marcar como tomado
                       </button>
                    )}
                 </div>
               </div>
             </div>

             {/* Side effects mini-form */}
             <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Acompanhamento Semanal</p>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                   <p className="text-xs font-medium text-gray-700 mb-3">Você sentiu náusea ou sono excessivo com a medicação essa semana?</p>
                   <div className="flex gap-2">
                     <button className="flex-1 bg-white border border-gray-200 py-2 rounded-lg text-xs font-medium text-gray-600 hover:border-brand-300 hover:text-brand-600 transition-colors">Sim, bastante</button>
                     <button className="flex-1 bg-white border border-gray-200 py-2 rounded-lg text-xs font-medium text-gray-600 hover:border-brand-300 hover:text-brand-600 transition-colors">Muito pouco</button>
                     <button className="flex-1 bg-white border border-gray-200 py-2 rounded-lg text-xs font-medium text-gray-600 hover:border-brand-300 hover:text-brand-600 transition-colors">Não senti</button>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Ferramentas e Trilhas */}
        <section>
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-base font-semibold text-brand-900">Ferramentas de Regulação</h2>
          </div>

          <div className="space-y-3">
             <div className="relative overflow-hidden bg-brand-900 text-white p-6 rounded-[2rem] shadow-sm cursor-pointer group">
               <div className="absolute top-0 right-0 w-48 h-48 bg-brand-800 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 z-0"></div>
               
               <div className="relative z-10 flex items-start gap-4">
                 <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex-shrink-0 flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors">
                   <Wind className="w-6 h-6 text-brand-100" />
                 </div>
                 <div>
                   <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-sm text-[10px] font-medium text-brand-100 mb-2 border border-white/5">
                     <Play className="w-3 h-3 fill-brand-100" /> 5 MINUTOS
                   </div>
                   <h3 className="text-base font-medium leading-tight mb-1">Respiração Diafragmática</h3>
                   <p className="text-xs text-brand-100/80 line-clamp-2">Acalme o sistema nervoso em momentos de crise ou estresse elevado.</p>
                 </div>
               </div>
             </div>

             <div className="relative overflow-hidden bg-blue-900 text-white p-6 rounded-[2rem] shadow-sm cursor-pointer group">
               <div className="absolute top-0 right-0 w-48 h-48 bg-blue-800 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 z-0"></div>
               
               <div className="relative z-10 flex items-start gap-4">
                 <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex-shrink-0 flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors">
                   <Check className="w-6 h-6 text-blue-100" />
                 </div>
                 <div>
                   <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-sm text-[10px] font-medium text-blue-100 mb-2 border border-white/5">
                     <Play className="w-3 h-3 fill-blue-100" /> 12 MINUTOS
                   </div>
                   <h3 className="text-base font-medium leading-tight mb-1">Meditação de Foco</h3>
                   <p className="text-xs text-blue-100/80 line-clamp-2">Ideal para começar o dia ou antes de reuniões importantes.</p>
                 </div>
               </div>
             </div>
          </div>
        </section>

      </main>
    </div>
  );
};
