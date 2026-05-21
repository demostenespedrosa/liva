import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import * as lucide from "lucide-react";

export const AdminLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: "/admin", icon: lucide.LayoutDashboard, label: "Dashboard", end: true },
    { to: "/admin/agenda", icon: lucide.Calendar, label: "Agenda" },
    { to: "/admin/patients", icon: lucide.Users, label: "Pacientes" },
    { to: "/admin/records", icon: lucide.FileText, label: "Prontuários PEP" },
    { to: "/admin/settings", icon: lucide.Settings, label: "Assinatura & Ajustes" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans relative overflow-x-hidden">
      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar - Drawer on Mobile, Fixed on Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:static lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <div className="flex items-center">
            <lucide.Leaf className="w-5 h-5 text-brand-600 mr-2" />
            <span className="font-display font-semibold text-lg text-brand-900 tracking-tight">Liva Pro</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Fechar menu"
          >
            <lucide.X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 flex-1 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-brand-50 text-brand-600' 
                  : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'}`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500">
            <lucide.ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="text-xs">Conformidade LGPD Ativa</span>
          </div>
          <button className="w-full mt-2 flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors">
            <lucide.LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-1 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
              aria-label="Abrir menu"
            >
              <lucide.Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base sm:text-lg font-medium text-gray-800">Painel de Controle</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">Dra. Carolina Mendes</p>
              <p className="text-xs text-green-600 font-medium tracking-wide gap-1 flex items-center justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                Assinatura Ativa
              </p>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold border border-brand-200 text-sm sm:text-base">
              CM
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
