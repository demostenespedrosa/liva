import React, { useState } from "react";
import { fetchMatchedPsychologists } from "../lib/firebase";
import { Psychologist } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Loader2, ArrowLeft } from "lucide-react";

interface WizardProps {
  onComplete: (matches: Psychologist[], primaryIssueId: string) => void;
  onCancel: () => void;
}

type Question = {
  id: string;
  title: string;
  options: { id: string; label: string; tag?: string }[];
};

const questions: Question[] = [
  {
    id: "primaryIssue",
    title: "O que mais está incomodando você hoje?",
    options: [
      { id: "ansiedade", label: "Ansiedade constante", tag: "ansiedade" },
      { id: "burnout", label: "Cansaço extremo ou esgotamento", tag: "burnout" },
      { id: "insonia", label: "Dificuldade para dormir", tag: "insonia" },
      { id: "relacionamentos", label: "Conflitos de relacionamento", tag: "relacionamentos" },
    ]
  },
  {
    id: "duration",
    title: "Há quanto tempo você está se sentindo assim?",
    options: [
      { id: "dias", label: "Há alguns dias" },
      { id: "semanas", label: "Há algumas semanas" },
      { id: "meses", label: "Há alguns meses" },
      { id: "anos", label: "Há anos ou não me lembro quando começou" },
    ]
  },
  {
    id: "goal",
    title: "Qual o principal objetivo que você busca na terapia?",
    options: [
      { id: "entender_sentimentos", label: "Entender meus sentimentos e reações", tag: "entender_sentimentos" },
      { id: "reduzir_estresse", label: "Encontrar estratégias para reduzir o estresse", tag: "reduzir_estresse" },
      { id: "foco_energia", label: "Recuperar meu foco e energia", tag: "foco_energia" },
    ]
  }
];

export const Wizard: React.FC<WizardProps> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = questions[currentStep];

  const handleSelect = async (optionId: string) => {
    const newAnswers = { ...answers, [question.id]: optionId };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      setIsSubmitting(true);
      // Collect tags from answers
      const tags = questions.map((q) => {
        const selectedOptionId = newAnswers[q.id];
        const option = q.options.find(o => o.id === selectedOptionId);
        return option?.tag;
      }).filter(Boolean) as string[];

      const matches = await fetchMatchedPsychologists(tags);
      
      setIsSubmitting(false);
      onComplete(matches, newAnswers.primaryIssue);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onCancel();
    }
  };

  if (isSubmitting) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="flex-1 flex flex-col items-center justify-center text-brand-600 mt-24"
      >
        <Loader2 className="w-10 h-10 animate-spin mb-6 text-brand-500" />
        <h2 className="font-display text-2xl font-medium text-brand-900 mb-2">Buscando profissionais...</h2>
        <p className="text-gray-500">Estamos encontrando os psicólogos mais alinhados com o seu momento.</p>
      </motion.div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-xl mx-auto px-6 mt-12 md:mt-24">
      
      <button 
        onClick={handleBack}
        className="text-gray-400 hover:text-brand-600 flex items-center gap-1 text-sm font-medium transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>
      
      <div className="w-full bg-brand-100 h-1.5 rounded-full overflow-hidden mb-10">
        <motion.div 
          className="h-full bg-brand-500 rounded-full"
          initial={{ width: `${(currentStep / questions.length) * 100}%` }}
          animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-display text-2xl md:text-3xl text-brand-900 font-medium tracking-tight mb-8">
            {question.title}
          </h2>

          <div className="flex flex-col gap-3">
            {question.options.map(option => (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`flex items-center text-left justify-between p-5 rounded-2xl border transition-all duration-200 group
                  ${answers[question.id] === option.id 
                    ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500' 
                    : 'border-gray-200 bg-white hover:border-brand-500 hover:shadow-sm'
                  }`}
              >
                <span className="text-lg font-medium text-brand-900">{option.label}</span>
                <ChevronRight className={`w-5 h-5 transition-transform ${answers[question.id] === option.id ? 'text-brand-500' : 'text-gray-300 group-hover:text-brand-400 group-hover:translate-x-1'}`} />
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
