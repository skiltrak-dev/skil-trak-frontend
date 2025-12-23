import { User, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Supervisor } from '@types'
import { SupervisorCard } from './SupervisorCard'

interface SupervisorsSectionProps {
    supervisors: Supervisor[]
}

export function SupervisorsSection({ supervisors }: SupervisorsSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="pt-4"
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-md">
                        <User className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h4 className="text-xs font-bold text-[#1A2332]">
                        Supervisors
                    </h4>
                    <span className="px-1.5 py-0.5 bg-[#E8F4F8] text-[#044866] rounded-full text-[10px] font-medium">
                        32
                    </span>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs font-medium text-[#044866] hover:text-[#0D5468] transition-colors flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-[#E8F4F8]"
                >
                    <Plus className="w-3.5 h-3.5" />
                    Add Supervisor
                </motion.button>
            </div>

            <div className="grid gap-3">
                {supervisors.map((supervisor, idx) => (
                    <SupervisorCard
                        key={idx}
                        supervisor={supervisor}
                        index={idx}
                    />
                ))}
            </div>
        </motion.div>
    )
}
