import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export const Agenda: React.FC = () => {
  // Static mockup for the calendar
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const dates = Array.from({ length: 35 }, (_, i) => i - 2); // mockup days

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between sm:justify-start gap-4">
          <h2 className="text-xl font-display font-semibold text-gray-900">Maio 2026</h2>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-600 text-white px-4 py-2.5 sm:py-2 rounded-xl text-sm font-medium hover:bg-brand-700 transition-colors">
          <Plus className="w-4 h-4" />
          Novo Agendamento
        </button>
      </div>
      
      <div className="p-4 sm:p-6 overflow-x-auto">
        <div className="grid grid-cols-7 gap-px rounded-lg overflow-hidden border border-gray-200 bg-gray-200 min-w-[760px]">
          {days.map(day => (
            <div key={day} className="bg-gray-50 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              {day}
            </div>
          ))}
          {dates.map((date, i) => (
            <div 
              key={i} 
              className={`min-h-[100px] bg-white p-2 transition-colors hover:bg-gray-50 ${
                date > 0 && date <= 31 ? 'text-gray-900' : 'text-gray-300'
              }`}
            >
              <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${date === 21 ? 'bg-brand-600 text-white' : ''}`}>
                {date > 0 && date <= 31 ? date : (date <= 0 ? 30 + date : date - 31)}
              </span>
              
              {date === 21 && (
                <div className="mt-2 flex flex-col gap-1">
                  <div className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] rounded border border-blue-100 truncate">
                    14:00 - Rafael S.
                  </div>
                  <div className="px-2 py-1 bg-green-50 text-green-700 text-[10px] rounded border border-green-100 truncate">
                    15:30 - Ana B.
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
