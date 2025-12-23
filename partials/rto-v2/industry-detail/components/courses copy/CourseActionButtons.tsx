import { Sparkles, Users, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

export function CourseActionButtons() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-3 pt-2"
        >
            <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="py-3 bg-gradient-to-br from-[#044866] to-[#0D5468] text-white rounded-xl text-sm font-medium hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
                <Sparkles className="w-4 h-4" />
                Configure
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="py-3 bg-white border-2 border-[#E2E8F0] text-[#044866] rounded-xl text-sm font-medium hover:border-[#044866] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
                <Users className="w-4 h-4" />
                Students
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="py-3 bg-white border-2 border-[#E2E8F0] text-[#64748B] rounded-xl text-sm font-medium hover:border-[#044866] hover:text-[#044866] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
                <FileText className="w-4 h-4" />
                Docs
            </motion.button>
        </motion.div>
    )
}
