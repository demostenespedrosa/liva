import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Heart, Shield, Clock, Users } from "lucide-react";

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
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
            <Sparkles className="w-4 h-4" />
            <span>Sua jornada de cura começa aqui</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl text-brand-900 font-medium tracking-tight leading-tight mb-6">
            O primeiro passo para o <br className="hidden md:block"/> seu recomeço.
          </h1>
          
          <p className="text-gray-600 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">
            Sabemos que buscar ajuda pode ser desafiador. Responda a três breves perguntas para entendermos o seu momento atual e te conectarmos com o profissional de psicologia ideal para acolher você.
          </p>
          
          <button 
            onClick={onStart}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-500 text-white rounded-full font-medium text-lg overflow-hidden transition-all hover:bg-brand-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Fazer minha triagem humanizada</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <p className="mt-5 text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
            <Shield className="w-4 h-4 text-green-600" /> 
            100% sigiloso e acolhedor. Leva menos de 1 minuto.
          </p>
        </motion.div>
      </section>

      {/* Empathy Section */}
      <section className="bg-white py-20 border-t border-brand-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-brand-900 font-medium tracking-tight mb-8">
            Está tudo bem não dar conta de tudo sozinho.
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
            A ansiedade que aperta o peito, a insônia que não desliga a mente, o esgotamento silencioso no trabalho, as dores e lutos mal processados. O que você sente importa. A Liva foi pensada como um lar seguro, onde sua fragilidade é vista, respeitada e torna-se o seu ponto de virada rumo à recuperação.
          </p>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {['Crises de Ansiedade', 'Esgotamento e Burnout', 'Depressão Leve', 'Conflitos em Relacionamentos', 'Insônia Crônica', 'Luto', 'Estresse Profissional', 'Autoestima'].map((tag, i) => (
              <span key={i} className="px-4 py-2 bg-brand-50 text-brand-700 font-medium rounded-full text-sm hover:bg-brand-100 transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-24 bg-[#FDFBF7]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-brand-900 font-medium tracking-tight mb-4">Como a Liva cuida de você?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Criamos um percurso simples, focado em mitigar qualquer estresse e paradoxo de escolha para você encontrar o melhor espaço de escuta.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-brand-100 -translate-y-1/2 z-0"></div>
            {[
              {
                icon: Heart,
                title: "1. Sua Dor Importa",
                desc: "Por meio de um teste breve e empático, você nos conta o que mais lhe incomoda hoje."
              },
              {
                icon: Users,
                title: "2. Triagem e Match",
                desc: "Nosso sistema seleciona estritamente três psicólogos com foco especializado nas suas atuais queixas."
              },
              {
                icon: Clock,
                title: "3. Agendamento Direto",
                desc: "Sem intermediários mecânicos: fale direto com o profissional através de um WhatsApp já contextualizado."
              }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-brand-100 shadow-sm transition-transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-6 ring-4 ring-white shadow-sm">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-medium text-brand-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA & Footer */}
      <section className="bg-brand-900 pt-20 pb-8 px-6 mt-auto flex-col flex w-full">
        <div className="max-w-3xl mx-auto text-center mb-16 flex-1">
          <h2 className="font-display text-3xl md:text-4xl text-white font-medium tracking-tight mb-6">
            Dê a si mesmo o presente do conforto emocional.
          </h2>
          <p className="text-brand-100 text-opacity-80 text-lg mb-10 max-w-xl mx-auto">
            Descubra o profissional parceiro para te ajudar com base num método empático e gratuito de triagem.
          </p>
          <button 
            onClick={onStart}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-brand-900 rounded-full font-medium text-lg overflow-hidden transition-all hover:bg-gray-100 hover:shadow-lg active:translate-y-0"
          >
            <span>Quero encontrar meu terapeuta</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="border-t border-brand-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-100 max-w-5xl mx-auto w-full text-opacity-60">
          <p>© {new Date().getFullYear()} Liva | Todos os direitos reservados. Conectando pessoas a psicólogos éticos e comprometidos.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <span className="w-1 h-1 rounded-full bg-brand-800"></span>
            <a href="/pro" className="hover:text-white transition-colors">Acesso para Psicólogos Assinantes</a>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
