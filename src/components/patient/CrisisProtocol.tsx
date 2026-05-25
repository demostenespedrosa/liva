import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, HeartHandshake, PhoneCall, ChevronLeft, ShieldAlert, HeartPulse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CrisisProtocol: React.FC = () => {
  const navigate = useNavigate();
  const [breathingPhase, setBreathingPhase] = useState<'Inspirar' | 'Segurar' | 'Expirar' | 'Pausa'>('Inspirar');
  const [timer, setTimer] = useState(4);

  useEffect(() => {
    const phases: Array<'Inspirar' | 'Segurar' | 'Expirar' | 'Pausa'> = ['Inspirar', 'Segurar', 'Expirar', 'Pausa'];
    let currentPhaseIndex = 0;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
          setBreathingPhase(phases[currentPhaseIndex]);
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getScale = () => {
    switch (breathingPhase) {
      case 'Inspirar': return 1.5;
      case 'Segurar': return 1.5;
      case 'Expirar': return 1;
      case 'Pausa': return 1;
      default: return 1;
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-slate-900 flex flex-col font-sans relative overflow-hidden z-[100]">
      {/* Back button */}
      <div className="absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-center">
         <button onClick={() => navigate(-1)} className="p-3 bg-white/10 rounded-full text-white backdrop-blur-md">
            <ChevronLeft className="w-6 h-6" />
         </button>
         <span className="text-white/50 text-xs font-semibold tracking-widest uppercase">Protocolo de Apoio</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative p-8">
         <div className="text-center z-20 mb-16">
            <h2 className="text-3xl font-display font-medium text-white mb-2">Respire Comigo</h2>
            <p className="text-slate-400 text-sm">Acompanhe o círculo. Você está seguro.</p>
         </div>

         <div className="relative w-64 h-64 flex items-center justify-center my-8 z-20">
            {/* Pulsing ring */}
            <motion.div 
               animate={{ scale: getScale() }}
               transition={{ duration: 4, ease: "easeInOut" }}
               className="absolute w-48 h-48 rounded-full border-2 border-brand-500/30"
            />
            {/* Solid circle */}
            <motion.div 
               animate={{ scale: getScale() }}
               transition={{ duration: 4, ease: "easeInOut" }}
               className="absolute w-48 h-48 rounded-full bg-brand-500/20 backdrop-blur-sm shadow-[0_0_50px_rgba(249,115,22,0.3)] flex items-center justify-center"
            >
            </motion.div>
            
            <div className="z-10 flex flex-col items-center">
               <span className="text-brand-300 font-medium tracking-wide uppercase text-sm mb-1">{breathingPhase}</span>
               <span className="text-4xl font-display text-white">{timer}</span>
            </div>
         </div>
      </div>

      {/* Emergency Contacts Sheet */}
      <div className="bg-white rounded-t-[2.5rem] p-8 pb-safe shadow-2xl relative z-20">
         <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-red-500" /> Precisa de voz acolhedora?
         </h3>

         <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-brand-50 rounded-2xl border border-brand-100 hover:bg-brand-100 transition-colors">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-600">
                     <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                     <h4 className="text-sm font-semibold text-brand-900">Plantonista Liva</h4>
                     <p className="text-[11px] text-brand-700">Resposta garantida em 24h</p>
                  </div>
               </div>
               <PhoneCall className="w-5 h-5 text-brand-500" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-yellow-50 rounded-2xl border border-yellow-100 hover:bg-yellow-100 transition-colors">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-yellow-600">
                     <Phone className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                     <h4 className="text-sm font-semibold text-yellow-900">CVV (Ligação Gratuita)</h4>
                     <p className="text-[11px] text-yellow-700">Disponível 24h por dia</p>
                  </div>
               </div>
               <span className="text-lg font-bold text-yellow-600 mr-2">188</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100 hover:bg-red-100 transition-colors">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-red-600">
                     <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                     <h4 className="text-sm font-semibold text-red-900">SAMU (Emergência Médica)</h4>
                     <p className="text-[11px] text-red-700">Para crises severas</p>
                  </div>
               </div>
               <span className="text-lg font-bold text-red-600 mr-2">192</span>
            </button>
         </div>
      </div>
    </div>
  );
};
