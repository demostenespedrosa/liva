import React from "react";
import { Leaf } from "lucide-react";

interface HeaderProps {
  activeTab: 'patients' | 'companies' | 'psychologists';
  onChangeTab: (tab: 'patients' | 'companies' | 'psychologists') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onChangeTab }) => {
  return (
    <header className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col md:flex-row gap-4 items-center justify-between border-b border-gray-100/50 md:border-b-0">
      <div 
        className="flex items-center gap-2 text-brand-600 hover:opacity-85 cursor-pointer" 
        onClick={() => onChangeTab('patients')}
      >
        <Leaf className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="font-display font-semibold text-lg sm:text-xl tracking-tight">Liva</span>
      </div>

      <nav className="flex items-center bg-[#F3F1EB] p-1 rounded-full border border-[#E9E5DC]">
        <button
          onClick={() => onChangeTab('patients')}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold tracking-tight transition-all whitespace-nowrap ${
            activeTab === 'patients'
              ? 'bg-white text-brand-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Para Pacientes
        </button>
        <button
          onClick={() => onChangeTab('companies')}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold tracking-tight transition-all whitespace-nowrap ${
            activeTab === 'companies'
              ? 'bg-white text-brand-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Para Empresas / RH
        </button>
        <button
          onClick={() => onChangeTab('psychologists')}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold tracking-tight transition-all whitespace-nowrap ${
            activeTab === 'psychologists'
              ? 'bg-white text-brand-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Para Psicólogos
        </button>
      </nav>
    </header>
  );
}

