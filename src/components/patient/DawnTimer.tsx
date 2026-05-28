import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Smile, Frown, Meh, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DawnTimer: React.FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'setup' | 'running' | 'finished'>('setup');
  const [durationMinutes, setDurationMinutes] = useState(5);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const times = [1, 3, 5, 10, 20, 30, 60];

  useEffect(() => {
    // Inicializa o áudio
    audioRef.current = new Audio('/amanhecer-audio.mp3');
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (phase === 'running') {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.error("Sem interação prévia para tocar áudio.", e));
      }

      const timer = setTimeout(() => {
        setPhase('finished');
        if ('vibrate' in navigator) {
            navigator.vibrate(1000); 
        }
      }, durationMinutes * 60 * 1000);
      
      return () => clearTimeout(timer);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reseta a música para o início
      }
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

  const stars = useMemo(() => {
     return Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 70}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1 + 'px',
        opacity: Math.random() * 0.6 + 0.1,
        animDelay: Math.random() * 2
     }));
  }, []);

  return (
    <div 
      className="h-[100dvh] w-full flex flex-col font-sans relative overflow-hidden z-[100] transition-colors duration-1000"
      style={{ backgroundColor: phase === 'setup' ? '#fdfbf7' : phase === 'finished' ? '#fdfbf7' : '#05100d' }}
      onDoubleClick={handleDoubleClick}
    >
      <AnimatePresence>
        {phase === 'running' && (
           <motion.div 
              className="absolute inset-0 z-0 overflow-hidden"
              initial={{ backgroundColor: '#05100d' }}
              animate={{ backgroundColor: ['#05100d', '#e28d71', '#fdfbf7'] }}
              transition={{ duration: durationMinutes * 60, ease: "easeInOut", times: [0, 0.7, 1] }}
              exit={{ opacity: 0 }}
           >
              {/* Stars */}
              <motion.div 
                  className="absolute inset-0"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: durationMinutes * 60 * 0.6, ease: "easeIn" }}
              >
                 {stars.map((star) => (
                     <motion.div 
                          key={star.id} 
                          className="absolute bg-white rounded-full" 
                          style={{ 
                             top: star.top, 
                             left: star.left, 
                             width: star.size, 
                             height: star.size,
                             opacity: star.opacity
                          }}
                          animate={{ opacity: [star.opacity, star.opacity * 0.2, star.opacity] }}
                          transition={{ duration: 3, delay: star.animDelay, repeat: Infinity, ease: "easeInOut" }}
                     />
                 ))}
              </motion.div>

              {/* Sun Glow */}
              <motion.div
                 className="absolute left-1/2 -translate-x-1/2 rounded-full blur-[60px]"
                 initial={{ y: '80dvh', width: '200px', height: '200px', backgroundColor: '#e28d71', opacity: 0.3 }}
                 animate={{ y: '20dvh', width: '500px', height: '500px', backgroundColor: '#fcf8d4', opacity: 0.8 }}
                 transition={{ duration: durationMinutes * 60, ease: "easeInOut" }}
              />

              {/* Sun Core */}
              <motion.div
                 className="absolute left-1/2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_60px_rgba(255,255,255,0.8)]"
                 initial={{ y: '90dvh', width: '60px', height: '60px' }}
                 animate={{ y: '30dvh', width: '120px', height: '120px' }}
                 transition={{ duration: durationMinutes * 60, ease: "easeInOut" }}
              />

              {/* Minimalist Hills (Foreground) */}
              <div className="absolute bottom-0 w-full h-[40dvh] flex items-end">
                 {/* Back Hill */}
                 <motion.div 
                     className="absolute bottom-[-5dvh] left-[-30%] w-[160%] h-[35dvh] rounded-t-[100%] border-t border-white/5"
                     initial={{ backgroundColor: '#081814' }}
                     animate={{ backgroundColor: ['#081814', '#1a592b', '#26b856'] }}
                     transition={{ duration: durationMinutes * 60, ease: "easeInOut", times: [0, 0.6, 1] }}
                 />
                 {/* Front Hill */}
                 <motion.div 
                     className="absolute bottom-[-15dvh] right-[-40%] w-[180%] h-[40dvh] rounded-t-[100%] border-t border-white/5"
                     initial={{ backgroundColor: '#05100d' }}
                     animate={{ backgroundColor: ['#05100d', '#0f401d', '#009c3b'] }}
                     transition={{ duration: durationMinutes * 60, ease: "easeInOut", times: [0, 0.6, 1] }}
                 />
              </div>
           </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'setup' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col z-10 bg-[#fdfbf7]"
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
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center z-10"
          >
              <div className="absolute inset-0 bg-[#fdfbf7] -z-10" />
              
              <motion.div 
                 initial={{ y: 20 }}
                 animate={{ y: 0 }}
                 transition={{ delay: 0.2 }}
              >
                 <h2 className="text-3xl font-display font-medium text-brand-900 mb-2 shadow-sm drop-shadow-md">Amanheceu.</h2>
                 <p className="text-brand-800 mb-12 drop-shadow-sm font-medium text-sm leading-relaxed">Você dedicou {durationMinutes} {durationMinutes === 1 ? 'minuto' : 'minutos'} a você.<br/>Como se sente agora?</p>
                 
                 <div className="flex items-center justify-center gap-4">
                   <button onClick={handleFinishMood} className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 hover:bg-brand-200 transition-colors shadow-sm">
                      <Smile className="w-8 h-8" />
                   </button>
                   <button onClick={handleFinishMood} className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 hover:bg-brand-200 transition-colors shadow-sm">
                      <Meh className="w-8 h-8" />
                   </button>
                   <button onClick={handleFinishMood} className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 hover:bg-brand-200 transition-colors shadow-sm">
                      <Frown className="w-8 h-8" />
                   </button>
                 </div>
              </motion.div>

              <button 
                 onClick={() => navigate('/app')}
                 className="absolute bottom-12 text-brand-600 font-medium text-xs hover:text-brand-800 transition-colors"
              >
                 Pular e voltar ao início
              </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
