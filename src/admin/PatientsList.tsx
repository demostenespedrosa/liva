import React from 'react';
import { Search, MoreVertical, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PatientsList: React.FC = () => {
  const patients = [
    { id: 1, name: "Rafael Silva", email: "rafael@email.com", firstSession: "10 Jan 2026", status: "Ativo" },
    { id: 2, name: "Ana Beatriz Sousa", email: "ana.b@email.com", firstSession: "05 Mar 2026", status: "Ativo" },
    { id: 3, name: "Lucas Mendes", email: "lucas.m@email.com", firstSession: "Aguardando", status: "Novo" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-display font-semibold text-gray-900">Pacientes</h2>
          <p className="text-sm text-gray-500 mt-1">Gerencie seus pacientes e acesse os prontuários.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar paciente..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent w-full text-sm"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Início</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.firstSession}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${patient.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-3">
                      <Link 
                        to={`/admin/records/${patient.id}`} 
                        className="text-brand-600 hover:text-brand-900 flex items-center gap-1 bg-brand-50 px-3 py-1.5 rounded-lg transition-colors text-xs font-medium"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Prontuário
                      </Link>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
