import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import * as lucide from "lucide-react";
import { auth } from '../lib/firebase';

export const AdminLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/auth');
    } catch (error) {
      console.error(error);
    }
  };

  const navItems = [
    { to: "/pro", icon: lucide.LayoutDashboard, label: "Dashboard", end: true },
    { to: "/pro/agenda", icon: lucide.Calendar, label: "Agenda" },
    { to: "/pro/patients", icon: lucide.Users, label: "Pacientes" },
    { to: "/pro/records", icon: lucide.FileText, label: "Prontuários PEP" },
    { to: "/pro/settings", icon: lucide.Settings, label: "Ajustes" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <lucide.Leaf className="w-6 h-6 text-brand-600" />
                <span className="font-display font-semibold text-xl text-brand-900 tracking-tight">Liva Pro</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1 lg:space-x-2 h-full items-center">
               {navItems.map((item) => (
                  <NavLink
                     key={item.to}
                     to={item.to}
                     end={item.end}
                     className={({ isActive }) =>
                       `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive 
                            ? 'bg-brand-50 text-brand-700' 
                            : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'
                       }`
                     }
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </NavLink>
               ))}
            </nav>

            {/* Right Side Info */}
            <div className="hidden md:flex flex-shrink-0 items-center gap-5">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">Dra. Carolina Mendes</p>
                <div className="flex items-center gap-1.5 justify-end text-xs font-semibold text-green-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm"></div>
                  LGPD Ativa
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 font-bold border border-brand-100 shadow-sm">
                  CM
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  title="Sair"
                >
                  <lucide.LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-gray-500 rounded-md hover:bg-gray-100 transition-colors"
              >
                <lucide.Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay / Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
           <div 
             onClick={() => setIsMobileMenuOpen(false)}
             className="fixed inset-0 bg-black/40 transition-opacity"
           />
           <aside className="relative flex-1 flex flex-col max-w-xs w-full bg-white border-r border-gray-200">
             <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
               <div className="flex items-center gap-2">
                 <lucide.Leaf className="w-5 h-5 text-brand-600" />
                 <span className="font-display font-semibold text-lg text-brand-900 tracking-tight">Liva Pro</span>
               </div>
               <button 
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="p-2 text-gray-500 rounded-md hover:bg-gray-100 transition-colors"
               >
                 <lucide.X className="w-5 h-5" />
               </button>
             </div>
             
             <div className="flex-1 overflow-y-auto py-4">
               <nav className="px-4 space-y-1">
                 {navItems.map((item) => (
                   <NavLink
                     key={item.to}
                     to={item.to}
                     end={item.end}
                     onClick={() => setIsMobileMenuOpen(false)}
                     className={({ isActive }) =>
                       `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                         isActive 
                           ? 'bg-brand-50 text-brand-700' 
                           : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'
                       }`
                     }
                   >
                     <item.icon className="w-5 h-5" />
                     {item.label}
                   </NavLink>
                 ))}
               </nav>
             </div>

             <div className="p-4 border-t border-gray-100">
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 font-bold border border-brand-100">
                   CM
                 </div>
                 <div>
                   <p className="text-sm font-semibold text-gray-900">Dra. Carolina Mendes</p>
                   <p className="text-xs text-green-600 font-medium">Conformidade LGPD Ativa</p>
                 </div>
               </div>
               <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
               >
                 <lucide.LogOut className="w-4 h-4" />
                 Sair da Conta
               </button>
             </div>
           </aside>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};
