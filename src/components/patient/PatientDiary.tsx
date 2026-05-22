import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Smile, Sun, CloudRain } from 'lucide-react';

export const PatientDiary: React.FC = () => {
  const history = [
    { date: 'Hoje', time: '09:00', mood: 'Bem', icon: Sun, color: 'text-orange-500', bg: 'bg-orange-50', note: 'Acordei com um pouco de ansiedade, mas melhorei após o café.' },
    { date: 'Ontem', time: '18:30', mood: 'Exausto', icon: CloudRain, color: 'text-blue-500', bg: 'bg-blue-50', note: 'Dia longo de reuniões. Precisando muito descansar.' },
    { date: 'Terça-feira', time: '14:00', mood: 'Radiante', icon: Smile, color: 'text-brand-500', bg: 'bg-brand-50', note: 'Consegui entregar o projeto. Me sinto leve!' },
  ];

  return (
    <div className="flex-1 flex flex-col pt-12 pb-8">
      <header className="px-6 pb-6">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-display font-medium text-brand-900"
        >
          Seu Diário
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-brand-700/70 text-sm mt-1"
        >
          Um espelho das suas emoções.
        </motion.p>
      </header>

      <main className="px-6 space-y-6">
        {/* Heatmap / Streak */}
        <motion.section 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="bg-brand-900 text-white p-6 rounded-[2rem] relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-800 rounded-full blur-2xl -mr-10 -mt-10 z-0"></div>
           <div className="relative z-10 flex items-center justify-between">
              <div>
                 <p className="text-brand-100/80 text-sm">Sequência atual</p>
                 <h2 className="text-3xl font-display font-medium mt-1">4 dias</h2>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                 <Calendar className="w-6 h-6 text-brand-100" />
              </div>
           </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
        >
           <h3 className="text-sm font-semibold text-brand-900 mb-4 ml-1">Histórico Recente</h3>
           <div className="space-y-4">
              {history.map((item, idx) => (
                 <div key={idx} className="bg-white p-5 rounded-[1.5rem] border border-brand-100/50 shadow-sm flex gap-4">
                    <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${item.bg} ${item.color}`}>
                       <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                       <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-brand-900">{item.mood}</span>
                          <span className="text-xs text-gray-400">{item.date} • {item.time}</span>
                       </div>
                       <p className="text-xs text-gray-600 leading-relaxed">{item.note}</p>
                    </div>
                 </div>
              ))}
           </div>
           
           <div className="mt-6 flex justify-center">
              <button className="text-sm font-semibold text-brand-600 hover:text-brand-800">
                 Carregar meses anteriores
              </button>
           </div>
        </motion.section>

      </main>
    </div>
  );
};
