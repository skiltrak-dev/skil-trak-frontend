import { motion } from 'framer-motion'
import { ChecklistStatsType } from './types'

interface ChecklistStatsProps {
    stats: ChecklistStatsType
}

export function ChecklistStats({ stats }: ChecklistStatsProps) {
    return (
        <div className="grid grid-cols-4 gap-2.5">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-[#F8FAFB] to-white rounded-lg p-3 border border-[#E2E8F0] hover:shadow-md transition-all"
            >
                <p className="text-[10px] font-medium text-[#64748B] mb-1">
                    Total Items
                </p>
                <p className="text-xl font-bold text-[#1A2332]">
                    {stats.total}
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 rounded-lg p-3 border border-[#10B981]/20 hover:shadow-md transition-all"
            >
                <p className="text-[10px] font-medium text-[#059669] mb-1">
                    Completed
                </p>
                <p className="text-xl font-bold text-[#10B981]">
                    {stats.completed}
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-[#F7A619]/10 to-[#EA580C]/10 rounded-lg p-3 border border-[#F7A619]/20 hover:shadow-md transition-all"
            >
                <p className="text-[10px] font-medium text-[#EA580C] mb-1">
                    Pending
                </p>
                <p className="text-xl font-bold text-[#F7A619]">
                    {stats.pending}
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-[#EF4444]/10 to-[#DC2626]/10 rounded-lg p-3 border border-[#EF4444]/20 hover:shadow-md transition-all"
            >
                <p className="text-[10px] font-medium text-[#DC2626] mb-1">
                    Required
                </p>
                <p className="text-xl font-bold text-[#EF4444]">
                    {stats.required}
                </p>
            </motion.div>
        </div>
    )
}
