import React, { useState, useEffect } from 'react';
import { CreditCard, Shield, Globe, Calendar as CalendarIcon, LogIn, CheckCircle2 } from 'lucide-react';
import { googleSignIn, initAuth, logout } from '../lib/auth';
import type { User } from 'firebase/auth';

export const Settings: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    initAuth(
      (u, t) => {
        setUser(u);
        setToken(t);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
  }, []);

  const handleConnectCalendar = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
      }
    } catch (err) {
      console.error('Falha ao conectar Google Calendar:', err);
      // In production, we would display a toast message here instead of an alert
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleDisconnectCalendar = async () => {
    await logout();
    setUser(null);
    setToken(null);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-display font-semibold text-gray-900">Assinatura & Ajustes</h2>
        <p className="text-sm text-gray-500 mt-1">Gerencie seu trial de 30 dias e a visibilidade do seu perfil na Landing Page.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
          <CreditCard className="w-48 h-48 text-brand-600" />
        </div>
        
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-medium text-gray-900">Plano Pro (Trial)</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                Teste Grátis
              </span>
            </div>
            <p className="text-sm text-gray-600">Faltam <span className="font-semibold text-gray-900">12 dias</span> para o fim do seu trial gratuito.</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-2xl font-display font-semibold text-gray-900">R$ 97<span className="text-sm text-gray-500 font-normal">/mês</span></p>
          </div>
        </div>

        <div className="relative z-10 bg-gray-50 rounded-xl p-5 border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-600" />
            Visibilidade do Algoritmo de Triage
          </h4>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Seu perfil está <strong className="text-green-700">ATIVO e visível</strong> para os pacientes através da triagem da landing page.
            <br/><br/>
            Nossa infraestrutura backend utiliza Webhooks integrados com a Stripe/Asaas. 
            Se a assinatura não for renovada após os 30 dias, o evento <code>customer.subscription.deleted</code> alterará 
            automaticamente o status da propriedade <code>is_public</code> do seu perfil no Firebase Firestore para <code>false</code>, e você sairá do algoritmo de recomendação até normalizar o pagamento.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-6">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors text-sm">
              <CreditCard className="w-4 h-4" />
              Upgrade: Adicionar Cartão
            </button>
            <button className="text-sm text-red-600 font-medium hover:text-red-700 w-full sm:w-auto text-center py-2">Cancelar Trial</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-600" />
            Configurar Regras de Segurança no Firestore (Simulação)
          </h4>
          <p className="text-sm text-gray-600 mb-6">
             As Regras de Segurança do Firebase Firestore protegem os seus dados. Por padrão, 
             nenhum psicólogo tem permissão de ver os pacientes uns dos outros, nem de ver 
             registros que não pertençam a eles no banco de dados.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
             <div>
                <p className="text-sm font-medium text-gray-900">Ocultar perfil manualmente</p>
                <p className="text-xs text-gray-500 mt-1">Força o boolean is_public para false, removendo você do algoritmo sem cancelar a assinatura.</p>
             </div>
             <button className="w-12 h-6 bg-brand-500 rounded-full relative flex items-center px-1 flex-shrink-0 self-start sm:self-auto">
                <span className="w-4 h-4 bg-white rounded-full translate-x-6"></span>
             </button>
          </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-brand-600" />
            Integração com Google Calendar
          </h4>
          <p className="text-sm text-gray-600 mb-6">
             Conecte sua conta do Google para sincronizar automaticamente as consultas do prontuário para sua agenda. 
             Você precisará autorizar o acesso à sua agenda, permitindo apenas a gravação e leitura de eventos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
             <div>
                <p className="text-sm font-medium text-gray-900">Sincronização de Agenda</p>
                {user ? (
                   <p className="text-xs text-green-600 mt-1 flex items-center gap-1 font-medium wrap break-all">
                     <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                     Conectado como {user.email || user.displayName}
                   </p>
                ) : (
                   <p className="text-xs text-gray-500 mt-1">Nenhuma conta conectada no momento.</p>
                )}
             </div>
             {user ? (
                <button 
                  onClick={handleDisconnectCalendar}
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors text-center"
                >
                  Desconectar
                </button>
             ) : (
                <button 
                  onClick={handleConnectCalendar}
                  disabled={isLoggingIn}
                  className="w-full sm:w-auto flex items-center justify-center gap-4 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all font-medium text-gray-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed text-center"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-full h-full">
                      <title>Sign in with Google</title>
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  </div>
                  <span>{isLoggingIn ? 'Conectando...' : 'Conectar Google'}</span>
                </button>
             )}
          </div>
      </div>
    </div>
  );
};
