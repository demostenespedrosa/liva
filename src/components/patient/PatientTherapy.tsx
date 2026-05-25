import React from 'react';
import { CalendarDays, FileText, ChevronRight, Video, Lock, ShieldAlert, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export const PatientTherapy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col pt-12 relative">
      <header className="px-6 pb-6 border-b border-brand-100/50 bg-white sticky top-0 z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-display font-medium text-brand-900"
        >
          Minha Terapia
        </motion.h1>
      </header>

      <main className="px-6 py-8 space-y-8 flex-1 pb-32">
        
        {/* Next Session */}
        <section>
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-base font-semibold text-brand-900">Próxima Sessão</h2>
          </div>

          <div className="bg-brand-900 text-white rounded-[2rem] p-6 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
             
             <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                   <CalendarDays className="w-6 h-6 text-brand-100" />
                </div>
                <div>
                   <p className="text-brand-200 text-[11px] font-semibold tracking-wider uppercase mb-1">Amanhã, 14:00</p>
                   <h3 className="text-lg font-medium">Rafael Silva</h3>
                   <p className="text-brand-300 text-xs mt-0.5">Psicólogo Clínico</p>
                </div>
             </div>

             <button className="w-full bg-white text-brand-900 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-brand-50 transition-colors relative z-10">
                <Video className="w-4 h-4" /> Entrar na Sala Virtual
             </button>
             
             <div className="flex gap-2 mt-3 relative z-10">
               <button className="flex-1 bg-white/10 text-brand-100 py-2 rounded-xl text-xs font-medium hover:bg-white/20 transition-colors">
                  Reagendar
               </button>
               <button className="flex-1 bg-white/10 text-brand-100 py-2 rounded-xl text-xs font-medium hover:bg-white/20 transition-colors">
                  Cancelar
               </button>
             </div>
          </div>
        </section>

        {/* History of Evolution (Resumos) */}
        <section>
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-base font-semibold text-brand-900">Resumos Compartilhados</h2>
          </div>

          <div className="space-y-3">
             <div className="bg-white p-5 rounded-[1.5rem] border border-brand-100/50 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-2 text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md text-[10px] font-semibold border border-brand-100">
                     <Lock className="w-3 h-3" /> Privado
                   </div>
                   <span className="text-xs text-gray-400 font-medium">14 de Maio</span>
                </div>
                <h3 className="text-sm font-semibold text-brand-900 mb-1 flex items-center gap-2">
                   <FileText className="w-4 h-4 text-brand-500" /> Sessão #3
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  Discutimos suas ferramentas de descompressão antes de dormir. O plano de ação é focar na higiene do sono.
                </p>
                <button className="text-brand-600 text-xs font-semibold flex items-center gap-1 hover:text-brand-800 transition-colors">
                   Ler nota completa <ChevronRight className="w-3 h-3" />
                </button>
             </div>
          </div>
        </section>
      </main>

      {/* Floating SOS Button */}
      <div className="absolute inset-x-4 bottom-24 z-50">
         <button 
           onClick={() => navigate('/app/crisis')}
           className="w-full flex items-center justify-between p-4 bg-red-500 rounded-[1.5rem] shadow-lg shadow-red-500/30 hover:bg-red-600 transition-colors group"
         >
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm text-white">
                <ShieldAlert className="w-5 h-5" />
             </div>
             <div className="text-left">
                <h3 className="text-sm font-semibold text-white">Preciso de ajuda agora</h3>
                <p className="text-[11px] text-red-100 font-medium">Protocolo de crise e acolhimento</p>
             </div>
           </div>
         </button>
      </div>

    </div>
  );
};
