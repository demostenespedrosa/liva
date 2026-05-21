import React from "react";
import { Psychologist } from "../types";
import { PsychologistCard } from "./PsychologistCard";
import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";

interface RecommendationsProps {
  matches: Psychologist[];
  primaryIssueId: string;
  onRestart: () => void;
}

export const Recommendations: React.FC<RecommendationsProps> = ({ matches, primaryIssueId, onRestart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 w-full max-w-6xl mx-auto px-6 mt-8 md:mt-16 pb-20"
    >
      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
        <h2 className="font-display text-3xl md:text-4xl text-brand-900 font-medium tracking-tight mb-4">
          Quem pode te ajudar
        </h2>
        <p className="text-gray-600 text-lg">
          Selecionamos cuidadosamente estes profissionais com base nas suas respostas. Eles possuem a experiência e a especialidade para apoiar no seu momento.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {matches.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <PsychologistCard psychologist={match} userSymptomId={primaryIssueId} />
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <button 
          onClick={onRestart}
          className="flex items-center gap-2 text-brand-600 font-medium hover:text-brand-900 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Refazer triagem</span>
        </button>
      </div>
    </motion.div>
  );
}
