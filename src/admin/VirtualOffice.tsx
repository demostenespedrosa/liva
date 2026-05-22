import React, { useState, useEffect } from 'react';
import { Video, Mic, MicOff, VideoOff, PhoneOff, Settings, Minimize2, Maximize2, ShieldCheck, BrainCircuit, AlertTriangle, FileText, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const VirtualOffice: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [notes, setNotes] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(50 * 60); // 50 mins in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isEnding = timeRemaining <= 10 * 60; // last 10 minutes

  return (
    <div className={`h-screen w-full bg-gray-900 flex flex-col font-sans overflow-hidden ${isFullscreen ? 'fixed inset-0 z-[100]' : ''}`}>
      {/* Top Bar */}
      <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <span className="text-gray-300 font-medium text-sm">Sessão Segura P2P</span>
          </div>
          <div className="w-px h-6 bg-gray-700"></div>
          <span className="text-white font-medium">Rafael Silva</span>
        </div>

        <div className="flex items-center gap-4">
           {/* Floating Timer */}
           <div className={`px-4 py-1.5 rounded-full font-mono font-medium tracking-wider text-sm transition-colors ${isEnding ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' : 'bg-gray-800 text-gray-300 border border-gray-700'}`}>
              {formatTime(timeRemaining)}
           </div>

           <button onClick={() => setIsFullscreen(!isFullscreen)} className="text-gray-400 hover:text-white transition-colors">
             {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
           </button>
        </div>
      </header>

      {/* Main Content Split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Video */}
        <div className="flex-1 bg-black relative flex items-center justify-center border-r border-gray-800">
          <img src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=2670&auto=format&fit=crop" alt="Patient Video" className="w-full h-full object-cover opacity-80" />
          
          <div className="absolute bottom-6 right-6 w-48 h-32 bg-gray-800 rounded-xl overflow-hidden border-2 border-gray-700 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1573496359142-[...] " alt="Psychologist Video" className="w-full h-full object-cover" />
          </div>

          {/* Controls Overlay */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-gray-900/80 backdrop-blur pb-safe pt-4 px-6 rounded-3xl border border-gray-700">
             <button 
               onClick={() => setMicOn(!micOn)}
               className={`p-4 rounded-full transition-colors ${micOn ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-red-500 text-white hover:bg-red-600'}`}
             >
               {micOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
             </button>
             <button 
               onClick={() => setVideoOn(!videoOn)}
               className={`p-4 rounded-full transition-colors ${videoOn ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-red-500 text-white hover:bg-red-600'}`}
             >
               {videoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
             </button>
             <button className="p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors">
               <Settings className="w-6 h-6" />
             </button>
             <button 
                onClick={() => navigate('/pro')}
                className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors ml-4"
             >
               <PhoneOff className="w-6 h-6" />
             </button>
          </div>
        </div>

        {/* Right: PEP (Prontuário) */}
        <div className="w-[450px] bg-white flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
             <h2 className="font-display font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-600" />
                PEP • Auto-saving
             </h2>
             <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
             <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Abordagem: TCC (Template)</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Queixas principais, gatilhos discutidos hoje..."
                  className="w-full h-48 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                />
             </div>

             <div className="p-4 bg-brand-50 rounded-xl border border-brand-100">
                <h3 className="text-xs font-semibold text-brand-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                   <BrainCircuit className="w-4 h-4 text-brand-600" />
                   Inteligência Clínica
                </h3>
                <div className="space-y-3">
                   <p className="text-xs text-gray-600">O paciente marcou "Triste" em 4 dos últimos 7 dias no app.</p>
                   <button className="text-xs font-semibold text-brand-600 hover:text-brand-800 transition-colors">
                     Ver gráficos completos do Diário Emocional
                   </button>
                </div>
             </div>

             <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                <h3 className="text-xs font-semibold text-orange-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                   <AlertTriangle className="w-4 h-4 text-orange-600" />
                   Risco Psicossocial
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                   <span className="px-2 py-1 bg-white border border-orange-200 text-orange-800 text-[10px] font-semibold rounded pointer-cursor">Burnout</span>
                   <span className="px-2 py-1 bg-white border border-orange-200 text-orange-800 text-[10px] font-semibold rounded pointer-cursor hover:bg-orange-100">+ Add Tag</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
