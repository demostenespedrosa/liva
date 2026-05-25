import React, { useState } from 'react';
import { Smile, CalendarDays, Wind, Play, CloudRain, Cloud, Sun, SunDim, Heart, Award, CheckCircle2, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export const PatientHome: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const navigate = useNavigate();

  const moods = [
    { label: 'Exausto', icon: CloudRain, color: 'text-blue-400', bg: 'bg-blue-50', activeBg: 'bg-blue-500', activeText: 'text-white' },
    { label: 'Triste', icon: Cloud, color: 'text-indigo-400', bg: 'bg-indigo-50', activeBg: 'bg-indigo-500', activeText: 'text-white' },
    { label: 'Neutro', icon: SunDim, color: 'text-gray-400', bg: 'bg-gray-50', activeBg: 'bg-gray-500', activeText: 'text-white' },
    { label: 'Bem', icon: Sun, color: 'text-orange-400', bg: 'bg-orange-50', activeBg: 'bg-orange-500', activeText: 'text-white' },
    { label: 'Radiante', icon: Smile, color: 'text-brand-500', bg: 'bg-brand-50', activeBg: 'bg-brand-500', activeText: 'text-white' },
  ];

  return (
    <div className="flex-1 flex flex-col pt-12">
      {/* Header (Greeting) */}
      <header className="px-6 pb-6 flex justify-between items-start relative z-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-display font-medium text-brand-900"
          >
            Bom dia, Clara.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-brand-700/70 text-sm mt-1"
          >
            Que bom ter você aqui hoje.
          </motion.p>
        </div>
        <motion.div 
          onClick={() => navigate('/app/profile')}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-brand-100 cursor-pointer"
        >
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Clara&backgroundColor=f9f9f9" alt="User avatar" className="w-10 h-10 rounded-full" />
        </motion.div>
      </header>

      <main className="px-6 space-y-8 no-scrollbar pb-32">
        
        {/* Mood Tracker */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-brand-100/50">
            <h2 className="text-sm font-semibold text-brand-900 mb-1">Como você está se sentindo?</h2>
            <p className="text-xs text-gray-500 mb-5">Seu espaço seguro para registrar emoções.</p>
            
            <div className="flex justify-between items-end">
              {moods.map((mood, i) => {
                const isActive = selectedMood === i;
                return (
                  <button 
                    key={i} 
                    onClick={() => setSelectedMood(i)}
                    className="flex flex-col items-center gap-2 group outline-none"
                  >
                    <motion.div 
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive ? mood.activeBg : mood.bg
                      }`}
                    >
                      <mood.icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? mood.activeText : mood.color}`} />
                    </motion.div>
                    <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-brand-900' : 'text-gray-400'}`}>
                      {mood.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {selectedMood !== null && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-4 pt-4 border-t border-brand-50"
                >
                  <textarea 
                    placeholder="Quer falar mais sobre isso?"
                    className="w-full bg-brand-50/50 border-none rounded-xl p-3 text-sm text-gray-700 placeholder:text-gray-400 focus:ring-1 focus:ring-brand-200 resize-none h-20"
                  />
                  <div className="flex justify-end mt-2">
                     <button 
                        onClick={() => {
                          setSelectedMood(null);
                        }}
                        className="px-4 py-2 bg-brand-900 text-white text-xs font-semibold rounded-full hover:bg-brand-800 transition-colors"
                     >
                       Salvar registro
                     </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Central de Conquistas & Progresso */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3 ml-1">
            <h2 className="text-base font-semibold text-brand-900">Seu Progresso</h2>
            <button className="text-[11px] font-semibold text-brand-600 hover:text-brand-800 transition-colors">Ver histórico</button>
          </div>
          
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-brand-100/50">
             {/* Progress Chart Mockup */}
             <div className="flex items-end justify-between h-24 mb-6 relative">
                 <div className="absolute inset-0 flex flex-col justify-between pt-1">
                    <div className="border-t border-dashed border-gray-200 w-full"></div>
                    <div className="border-t border-dashed border-gray-200 w-full"></div>
                    <div className="border-t border-dashed border-gray-200 w-full"></div>
                 </div>
                 
                 {[40, 60, 50, 80, 70, 90, 85].map((height, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 relative z-10 w-8">
                       <div className="w-full bg-brand-100 rounded-t-md relative flex items-end" style={{ height: '100px' }}>
                          <motion.div 
                             initial={{ height: 0 }}
                             animate={{ height: `${height}%` }}
                             transition={{ delay: 0.5 + (i * 0.1), duration: 0.8 }}
                             className="w-full bg-brand-400 rounded-t-md"
                          />
                       </div>
                    </div>
                 ))}
             </div>
             
             <div className="flex justify-between items-center bg-brand-50 p-3 rounded-xl border border-brand-100 mb-6">
                <div className="flex items-center gap-2 text-brand-700">
                   <TrendingUp className="w-4 h-4" />
                   <span className="text-xs font-semibold">Os dias bons aumentaram 20%</span>
                </div>
             </div>

             <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Conquistas Recentes</h3>
                <div className="grid grid-cols-2 gap-3">
                   <div className="flex items-start gap-2 bg-orange-50 p-3 rounded-xl border border-orange-100">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                         <Zap className="w-3.5 h-3.5" />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-orange-900 leading-tight">Consistência</p>
                         <p className="text-[9px] text-orange-700 mt-0.5">7 dias seguidos de diário</p>
                      </div>
                   </div>
                   
                   <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-xl border border-blue-100">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 shrink-0">
                         <Wind className="w-3.5 h-3.5" />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-blue-900 leading-tight">Autoconhecimento</p>
                         <p className="text-[9px] text-blue-700 mt-0.5">3 trilhas de respiração este mês</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </motion.section>

        {/* Quick Shortcut to Next Session */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-base font-semibold text-brand-900 mb-3 ml-1">Próximo Passo</h2>
          <div 
             onClick={() => navigate('/app/therapy')}
             className="bg-brand-900 text-white p-5 rounded-[1.5rem] shadow-sm flex items-center justify-between hover:bg-brand-800 transition-colors cursor-pointer group"
          >
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                   <CalendarDays className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-sm font-semibold">Sessão com Rafael</h3>
                   <p className="text-[11px] text-brand-200 mt-0.5">Amanhã às 14:00</p>
                </div>
             </div>
             <ChevronRight className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity group-hover:translate-x-1" />
          </div>
        </motion.section>

      </main>
    </div>
  );
};
