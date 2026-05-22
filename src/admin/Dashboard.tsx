import React from 'react';
import { Users, CalendarCheck, TrendingUp, AlertCircle, FileText, Video, Clock, DollarSign, CreditCard, Building2, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main Cockpit Area */}
      <div className="flex-1 space-y-8">
        
        {/* Next Session Hero Card */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-semibold text-gray-900">Agora & Próximo</h2>
            <div className="flex items-center gap-2 text-sm font-medium text-brand-600 bg-brand-50 px-3 py-1.5 rounded-full">
               <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
               Momento Presente
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-brand-900 to-brand-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-brand-900/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center border-b border-white/10 pb-6 mb-6">
               <div>
                  <p className="text-brand-100 font-medium tracking-wide mb-1 flex items-center gap-2">
                     <Clock className="w-4 h-4" /> 14:00 - 14:50 (em 10 min)
                  </p>
                  <h3 className="text-3xl font-display font-medium">Rafael Silva</h3>
                  <p className="text-brand-200 mt-1">Sessão #4 • TCC • Ansiedade Generalizada</p>
               </div>
               <button 
                 onClick={() => navigate('/pro/virtual-office')}
                 className="w-full md:w-auto bg-white text-brand-900 px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-brand-50 hover:scale-105 transition-all shadow-lg active:scale-95"
               >
                 <Video className="w-5 h-5" />
                 Iniciar Consultório Virtual
               </button>
            </div>
            
            <div className="relative z-10 flex flex-wrap gap-4">
               <button className="bg-white/10 hover:bg-white/20 transition-colors px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 backdrop-blur-sm">
                  <FileText className="w-4 h-4" /> Notas da última sessão
               </button>
               <button className="bg-white/10 hover:bg-white/20 transition-colors px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 backdrop-blur-sm">
                  <AlertCircle className="w-4 h-4 text-orange-300" /> Paciente relatou ansiedade alta no app ontem
               </button>
            </div>
          </div>
        </section>

        {/* Predictive Financial Dashboard */}
        <section>
          <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">Previsão Financeira Autônoma</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {/* Box 1 */}
             <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-5 h-5" />
                   </div>
                   <h3 className="text-sm font-semibold text-gray-600">Saldo Disponível</h3>
                </div>
                <p className="text-3xl font-display font-semibold text-gray-900">R$ 3.450</p>
                <button className="mt-4 text-sm font-medium text-green-600 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors self-start">
                   Solicitar Saque
                </button>
             </div>
             
             {/* Box 2 */}
             <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                   </div>
                   <h3 className="text-sm font-semibold text-gray-600">Faturamento Previsto</h3>
                </div>
                <p className="text-3xl font-display font-semibold text-gray-900">R$ 8.200</p>
                <p className="text-xs text-gray-500 mt-2 font-medium">Boleto automático/Cartão</p>
             </div>

             {/* Box 3 */}
             <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                   </div>
                   <h3 className="text-sm font-semibold text-gray-600">Subsídio Corporativo</h3>
                </div>
                <p className="text-3xl font-display font-semibold text-gray-900">R$ 1.150</p>
                <p className="text-xs text-gray-500 mt-2 font-medium">Sessões parceiras de RH</p>
             </div>
          </div>
        </section>

      </div>

      {/* Right Sidebar: Timeline */}
      <div className="w-full lg:w-80 flex-shrink-0">
         <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm sticky top-24">
            <h3 className="text-lg font-display font-semibold text-gray-900 mb-6">Linha do Tempo Hoje</h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-200 before:to-transparent">
               
               {/* Concluded */}
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-gray-200 text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 absolute left-0 md:left-1/2">
                     <CheckCircle2 className="w-4 h-4 fill-white text-gray-400" />
                  </div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-8 md:ml-0 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                     <span className="text-xs font-semibold text-gray-400">09:00 - 09:50</span>
                     <p className="text-sm font-medium text-gray-500 mt-1">Carla Dias</p>
                  </div>
               </div>

               {/* Next */}
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-brand-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 absolute left-0 md:left-1/2">
                     <span className="w-2 h-2 rounded-full bg-white"></span>
                  </div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-8 md:ml-0 p-4 rounded-2xl bg-brand-50 border border-brand-200 shadow-sm relative right-2 left-auto md:right-0">
                     <span className="text-xs font-semibold text-brand-600">14:00 - 14:50</span>
                     <p className="text-sm font-medium text-brand-900 mt-1 flex items-center gap-1">Rafael S. <ChevronRight className="w-3 h-3 text-brand-400" /></p>
                  </div>
               </div>

               {/* Future */}
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-white border-gray-200 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 absolute left-0 md:left-1/2">
                  </div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-8 md:ml-0 p-4 rounded-2xl bg-white border border-gray-200">
                     <span className="text-xs font-semibold text-gray-500">15:30 - 16:20</span>
                     <p className="text-sm font-medium text-gray-900 mt-1">Ana Beatriz</p>
                  </div>
               </div>
               
               {/* Future */}
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-white border-gray-200 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 absolute left-0 md:left-1/2">
                  </div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-8 md:ml-0 p-4 rounded-2xl bg-white border border-gray-200">
                     <span className="text-xs font-semibold text-gray-500">17:00 - 17:50</span>
                     <p className="text-sm font-medium text-gray-900 mt-1">Lucas Mendes</p>
                  </div>
               </div>

            </div>
         </div>
      </div>
    </div>
  );
};

