import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;
  prompt(): Promise<void>;
}

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Optional: check if already dismissed from localStorage
      const isDismissed = localStorage.getItem('liva_pwa_dismissed');
      if (!isDismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('liva_pwa_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="absolute bottom-24 inset-x-4 z-50 pointer-events-none"
        >
          <div className="bg-brand-900 border border-brand-800 rounded-2xl shadow-xl overflow-hidden p-4 pointer-events-auto flex items-start gap-4 shadow-brand-900/20 text-white">
             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex-shrink-0 flex items-center justify-center border border-white/10">
                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Liva" alt="App Icon" className="w-8 h-8 rounded-lg" />
             </div>
             
             <div className="flex-1 min-w-0">
               <h4 className="text-sm font-semibold mb-0.5 mt-0.5">Liva no seu celular</h4>
               <p className="text-xs text-brand-100/90 leading-tight">Adicione o Liva à tela inicial para acesso rápido e offline.</p>
               
               <div className="flex items-center gap-3 mt-3">
                 <button
                   onClick={handleInstallClick}
                   className="flex-1 py-2 bg-brand-500 rounded-lg text-xs font-semibold text-white hover:bg-brand-600 transition-colors"
                 >
                   Instalar App
                 </button>
                 <button
                   onClick={handleDismiss}
                   className="py-2 px-3 bg-white/10 rounded-lg text-xs font-semibold hover:bg-white/20 transition-colors"
                 >
                   <X className="w-4 h-4" />
                 </button>
               </div>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
