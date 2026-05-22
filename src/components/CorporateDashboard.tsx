import React from 'react';
import { PieChart, Users, AlertTriangle, Download, ArrowUpRight, ArrowDownRight, Scale } from 'lucide-react';

export const CorporateDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] p-8 font-sans">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-display font-semibold text-brand-900">Visão Corporativa</h1>
          <p className="text-gray-500">Acme Corp - Inteligência em Saúde Mental (Anonimizada)</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Scale className="w-4 h-4" />
            Relatório PGR / NR-1
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors">
            <Download className="w-4 h-4" />
            Exportar Dados
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Adesão ao Programa', value: '78%', trend: '+12%', positive: true, icon: Users },
            { label: 'Risco Preditivo (Burnout)', value: '14%', trend: '-3%', positive: true, icon: AlertTriangle },
            { label: 'Dias de Afastamento (Mês)', value: '42', trend: '-8', positive: true, icon: PieChart },
            { label: 'Economia Estimada (Turnover)', value: 'R$ 84k', trend: '+15%', positive: true, icon: ArrowUpRight }
          ].map((kpi, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <kpi.icon className="w-5 h-5 text-brand-500" />
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${kpi.positive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {kpi.trend}
                </span>
              </div>
              <p className="text-sm text-gray-500">{kpi.label}</p>
              <h3 className="text-2xl font-display font-semibold text-brand-900 mt-1">{kpi.value}</h3>
            </div>
          ))}
        </div>

        {/* Heatmap / Departamento */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-brand-900">Mapa de Calor por Departamento</h2>
            <button className="text-sm font-medium text-brand-600 hover:underline">Ver detalhes detalhados</button>
          </div>
          <p className="text-sm text-gray-500 mb-6 max-w-2xl">
            Com base na consolidação anonimizada do Diário Emocional e Trilhas de Estresse. Identifique áreas que precisam de intervenção da liderança antes do esgotamento (Burnout).
          </p>

          <div className="space-y-4">
            {[
              { dept: 'Operações e Logística', risk: 85, status: 'Crítico', color: 'bg-red-500' },
              { dept: 'Vendas (SDR/BDR)', risk: 65, status: 'Atenção', color: 'bg-orange-400' },
              { dept: 'Engenharia / TI', risk: 30, status: 'Estável', color: 'bg-green-500' },
              { dept: 'Recursos Humanos', risk: 15, status: 'Baixo Risco', color: 'bg-brand-400' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-48 text-sm font-medium text-gray-700">{item.dept}</div>
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.risk}%` }}></div>
                </div>
                <div className="w-24 text-right text-xs font-semibold text-gray-500">{item.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Training & CID-F Management */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-brand-900 text-white p-8 rounded-3xl shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full blur-3xl -mr-20 -mt-20"></div>
             <div className="relative z-10">
               <h2 className="text-lg font-semibold mb-2">Capacitação de Lideranças</h2>
               <p className="text-brand-100/80 text-sm mb-6">Treinamento recomendado: Primeiros Socorros Psicológicos para o Time de Operações.</p>
               <button className="px-5 py-2.5 bg-white text-brand-900 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                 Iniciar Módulo de Vídeo
               </button>
             </div>
           </div>

           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
             <h2 className="text-lg font-semibold text-brand-900 mb-2">Gestão de Afastamentos (CID-F)</h2>
             <p className="text-sm text-gray-500 mb-6">3 colaboradores em licença com plano ativo de retorno ao trabalho guiado pela Liva.</p>
             <button className="px-5 py-2.5 bg-brand-50 text-brand-700 rounded-lg text-sm font-medium hover:bg-brand-100 transition-colors w-full">
               Acompanhar Evoluções (Comitê Médico)
             </button>
           </div>
        </div>
      </main>
    </div>
  );
};
