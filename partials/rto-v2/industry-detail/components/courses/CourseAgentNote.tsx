import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface CourseAgentNoteProps {
  agentNote: string;
}

export function CourseAgentNote({ agentNote }: CourseAgentNoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01 }}
      className="bg-gradient-to-br from-[#E8F4F8] to-[#D1E7F0] rounded-xl p-4 border border-[#B8D8E5] shadow-sm"
    >
      <p className="text-xs font-bold text-[#044866] uppercase tracking-wide mb-2 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5" />
        SkilTrak Agent
      </p>
      <p className="text-sm text-[#0D5468] leading-relaxed">{agentNote}</p>
    </motion.div>
  );
}
