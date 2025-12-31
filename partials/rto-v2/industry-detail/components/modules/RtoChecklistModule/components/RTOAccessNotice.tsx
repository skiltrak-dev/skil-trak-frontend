import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'

export function RTOAccessNotice() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#044866]/10 to-[#0D5468]/10 border border-[#044866]/20 rounded-lg p-3 flex items-start gap-2"
        >
            <div className="w-7 h-7 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
                <h4 className="text-xs font-bold text-[#044866] mb-0.5">
                    RTO-Only Access
                </h4>
                <p className="text-[10px] text-[#64748B] leading-relaxed">
                    This checklist is visible only to the associated RTO.
                    Industry partners cannot view or modify these requirements.
                </p>
            </div>
        </motion.div>
    )
}
