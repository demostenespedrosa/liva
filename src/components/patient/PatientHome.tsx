import React, { useState } from 'react';
import { Smile, CalendarDays, ShieldAlert, Wind, Play, Phone, CloudRain, Cloud, Sun, SunDim, Heart } from 'lucide-react';
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

      <main className="px-6 space-y-8 no-scrollbar">
        
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
                          // simulate submit
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

        {/* Trilha de Autocuidado */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3 ml-1">
            <h2 className="text-base font-semibold text-brand-900">Um momento para você</h2>
          </div>
          
          <div 
            onClick={() => navigate('/app/trails')}
            className="relative overflow-hidden bg-brand-900 text-white p-6 rounded-[2rem] shadow-sm cursor-pointer group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-800 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 z-0"></div>
            
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex-shrink-0 flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors">
                <Wind className="w-6 h-6 text-brand-100" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-sm text-[10px] font-medium text-brand-100 mb-2 border border-white/5">
                  <Play className="w-3 h-3 fill-brand-100" /> 5 MINUTOS
                </div>
                <h3 className="text-base font-medium leading-tight mb-1">Pausa para a Mente</h3>
                <p className="text-xs text-brand-100/80 line-clamp-2">Exercício de respiração guiada para acalmar a ansiedade e retomar o foco.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Agendamento & Equipe */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-base font-semibold text-brand-900 mb-3 ml-1">Sua rede de apoio</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white p-5 rounded-[1.5rem] border border-brand-100/50 shadow-sm flex flex-col items-start gap-3 hover:border-brand-200 transition-colors text-left group">
              <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <CalendarDays className="w-5 h-5" />
              </div>
              <div>
                 <h3 className="text-sm font-semibold text-brand-900">Agendar</h3>
                 <p className="text-[11px] text-gray-500 mt-0.5">Sessão com seu time</p>
              </div>
            </button>
            
            <button 
              onClick={() => navigate('/app/diary')}
              className="bg-white p-5 rounded-[1.5rem] border border-brand-100/50 shadow-sm flex flex-col items-start gap-3 hover:border-brand-200 transition-colors text-left group"
            >
              <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                 <h3 className="text-sm font-semibold text-brand-900">Seus dados</h3>
                 <p className="text-[11px] text-gray-500 mt-0.5">Retrato da sua evolução</p>
              </div>
            </button>
          </div>
        </motion.section>

        {/* SOS Alerta */}
        <motion.section
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
        >
           <button className="w-full flex items-center justify-between p-4 bg-red-50 rounded-[1.5rem] border border-red-100 hover:bg-red-100/80 transition-colors group">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-red-500">
                  <ShieldAlert className="w-5 h-5" />
               </div>
               <div className="text-left">
                  <h3 className="text-sm font-semibold text-red-700">Precisa de ajuda agora?</h3>
                  <p className="text-[11px] text-red-600/80">Atendimento prioritário 24h</p>
               </div>
             </div>
             <Phone className="w-5 h-5 text-red-400 group-hover:text-red-600 transition-colors" />
           </button>
        </motion.section>

      </main>
    </div>
  );
};
