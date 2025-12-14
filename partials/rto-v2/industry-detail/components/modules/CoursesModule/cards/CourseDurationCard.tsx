import { motion } from 'framer-motion'
import { Clock, Edit2 } from 'lucide-react'

export const CourseDurationCard = ({ sector }: { sector: any }) => {
    return (
        <motion.button
            whileHover={{
                scale: 1.02,
                y: -1,
            }}
            whileTap={{
                scale: 0.98,
            }}
            className="flex-1 min-w-[112px] bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FEF3C7] rounded-lg p-2 shadow-md border border-[#F7A619]/20 hover:border-[#F7A619]/50 hover:shadow-lg transition-all group/edit cursor-pointer"
        >
            <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 rounded-md bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm group-hover/edit:bg-white transition-all">
                    <Clock className="w-3 h-3 text-[#F7A619]" />
                </div>
                <span className="text-[9px] font-bold text-[#92400E] uppercase tracking-wide">
                    Duration
                </span>
                <Edit2 className="w-2.5 h-2.5 text-[#92400E] opacity-0 group-hover/edit:opacity-100 transition-opacity ml-auto" />
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-[#92400E]">
                    {sector.courses[0].duration.split(' ')[0]}
                </span>
                <span className="text-xs text-[#92400E]/60">
                    {sector.courses[0].duration.split(' ')[1]}
                </span>
            </div>
        </motion.button>
    )
}
