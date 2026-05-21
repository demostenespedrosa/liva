import React from 'react';
import { Users, CalendarCheck, TrendingUp, AlertCircle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-semibold text-gray-900">Visão Geral</h2>
          <p className="text-sm text-gray-500 mt-1">Acompanhe seu desempenho e próximos atendimentos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium text-sm">Pacientes Ativos</h3>
            <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-display font-semibold text-gray-900">12</p>
          <p className="text-sm text-green-600 mt-2 flex items-center font-medium">
            <TrendingUp className="w-4 h-4 mr-1" /> +2 esta semana
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium text-sm">Consultas Hoje</h3>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-display font-semibold text-gray-900">4</p>
          <p className="text-sm text-gray-500 mt-2">Próxima às 14:00</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-gray-900 font-medium font-display mb-1">Status do Perfil</h3>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Visível na Triagem
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            Seu perfil está sendo recomendado para pacientes de acordo com suas 4 tags de especialidade.
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4 font-display">Próximos Atendimentos</h3>
        <div className="space-y-4">
          {[
            { time: "14:00 - 14:50", name: "Rafael Silva", type: "Primeira Sessão", status: "Confirmado" },
            { time: "15:30 - 16:20", name: "Ana Beatriz", type: "Acompanhamento", status: "Confirmado" },
            { time: "17:00 - 17:50", name: "Lucas Mendes", type: "Acompanhamento", status: "Aguardando Confirmação" }
          ].map((apt, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="flex items-center gap-4">
                <div className="text-center w-24">
                  <span className="block text-sm font-semibold text-gray-900">{apt.time.split(' - ')[0]}</span>
                  <span className="block text-xs text-gray-500">Hoje</span>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div>
                  <p className="font-medium text-gray-900">{apt.name}</p>
                  <p className="text-xs text-gray-500">{apt.type}</p>
                </div>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  apt.status === 'Confirmado' 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-yellow-50 text-yellow-700'
                }`}>
                  {apt.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
