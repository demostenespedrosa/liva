import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Smile, Frown, Meh, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DawnTimer: React.FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'setup' | 'running' | 'finished'>('setup');
  const [durationMinutes, setDurationMinutes] = useState(5);
  
  const times = [1, 3, 5, 10, 20, 30, 60];

  useEffect(() => {
    if (phase === 'running') {
      const timer = setTimeout(() => {
        setPhase('finished');
        if ('vibrate' in navigator) {
            // Vibração longa, grave e suave (1 segundo contínuo)
            navigator.vibrate(1000); 
        }
      }, durationMinutes * 60 * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [phase, durationMinutes]);

  const handleDoubleClick = () => {
    if (phase === 'running') {
      setPhase('setup');
    }
  };

  const handleFinishMood = () => {
    navigate('/app');
  };

  return (
    <div 
      className="h-[100dvh] w-full flex flex-col font-sans relative overflow-hidden z-[100] transition-colors duration-1000"
      style={{ backgroundColor: phase === 'setup' ? '#fdfbf7' : phase === 'finished' ? '#e28d71' : '#0d211c' }}
      onDoubleClick={handleDoubleClick}
    >
      {/* CSS Animations */}
      <style>{`
         @keyframes expandCream {
            0% { opacity: 0; transform: scale(0.1); }
            10% { opacity: 1; }
            50% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
         }
         @keyframes expandTerracotta {
            0% { opacity: 0; transform: scale(0.1); }
            50% { opacity: 0; transform: scale(0.1); }
            60% { opacity: 1; }
            100% { transform: scale(1.5); opacity: 1; }
         }
      `}</style>
      
      {phase === 'running' && (
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div 
               className="absolute w-[300vw] h-[300vw] rounded-full"
               style={{
                  background: 'radial-gradient(circle, #fdfbf7 0%, transparent 70%)',
                  animation: `expandCream ${durationMinutes * 60}s ease-in-out forwards`
               }}
            />
            <div 
               className="absolute w-[300vw] h-[300vw] rounded-full"
               style={{
                  background: 'radial-gradient(circle, #e28d71 0%, transparent 80%)',
                  animation: `expandTerracotta ${durationMinutes * 60}s ease-in-out forwards`
               }}
            />
         </div>
      )}

      <AnimatePresence>
        {phase === 'setup' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col"
          >
             <div className="p-6 pt-10 flex items-center mb-8">
               <button onClick={() => navigate(-1)} className="p-3 bg-brand-100/50 text-brand-900 rounded-full hover:bg-brand-100 transition-colors">
                  <ChevronLeft className="w-5 h-5" />
               </button>
             </div>
             
             <div className="flex-1 flex flex-col items-center justify-center px-8 text-center pb-24">
               <div className="w-20 h-20 bg-brand-50 rounded-[1.5rem] mb-6 flex items-center justify-center border border-brand-100 shadow-sm">
                  <Sun className="w-10 h-10 text-orange-400" />
               </div>
               <h2 className="text-3xl font-display font-medium text-brand-900 mb-2">Amanhecer</h2>
               <p className="text-gray-500 mb-12 text-sm leading-relaxed px-4">Quanto tempo você tem para si hoje?</p>
               
               <div className="w-full relative py-8">
                 <div className="flex bg-gray-100 rounded-full p-1.5 w-full justify-between relative shadow-inner overflow-x-auto no-scrollbar">
                    {times.map(t => (
                       <button
                         key={t}
                         onClick={() => setDurationMinutes(t)}
                         className={`relative z-10 px-3 sm:px-4 py-3 text-sm font-semibold rounded-full transition-colors flex-shrink-0 ${durationMinutes === t ? 'text-white' : 'text-gray-500 hover:text-gray-900'}`}
                       >
                          {t}m
                          {durationMinutes === t && (
                            <motion.div 
                               layoutId="bg-pill"
                               className="absolute inset-0 bg-brand-900 rounded-full -z-10 shadow-md"
                            />
                          )}
                       </button>
                    ))}
                 </div>
               </div>

               <p className="text-[10px] text-gray-400 mt-2 mb-10 font-medium">Toque duplo na tela durante o exercício para cancelar.</p>

               <button 
                  onClick={() => setPhase('running')}
                  className="w-full bg-brand-900 text-white rounded-[1.5rem] py-4 text-sm font-semibold hover:bg-brand-800 transition-colors shadow-lg shadow-brand-900/20"
               >
                  Iniciar Foco
               </button>
             </div>
          </motion.div>
        )}

        {phase === 'finished' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
          >
              <motion.div 
                 initial={{ y: 20 }}
                 animate={{ y: 0 }}
                 transition={{ delay: 0.2 }}
              >
                 <h2 className="text-3xl font-display font-medium text-white mb-2 shadow-sm drop-shadow-md">Amanheceu.</h2>
                 <p className="text-white/90 mb-12 drop-shadow-sm font-medium text-sm leading-relaxed">Você dedicou {durationMinutes} {durationMinutes === 1 ? 'minuto' : 'minutos'} a você.<br/>Como se sente agora?</p>
                 
                 <div className="flex items-center justify-center gap-4">
                   <button onClick={handleFinishMood} className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md text-white hover:bg-white/30 transition-colors border border-white/30 shadow-lg">
                      <Smile className="w-8 h-8" />
                   </button>
                   <button onClick={handleFinishMood} className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md text-white hover:bg-white/30 transition-colors border border-white/30 shadow-lg">
                      <Meh className="w-8 h-8" />
                   </button>
                   <button onClick={handleFinishMood} className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md text-white hover:bg-white/30 transition-colors border border-white/30 shadow-lg">
                      <Frown className="w-8 h-8" />
                   </button>
                 </div>
              </motion.div>

              <button 
                 onClick={() => navigate('/app')}
                 className="absolute bottom-12 text-white/70 font-medium text-xs hover:text-white transition-colors"
              >
                 Pular e voltar ao início
              </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
