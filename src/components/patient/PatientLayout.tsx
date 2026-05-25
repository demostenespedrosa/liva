import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home, HeartPulse, HeartHandshake, User } from 'lucide-react';
import { PatientHome } from './PatientHome';
import { PatientCare } from './PatientCare';
import { PatientTherapy } from './PatientTherapy';
import { PatientProfile } from './PatientProfile';
import { PwaInstallPrompt } from './PwaInstallPrompt';
import { CrisisProtocol } from './CrisisProtocol';
import { DawnTimer } from './DawnTimer';

export const PatientLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTabClass = (path: string) => {
    const isActive = location.pathname === path || (path === '/app' && location.pathname === '/app/');
    return `flex flex-col items-center gap-1.5 transition-colors ${isActive ? 'text-brand-900' : 'text-gray-400 hover:text-brand-900'}`;
  };

  const getIconClass = (path: string) => {
    const isActive = location.pathname === path || (path === '/app' && location.pathname === '/app/');
    return `w-6 h-6 transition-transform ${isActive ? 'scale-110' : ''}`;
  };

  const getLabelClass = (path: string) => {
    const isActive = location.pathname === path || (path === '/app' && location.pathname === '/app/');
    return `text-[10px] ${isActive ? 'font-semibold' : 'font-medium'}`;
  };

  return (
    <div className="h-[100dvh] bg-gray-50 flex items-center justify-center font-sans overflow-hidden">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md mx-auto bg-[#FDFBF7] h-full flex flex-col relative md:h-[90vh] md:min-h-[800px] md:rounded-[3rem] md:shadow-2xl md:border-8 border-white md:overflow-hidden">
        
        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          <Routes>
            <Route index element={<PatientHome />} />
            <Route path="care" element={<PatientCare />} />
            <Route path="therapy" element={<PatientTherapy />} />
            <Route path="profile" element={<PatientProfile />} />
            <Route path="crisis" element={<CrisisProtocol />} />
            <Route path="amanhecer" element={<DawnTimer />} />
          </Routes>
        </div>

        <PwaInstallPrompt />

        {/* Bottom Navigation */}
        {location.pathname !== '/app/crisis' && location.pathname !== '/app/amanhecer' && (
           <nav className="absolute inset-x-0 bottom-0 w-full bg-white border-t border-brand-100/50 pb-safe z-50">
             <div className="flex items-center justify-around px-6 pt-3 pb-5">
               <button onClick={() => navigate('/app')} className={getTabClass('/app')}>
                 <Home className={getIconClass('/app')} />
                 <span className={getLabelClass('/app')}>Início</span>
               </button>
               <button onClick={() => navigate('/app/care')} className={getTabClass('/app/care')}>
                 <HeartPulse className={getIconClass('/app/care')} />
                 <span className={getLabelClass('/app/care')}>Cuidado</span>
               </button>
               <button onClick={() => navigate('/app/therapy')} className={getTabClass('/app/therapy')}>
                 <HeartHandshake className={getIconClass('/app/therapy')} />
                 <span className={getLabelClass('/app/therapy')}>Terapia</span>
               </button>
               <button onClick={() => navigate('/app/profile')} className={getTabClass('/app/profile')}>
                 <User className={getIconClass('/app/profile')} />
                 <span className={getLabelClass('/app/profile')}>Perfil</span>
               </button>
             </div>
           </nav>
        )}
        
      </div>
    </div>
  );
};
