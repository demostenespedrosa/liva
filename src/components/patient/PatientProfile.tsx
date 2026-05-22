import React from 'react';
import { motion } from 'motion/react';
import { Settings, LogOut, Bell, Shield, ChevronRight } from 'lucide-react';
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
      <header className="px-6 pb-6 flex items-center gap-4">
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
           <p className="text-gray-500 text-sm">clara@exemplo.com</p>
        </motion.div>
      </header>

      <main className="px-6 space-y-4">
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
            className="w-full mt-4 flex items-center justify-center gap-2 py-4 bg-white text-gray-600 rounded-2xl font-medium shadow-sm hover:bg-gray-50 transition-colors border border-gray-100"
         >
            <LogOut className="w-5 h-5" />
            <span>Sair do Aplicativo</span>
         </motion.button>

         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center pt-8"
         >
            <p className="text-[10px] text-gray-400 font-medium">Liva App v1.0.0 (Criptografado)</p>
         </motion.div>
      </main>
    </div>
  );
};
