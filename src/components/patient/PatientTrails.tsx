import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, Play, Leaf, Sparkles, X, HeartPulse, CheckCircle2 } from 'lucide-react';

export const PatientTrails: React.FC = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  const trails = [
    {
      id: 'breathing-1',
      title: 'Respiração Box (Caixa)',
      description: 'Uma técnica simples de 4 tempos para regular o sistema nervoso rapidamente.',
      duration: '3 MINUTOS',
      icon: Wind,
      color: 'bg-brand-900',
      iconColor: 'text-brand-100'
    },
    {
      id: 'mindful-1',
      title: 'Aterramento (5-4-3-2-1)',
      description: 'Traga sua mente de volta ao momento presente em momentos de crise ansiosa.',
      duration: '5 MINUTOS',
      icon: Leaf,
      color: 'bg-orange-400',
      iconColor: 'text-orange-50'
    },
    {
      id: 'sleep-1',
      title: 'Preparação para o Sono',
      description: 'Desacelere e prepare seu corpo para uma noite de sono reparadora.',
      duration: '10 MINUTOS',
      icon: Sparkles,
      color: 'bg-indigo-500',
      iconColor: 'text-indigo-100'
    }
  ];

  return (
    <div className="flex-1 flex flex-col pt-12 pb-8">
      <header className="px-6 pb-6">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-display font-medium text-brand-900"
        >
          Suas Trilhas
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-brand-700/70 text-sm mt-1"
        >
          Um oásis de exercícios práticos para o seu bem-estar.
        </motion.p>
      </header>

      <main className="px-6 space-y-4 no-scrollbar">
        {trails.map((trail, idx) => (
          <motion.div
            key={trail.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            onClick={() => setActiveExercise(trail.title)}
            className={`relative overflow-hidden ${trail.color} text-white p-6 rounded-[2rem] shadow-sm cursor-pointer group hover:scale-[1.02] transition-transform`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 z-0"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                  <trail.icon className={`w-6 h-6 ${trail.iconColor}`} />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/20 backdrop-blur-sm text-[10px] font-bold tracking-wider">
                  <Play className="w-3 h-3 fill-white" /> {trail.duration}
                </div>
              </div>
              <h3 className="text-xl font-medium leading-tight mb-2">{trail.title}</h3>
              <p className="text-sm text-white/80">{trail.description}</p>
            </div>
          </motion.div>
        ))}

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
           className="mt-8 bg-white p-6 rounded-[2rem] border border-brand-100 shadow-sm"
        >
           <div className="flex items-center gap-4 mb-3">
             <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-sm font-semibold text-brand-900">Teste de Ansiedade (GAD-7)</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Disponível para avaliação</p>
             </div>
           </div>
           <button className="w-full py-3 bg-brand-50 text-brand-700 rounded-xl text-sm font-semibold hover:bg-brand-100 transition-colors">
              Iniciar Teste Rápido
           </button>
        </motion.div>
      </main>

      {/* Exercise Modal Overlay */}
      <AnimatePresence>
        {activeExercise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white md:absolute flex flex-col justify-between"
          >
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-100/50 rounded-full blur-3xl p-10 z-0"></div>
               <div className="relative z-10 flex flex-col items-center">
                  <motion.div 
                     animate={{ scale: [1, 1.2, 1] }}
                     transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                     className="w-32 h-32 bg-brand-50 text-brand-500 rounded-full flex items-center justify-center shadow-lg border border-brand-100 mb-8"
                  >
                     <HeartPulse className="w-12 h-12" />
                  </motion.div>
                  <h2 className="text-3xl font-display font-medium text-brand-900 mb-4">{activeExercise}</h2>
                  <p className="text-gray-500 max-w-xs">Inspire profundamente contando até 4. Segure o ar. Expire devagar.</p>
               </div>
            </div>
            <div className="p-8 pb-12 flex flex-col gap-4">
               <button 
                 onClick={() => setActiveExercise(null)}
                 className="w-full py-4 bg-gray-100 text-gray-600 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
               >
                 Encerrar Exercício
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
