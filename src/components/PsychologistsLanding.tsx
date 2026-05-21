import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles, BookOpen, ShieldCheck, Heart, Calendar, Lock, HelpCircle } from "lucide-react";

interface PsychologistsLandingProps {
  onBackToPatients: () => void;
}

export const PsychologistsLanding: React.FC<PsychologistsLandingProps> = ({ onBackToPatients }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "Como funciona o período de teste de 30 dias?",
      a: "Você tem acesso total e irrestrito ao Liva Pro (prontuários seguros, agendamento automatizado via Google Calendar e recomendação pelo algoritmo regional) por 30 dias. Não solicitamos dados de pagamento no cadastro inicial."
    },
    {
      q: "Como o Liva garante a conformidade com o CFP?",
      a: "Toda a nossa base de dados é estruturada sob criptografia ativa integrada de acordo com a Resolução CFP Nº 01/2009. Seus prontuários ficam protegidos com chaves de criptografia e garantimos a retenção mínima de 5 anos obrigatória por lei."
    },
    {
      q: "Como funciona o algoritmo de triagem dos pacientes?",
      a: "O paciente responde a um prompt de triagem humanizado de 3 queixas no portal público Liva. O sistema mapeia os sintomas declarados (ex: ansiedade, burnout, luto) e indica os 3 psicólogos disponíveis na plataforma que possuem maior nível de maestria na queixa correspondente. Sem competição injusta ou leilão de consultas."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full flex-1 flex flex-col pb-0"
    >
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto pt-10 md:pt-20 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 text-brand-600 text-sm font-semibold mb-8 border border-brand-100">
            <BookOpen className="w-4 h-4" />
            <span>Ecossistema Ético para Psicólogos</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl text-brand-900 font-medium tracking-tight leading-tight mb-6">
            Sua clínica conectada <br className="hidden md:block"/> ao paciente ideal.
          </h1>
          
          <p className="text-gray-600 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">
            Muito mais que um hub de indicações. Domine sua agenda com prontuários blindados, sincronização robusta com o Google Calendar e pacientes qualificados diretamente integrados às suas especialidades técnicas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link 
              to="/admin/settings"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-500 text-white rounded-full font-medium text-lg overflow-hidden transition-all hover:bg-brand-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              <span>Começar Trial Gratuito (30 dias)</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              to="/admin"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors text-lg text-center"
            >
              Acessar Painel Liva Pro
            </Link>
          </div>

          <p className="mt-5 text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
            <Lock className="w-4 h-4 text-brand-600" /> 
            Sem compromissos com cartão de crédito. R$ 97/mês somente se decidir continuar após o trial.
          </p>
        </motion.div>
      </section>

      {/* Benefits Grid */}
      <section className="bg-white py-20 border-t border-brand-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-brand-900 font-medium tracking-tight mb-4">
              Acolhimento clínico de ponta a ponta
            </h2>
            <p className="text-gray-600">
              Desenhamos uma solução que elimina as dores administrativas e burocráticas chovendo sobre o seu consultório terapêutico.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Prontuário Seguro",
                desc: "Atendimento ético resguardado por criptografia de banco (Resol. CFP 01/2009) e chaves exclusivas de trânsito."
              },
              {
                icon: Calendar,
                title: "Google Calendar",
                desc: "Sincronização imediata automática. Consultas salvas no prontuário aparecem instantaneamente na sua agenda habitual do Google."
              },
              {
                icon: Heart,
                title: "Matches Qualificados",
                desc: "Diga adeus à concorrência por preço em guias médicos genéricos. Receba conexões com pacientes que de fato precisam de sua especialidade."
              },
              {
                icon: Sparkles,
                title: "Agenda Livre",
                desc: "Contato direto. O paciente inicia conversa com você pelo WhatsApp trazendo o contexto preliminar já preenchido pela Liva."
              }
            ].map((benefit, i) => (
              <div key={i} className="bg-[#FDFBF7] p-6 rounded-3xl border border-brand-100/50 flex flex-col items-start">
                <div className="w-12 h-12 bg-white text-brand-600 rounded-xl flex items-center justify-center mb-5 border border-brand-100 shadow-xs">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-brand-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#FDFBF7]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-600 mb-4 shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
              <span>Dúvidas comuns</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-brand-900 font-medium tracking-tight">
              Tudo sobre o Liva Pro
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between font-medium text-brand-900 focus:outline-none hover:bg-gray-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-xl text-brand-500 font-normal leading-none">
                    {activeFaq === i ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-sm text-gray-600 border-t border-gray-100 pt-3 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Block */}
      <section className="bg-brand-900 pt-20 pb-8 px-6 mt-auto flex-col flex w-full">
        <div className="max-w-3xl mx-auto text-center mb-16 flex-1">
          <h2 className="font-display text-3xl md:text-4xl text-white font-medium tracking-tight mb-6">
            Simplifique a clínica. Eleve as suas conexões terapêuticas.
          </h2>
          <p className="text-brand-100 text-opacity-80 text-lg mb-10 max-w-xl mx-auto">
            Faça parte de um ecossistema comprometido com a dignidade psicológica e o desenvolvimento permanente da profissão.
          </p>
          <Link 
            to="/admin/settings"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-brand-900 rounded-full font-medium text-lg overflow-hidden transition-all hover:bg-gray-100 hover:shadow-lg active:translate-y-0 text-center"
          >
            <span>Experimentar sem compromisso</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="border-t border-brand-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-100 max-w-5xl mx-auto w-full text-opacity-60">
          <p>© {new Date().getFullYear()} Liva | Todos os direitos reservados. Conectando pessoas a psicólogos éticos e comprometidos.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hover:text-white transition-colors">Acessar Painel do Terapeuta</Link>
            <span className="w-1 h-1 rounded-full bg-brand-800"></span>
            <span className="text-white hover:cursor-pointer hover:text-white transition-colors" onClick={onBackToPatients}>Voltar ao Atendimento de Pacientes</span>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
