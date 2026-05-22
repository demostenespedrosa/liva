import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, BookHeart, User } from 'lucide-react';
import { PatientHome } from './PatientHome';
import { PatientTrails } from './PatientTrails';
import { PatientDiary } from './PatientDiary';
import { PatientProfile } from './PatientProfile';

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md mx-auto bg-[#FDFBF7] min-h-screen md:min-h-[850px] md:h-[90vh] md:rounded-[3rem] md:shadow-2xl md:border-8 border-white md:overflow-hidden relative flex flex-col">
        
        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
          <Routes>
            <Route index element={<PatientHome />} />
            <Route path="trails" element={<PatientTrails />} />
            <Route path="diary" element={<PatientDiary />} />
            <Route path="profile" element={<PatientProfile />} />
          </Routes>
        </div>

        {/* Bottom Navigation */}
        <nav className="absolute inset-x-0 bottom-0 bg-white border-t border-brand-100/50 md:rounded-b-[2.5rem] pb-safe z-50">
          <div className="flex items-center justify-around px-6 pt-4 pb-6">
            <button onClick={() => navigate('/app')} className={getTabClass('/app')}>
              <Home className={getIconClass('/app')} />
              <span className={getLabelClass('/app')}>Início</span>
            </button>
            <button onClick={() => navigate('/app/trails')} className={getTabClass('/app/trails')}>
              <Compass className={getIconClass('/app/trails')} />
              <span className={getLabelClass('/app/trails')}>Trilhas</span>
            </button>
            <button onClick={() => navigate('/app/diary')} className={getTabClass('/app/diary')}>
              <BookHeart className={getIconClass('/app/diary')} />
              <span className={getLabelClass('/app/diary')}>Diário</span>
            </button>
            <button onClick={() => navigate('/app/profile')} className={getTabClass('/app/profile')}>
              <User className={getIconClass('/app/profile')} />
              <span className={getLabelClass('/app/profile')}>Perfil</span>
            </button>
          </div>
        </nav>
        
      </div>
    </div>
  );
};
