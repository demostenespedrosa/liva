import { Psychologist } from "../types";
import { ArrowRight, MessageCircle } from "lucide-react";

interface PsychologistCardProps {
  psychologist: Psychologist;
  userSymptomId: string;
}

// Map the internal select value to a localized readable format for the WhatsApp message
const symptomMap: Record<string, string> = {
  ansiedade: "quadros de ansiedade",
  burnout: "sintomas de burnout e exaustão",
  insonia: "dificuldades relacionadas ao sono",
  relacionamentos: "questões de relacionamento",
  entender_sentimentos: "autoconhecimento e processamento emocional",
  reduzir_estresse: "gerenciamento de estresse",
  foco_energia: "recuperação de foco e energia"
};

export function PsychologistCard({ psychologist, userSymptomId }: PsychologistCardProps) {
  
  const handleWhatsAppClick = () => {
    const readableSymptom = symptomMap[userSymptomId] || "minhas questões emocionais";
    const text = encodeURIComponent(`Olá, ${psychologist.name}! Encontrei seu perfil através do Liva. Gostaria de agendar uma primeira conversa para falar sobre ${readableSymptom}. Como funciona a sua agenda e valores?`);
    
    // Construct the WhatsApp API link
    const waUrl = `https://wa.me/${psychologist.phone}?text=${text}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-brand-100 flex flex-col h-full transition-all hover:shadow-md">
      <div className="flex items-center gap-4 mb-6">
        <img 
          src={psychologist.photoUrl} 
          alt={`Foto de ${psychologist.name}`} 
          className="w-20 h-20 rounded-2xl object-cover"
        />
        <div>
          <h3 className="font-display font-medium text-xl text-brand-900">{psychologist.name}</h3>
          <p className="text-sm text-brand-600 font-medium tracking-wide break-words line-clamp-2">{psychologist.focus}</p>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
        {psychologist.bio}
      </p>
      
      <button 
        onClick={handleWhatsAppClick}
        className="w-full flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#128C7E] font-medium py-3 px-4 rounded-xl transition-colors hover:bg-[#25D366]/20"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Falar no WhatsApp</span>
      </button>
    </div>
  );
}
