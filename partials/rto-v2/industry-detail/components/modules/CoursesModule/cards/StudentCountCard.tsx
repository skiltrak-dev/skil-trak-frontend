import { motion } from 'framer-motion'
import { Edit2, Users } from 'lucide-react'

export const StudentCountCard = ({
    sectorStudents,
    sectorCapacity,
}: {
    sectorStudents: number
    sectorCapacity: number
}) => {
    return (
        <motion.button
            whileHover={{
                scale: 1.02,
                y: -1,
            }}
            whileTap={{
                scale: 0.98,
            }}
            className="flex-1 min-w-[112px] bg-gradient-to-br from-[#E8F4F8] via-[#D1E7F0] to-[#E8F4F8] rounded-lg p-2 shadow-md border border-[#B9D7E5]/30 hover:border-[#044866]/50 hover:shadow-lg transition-all group/edit cursor-pointer"
        >
            <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 rounded-md bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm group-hover/edit:bg-white transition-all">
                    <Users className="w-3 h-3 text-[#044866]" />
                </div>
                <span className="text-[9px] font-bold text-[#044866] uppercase tracking-wide">
                    Students
                </span>
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-[#044866]">
                    {sectorStudents}
                </span>
                <span className="text-xs text-[#0D5468]/60">
                    / {sectorCapacity}
                </span>
            </div>
        </motion.button>
    )
}
