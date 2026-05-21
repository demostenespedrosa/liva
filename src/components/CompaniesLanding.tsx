import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles, Building2, Shield, HeartHandshake, Eye, Briefcase, ChevronRight, Check } from "lucide-react";

interface CompaniesLandingProps {
  onBackToPatients: () => void;
}

export const CompaniesLanding: React.FC<CompaniesLandingProps> = ({ onBackToPatients }) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    employees: "1-50",
    email: "",
    phone: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowFormModal(false);
      setSubmitted(false);
      setFormData({ name: "", company: "", employees: "1-50", email: "", phone: "", message: "" });
    }, 4000);
  };

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
            <Building2 className="w-4 h-4" />
            <span>Saúde Mental Corporativa Humanizada</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl text-brand-900 font-medium tracking-tight leading-tight mb-6">
            Cuidado genuíno que <br className="hidden md:block"/> transforma a sua cultura.
          </h1>
          
          <p className="text-gray-600 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">
            Vá além dos benefícios frios e impessoais. Apresente o Liva para seus colaboradores: uma ponte empática e sigilosa para psicólogos comprometidos com a saúde mental real.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button 
              onClick={() => setShowFormModal(true)}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-500 text-white rounded-full font-medium text-lg overflow-hidden transition-all hover:bg-brand-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Falar com especialista de bem-estar</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={onBackToPatients}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors text-lg"
            >
              Ver versão de Pacientes
            </button>
          </div>

          <p className="mt-5 text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
            <Shield className="w-4 h-4 text-green-600" /> 
            Em total conformidade com a LGPD e o absoluto sigilo clínico do psicólogo.
          </p>
        </motion.div>
      </section>

      {/* Corporate Empathy / Problem Section */}
      <section className="bg-white py-20 border-t border-brand-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-brand-900 font-medium tracking-tight mb-8">
            O esgotamento mental invisível custa caro para a sua empresa.
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
            Burnout, ansiedade constante, absenteísmo e quedas silenciosas de performance não se resolvem com palestras motivacionais pontuais. A Liva fornece uma rede de cuidado clínico direcionado que acolhe e ampara as dores do colaborador antes que se tornem crises graves.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto mt-12">
            {[
              {
                percent: "43%",
                text: "dos colaboradores relatam cansaço extremo ou Burnout recorrente no ambiente corporativo brasileiro."
              },
              {
                percent: "4.2x",
                text: "é o retorno estimado sobre cada real investido de verdade em bem-estar mental ativo e humanizado."
              },
              {
                percent: "80%",
                text: "de aumento na taxa de retenção de talentos quando a gerência promove segurança psicológica prática."
              }
            ].map((stat, i) => (
              <div key={i} className="bg-brand-50/50 rounded-2xl p-6 border border-brand-100/50">
                <span className="block font-display text-4xl font-bold text-brand-600 mb-2">{stat.percent}</span>
                <p className="text-sm text-gray-600 leading-relaxed">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values & Differentiators */}
      <section className="py-24 bg-[#FDFBF7]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-brand-900 font-medium tracking-tight mb-4">
              Por que a Liva no seu RH?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Oferecemos um modelo livre de atritos burocráticos e copys industriais, unindo inteligência e humanismo genuíno.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {[
              {
                icon: HeartHandshake,
                title: "Curadoria Ética",
                desc: "Sua equipe terá acesso exclusivo à rede credenciada de terapeutas com especializações clínicas validadas por nosso conselho supervisor."
              },
              {
                icon: Shield,
                title: "Segurança de Dados",
                desc: "Completo sigilo. O RH não sabe quem está acessando ou quais são as queixas. Isso garante que o colaborador use o benefício sem medo de julgamentos."
              },
              {
                icon: Eye,
                title: "Prevenção Pró-Ativa",
                desc: "Auxiliamos na mitigação de estressores de rotina muito antes que as dores se acumulem e gerem afastamentos do trabalho ou licenças médicas."
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-brand-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-medium text-brand-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Quote */}
      <section className="bg-white py-20 border-t border-brand-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative text-center">
            <span className="text-8xl text-brand-200/50 font-display absolute -top-12 left-1/2 -translate-x-1/2 -z-0 select-none">“</span>
            <p className="text-brand-900 text-xl font-medium leading-relaxed relative z-10 max-w-2xl mx-auto mb-6">
              "Desde que integramos a Liva à nossa gama de iniciativas de saúde interna, percebemos uma mudança contundente no engajamento diário e uma queda de 30% em queixas crônicas de estresse no balanço trimestral."
            </p>
            <p className="text-sm font-semibold text-gray-700">Mariana Custódio</p>
            <p className="text-xs text-gray-500">Diretora de Cultura & Pessoas na NextGen</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-brand-900 pt-20 pb-8 px-6 mt-auto flex-col flex w-full">
        <div className="max-w-3xl mx-auto text-center mb-16 flex-1">
          <h2 className="font-display text-3xl md:text-4xl text-white font-medium tracking-tight mb-6">
            Cuide de quem faz sua organização acontecer todos os dias.
          </h2>
          <p className="text-brand-100 text-opacity-80 text-lg mb-10 max-w-xl mx-auto">
            Fale conosco e saiba como disponibilizar consultas para o time com investimento simples e adaptável.
          </p>
          <button 
            onClick={() => setShowFormModal(true)}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-brand-900 rounded-full font-medium text-lg overflow-hidden transition-all hover:bg-gray-100 hover:shadow-lg active:translate-y-0"
          >
            <span>Falar com especialista de bem-estar</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="border-t border-brand-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-100 max-w-5xl mx-auto w-full text-opacity-60">
          <p>© {new Date().getFullYear()} Liva | Todos os direitos reservados. Conectando pessoas e empresas a psicólogos éticos.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Apresentação Institucional (PDF)</a>
            <span className="w-1 h-1 rounded-full bg-brand-800"></span>
            <span className="text-white hover:cursor-pointer hover:text-white transition-colors" onClick={onBackToPatients}>Voltar para Atendimento Humano</span>
          </div>
        </div>
      </section>

      {/* Modal Form Dialog */}
      <AnimatePresence>
        {showFormModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setShowFormModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2"
                aria-label="Close"
              >
                ✕
              </button>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-brand-900 mb-1">Acolhimento Liva para Empresas</h3>
                    <p className="text-sm text-gray-500">Preencha os campos abaixo e nosso time técnico retornará em breve.</p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Nome Completo</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                        placeholder="Ex: Clara Ribeiro"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Nome da Empresa</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                          placeholder="Ex: NextGen S/A"
                          value={formData.company}
                          onChange={e => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Colaboradores</label>
                        <select 
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                          value={formData.employees}
                          onChange={e => setFormData({ ...formData, employees: e.target.value })}
                        >
                          <option value="1-50">1 - 50</option>
                          <option value="51-200">51 - 200</option>
                          <option value="201-500">201 - 500</option>
                          <option value="500+">Mais de 500</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">E-mail Corporativo</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                        placeholder="clara.ribeiro@empresa.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Telefone / WhatsApp</label>
                      <input 
                        type="tel" 
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                        placeholder="(11) 98765-4321"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Mensagem ou Observações (Opcional)</label>
                      <textarea 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white h-20 resize-none"
                        placeholder="Gostaria de saber mais sobre as condições especiais e pacotes..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-500 text-white font-medium rounded-xl hover:bg-brand-600 transition-colors shadow-md mt-2 text-sm"
                  >
                    <span>Enviar solicitação rápida</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-gray-900">Solicitação Enviada!</h3>
                  <p className="text-sm text-gray-600 max-w-xs">
                    Um consultor ético de bem-estar corporativo da Liva entrará em contato comercial diretamente pelo telefone {formData.phone} ou e-mail.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
