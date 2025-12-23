import { FileText, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@components'

interface HeaderActionsProps {
    showSearch: boolean
    onToggleSearch: () => void
}

export function HeaderActions({
    showSearch,
    onToggleSearch,
}: HeaderActionsProps) {
    return (
        <div className="flex items-center gap-1.5">
            <Button
                variant="secondary"
                onClick={onToggleSearch}
                className={`p-1.5 h-auto w-auto rounded-md transition-all duration-300 ${
                    showSearch
                        ? 'bg-[#044866] text-white shadow-md hover:bg-[#044866]'
                        : 'bg-white text-[#64748B] hover:bg-[#F8FAFB] border border-[#E2E8F0]'
                }`}
            >
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Search className="w-3 h-3" />
                </motion.div>
            </Button>
            <Button
                variant="primaryNew"
                className="px-2 py-1.5 h-auto bg-gradient-to-r from-[#044866] to-[#0D5468] text-white rounded-md hover:shadow-md hover:bg-gradient-to-r hover:from-[#044866] hover:to-[#0D5468] transition-all duration-300 flex items-center gap-1.5 text-[10px]"
            >
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-1.5"
                >
                    <FileText className="w-3 h-3" />
                    <span className="hidden sm:inline">Notes</span>
                </motion.div>
            </Button>
        </div>
    )
}
