import React from 'react';
import { motion } from 'motion/react';
import { Settings, LogOut, Bell, Shield, ChevronRight, Building, CheckCircle2, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../lib/firebase';

export const PatientProfile: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/auth');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-1 flex flex-col pt-12 pb-8">
      <header className="px-6 pb-6 flex items-center gap-4 border-b border-brand-100/50 bg-white sticky top-0 z-10 mb-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md border border-brand-100"
        >
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Clara&backgroundColor=f9f9f9" alt="User avatar" className="w-16 h-16 rounded-full" />
        </motion.div>
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.1 }}
        >
           <h1 className="text-2xl font-display font-medium text-brand-900">Clara</h1>
           <p className="text-gray-500 text-sm flex items-center gap-1 mt-0.5">
             <Building className="w-3 h-3 text-brand-500" /> ACME Corp
           </p>
        </motion.div>
      </header>

      <main className="px-6 space-y-6 overflow-y-auto no-scrollbar pb-32">
         
         {/* Espaço Corporativo / Benefício */}
         <motion.section
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.15 }}
         >
           <h2 className="text-sm font-semibold text-brand-900 mb-3 ml-1 uppercase tracking-widest">Espaço Corporativo</h2>
           
           <div className="bg-brand-900 text-white p-5 rounded-[2rem] shadow-sm mb-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-800 rounded-full blur-2xl -mr-10 -mt-10"></div>
              
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                       <Ticket className="w-5 h-5 text-brand-100" />
                    </div>
                    <div>
                       <h3 className="text-sm font-semibold">Seu Benefício ACME</h3>
                       <p className="text-xs text-brand-200">Plano Saúde Mental Integral</p>
                    </div>
                 </div>
                 
                 <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-brand-100 font-medium mb-1">Sessões Utilizadas no Mês</p>
                      <div className="flex items-center gap-1">
                         <div className="w-3 h-3 rounded-full bg-brand-400"></div>
                         <div className="w-3 h-3 rounded-full bg-brand-400"></div>
                         <div className="w-3 h-3 rounded-full bg-brand-400"></div>
                         <div className="w-3 h-3 rounded-full bg-brand-900 border border-brand-400"></div>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-white">3/4</span>
                 </div>
              </div>
           </div>

           {/* Quick Feedback (Pulsos) */}
           <div className="bg-blue-50 border border-blue-100 p-5 rounded-[1.5rem] relative">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 shadow-sm border border-white">
                 <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">Pesquisa de Clima Anônima</h3>
              <p className="text-xs text-blue-700/80 mb-4 leading-relaxed">Nas últimas semanas, você sentiu que as metas da sua área foram realistas?</p>
              
              <div className="flex gap-2">
                 <button className="flex-1 bg-white border border-blue-200 py-2 rounded-xl text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors">Sim, corretas</button>
                 <button className="flex-1 bg-white border border-blue-200 py-2 rounded-xl text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors">Mais ou menos</button>
                 <button className="flex-1 bg-white border border-blue-200 py-2 rounded-xl text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors">Inviáveis</button>
              </div>
              <p className="text-[9px] text-blue-400/80 mt-3 text-center">Seus dados são 100% anonimizados.</p>
           </div>
         </motion.section>

         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="bg-white rounded-[2rem] border border-brand-100/50 shadow-sm overflow-hidden"
         >
            <div className="flex items-center justify-between p-5 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center">
                     <Bell className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Notificações e Lembretes</span>
               </div>
               <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-5 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center">
                     <Shield className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Privacidade (LGPD)</span>
               </div>
               <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center">
                     <Settings className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Preferências do App</span>
               </div>
               <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
         </motion.div>

         <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-4 bg-white text-gray-600 rounded-[1.5rem] font-medium shadow-sm hover:bg-gray-50 transition-colors border border-gray-100"
         >
            <LogOut className="w-5 h-5" />
            <span>Sair do Aplicativo</span>
         </motion.button>

         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center pt-4"
         >
            <p className="text-[10px] text-gray-400 font-medium">Liva App v1.0.0 (Criptografado)</p>
         </motion.div>
      </main>
    </div>
  );
};
