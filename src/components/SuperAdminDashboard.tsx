import React from 'react';
import { ShieldCheck, Building2, UserCheck, DollarSign, Activity, FileText } from 'lucide-react';

export const SuperAdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-8">
        <div className="flex items-center gap-3 text-gray-900">
          <ShieldCheck className="w-8 h-8 text-black" />
          <h1 className="text-2xl font-bold tracking-tight">Liva SuperAdmin</h1>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="font-medium text-gray-600">admin@liva.com.br</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar Nav */}
        <div className="md:col-span-3 space-y-1">
          {[
            { label: 'Visão Geral', icon: Activity, active: true },
            { label: 'Contratos B2B', icon: Building2, active: false },
            { label: 'Motor Financeiro (Split)', icon: DollarSign, active: false },
            { label: 'Moderação CRP/CRM', icon: UserCheck, active: false },
            { label: 'Auditoria SLAs (Logs)', icon: FileText, active: false },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${item.active ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-200/50'}`}>
              <item.icon className={`w-4 h-4 ${item.active ? 'text-white' : 'text-gray-500'}`} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-9 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Empresas Ativas</p>
              <h3 className="text-3xl font-bold text-gray-900">24</h3>
              <p className="text-xs text-green-600 mt-2 font-medium">+3 neste mês</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Vidas Cobertas</p>
              <h3 className="text-3xl font-bold text-gray-900">8,450</h3>
              <p className="text-xs text-green-600 mt-2 font-medium">+1,200 neste mês</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-1">SLAs Estourados (SOS)</p>
              <h3 className="text-3xl font-bold text-red-600">2</h3>
              <p className="text-xs text-red-500 mt-2 font-medium">Atenção requerida (Acima 24h)</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Monitor de SLAs e Casos Críticos</h2>
              <button className="text-sm text-blue-600 font-medium font-medium hover:underline">Ver todos</button>
            </div>
            <div className="p-0">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase font-medium text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Protocolo / Paciente</th>
                    <th className="px-6 py-4">Empresa / SLA</th>
                    <th className="px-6 py-4">Status da Triagem</th>
                    <th className="px-6 py-4">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-red-50/30">
                    <td className="px-6 py-4 font-medium text-gray-900">#SOS-7890<br/><span className="text-xs text-gray-500 font-normal">Anonimizado (ID: 442)</span></td>
                    <td className="px-6 py-4">NextGen<br/><span className="text-xs text-red-600 font-medium">Estouro de +4h (SLA 24h)</span></td>
                    <td className="px-6 py-4"><span className="inline-flex px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">Aguardando Avaliação Psiquiátrica</span></td>
                    <td className="px-6 py-4"><button className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800">Forçar Escalonamento</button></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">#SOS-7891<br/><span className="text-xs text-gray-500 font-normal">Anonimizado (ID: 881)</span></td>
                    <td className="px-6 py-4">Acme Corp<br/><span className="text-xs text-green-600 font-medium">No prazo (Restam 12h)</span></td>
                    <td className="px-6 py-4"><span className="inline-flex px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">Em Análise pelo Dr. Marcos</span></td>
                    <td className="px-6 py-4"><button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200">Acompanhar</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
             <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Motor de Split (Simulação Financeira)</h2>
                <div className="flex items-center gap-8 text-sm">
                   <div className="flex-1 p-4 bg-gray-50 rounded-xl">
                      <p className="text-gray-500 font-medium mb-1">Sessão Executada (Valor R$ 120)</p>
                      <div className="h-4 w-full bg-gray-200 rounded-full flex overflow-hidden mt-3">
                         <div className="bg-brand-500 h-full w-[80%] flex items-center px-2 text-[10px] text-white font-bold">Empresa (80%)</div>
                         <div className="bg-blue-500 h-full w-[20%] flex items-center px-2 text-[10px] text-white font-bold">Colab. (20%)</div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                         <span>Take Rate Liva: R$ 18.00 (15%)</span>
                         <span className="font-medium text-gray-900">Repasse Psi: R$ 102.00</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
