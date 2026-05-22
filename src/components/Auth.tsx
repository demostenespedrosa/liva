import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, ArrowRight, Mail, Lock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

type AuthMode = 'login' | 'register';

export const AuthScreen: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          let role = 'patient';
          if (userDoc.exists()) {
            role = userDoc.data().role || 'patient';
          }
          if (role === 'pro') navigate('/pro');
          else if (role === 'corporate') navigate('/corporate');
          else if (role === 'admin') navigate('/superadmin');
          else navigate('/app');
        } catch (e) {
          console.error(e);
          setInitializing(false);
        }
      } else {
        setInitializing(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    try {
      if (mode === 'register') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // User registers automatically as "patient".
        await setDoc(doc(db, 'users', user.uid), {
          id: user.uid,
          email: user.email,
          role: 'patient',
          created_at: new Date().toISOString()
        });
        // The onAuthStateChanged listener might catch the redirect, but we can leave it here as well or just let the redirect happen.
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Ocorreu um erro.');
      setLoading(false);
    }
  };

  if (initializing) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row bg-white rounded-[2.5rem] shadow-xl shadow-brand-900/5 overflow-hidden border border-brand-100/50">
        
        {/* Left Side - Visual / Emotional */}
        <div className="md:w-5/12 bg-brand-50 p-10 md:p-14 flex flex-col items-start justify-center relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-100/50 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-200/30 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col h-full w-full justify-between">
            <div className="flex items-center gap-2 text-brand-600 mb-12">
              <Leaf className="w-8 h-8" />
              <span className="font-display font-semibold text-2xl tracking-tight">Liva</span>
            </div>

            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl md:text-4xl font-display font-medium text-brand-900 leading-tight mb-4">
                    {mode === 'login' ? 'Que bom ter você de volta.' : 'Um abraço quentinho para sua saúde mental.'}
                  </h2>
                  <p className="text-gray-600 leading-relaxed max-w-sm">
                    {mode === 'login' 
                      ? 'Reconecte-se com seu espaço seguro de acolhimento e desenvolvimento contínuo.' 
                      : 'Crie sua conta para acessar um ecossistema projetado para o seu bem-estar diário e suporte especializado.'}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="mt-12 text-sm text-brand-600/60 font-medium">
              Ambiente protegido por criptografia de ponta a ponta.
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-7/12 p-10 md:p-16 bg-white flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-display font-semibold text-brand-900">
                {mode === 'login' ? 'Entrar' : 'Criar Conta'}
              </h3>
              <div className="flex bg-gray-50 p-1 rounded-full border border-gray-100">
                <button
                  onClick={() => setMode('login')}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${mode === 'login' ? 'bg-white text-brand-900 shadow-sm' : 'text-gray-500'}`}
                >
                  Login
                </button>
                <button
                  onClick={() => setMode('register')}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${mode === 'register' ? 'bg-white text-brand-900 shadow-sm' : 'text-gray-500'}`}
                >
                  Cadastro
                </button>
              </div>
            </div>

            <form onSubmit={handleAuth} className="space-y-6">
              
              {errorMsg && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
                  {errorMsg}
                </div>
              )}

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-sm"
                      placeholder="clara@exemplo.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Senha</label>
                    {mode === 'login' && <a href="#" className="text-xs text-brand-600 hover:underline">Esqueci a senha</a>}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-500 text-white font-medium rounded-xl hover:bg-brand-600 transition-colors shadow-md mt-6 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Entrar no Liva' : 'Criar minha conta'}</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <button className="flex items-center justify-center gap-3 w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continuar com o Google
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
