import { TextInput } from '@components'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'

interface CoursesSearchBarProps {
    showSearch: boolean
    searchQuery: string
    onSearchChange: (value: string) => void
}

export function CoursesSearchBar({
    showSearch,
    searchQuery,
    onSearchChange,
}: CoursesSearchBarProps) {
    return (
        <AnimatePresence>
            {showSearch && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                >
                    <div className="relative mb-3">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#64748B] z-10" />
                        <TextInput
                            name="search"
                            placeholder="Search courses, programs, or supervisors..."
                            value={searchQuery}
                            onChange={(e: any) =>
                                onSearchChange(e.target.value)
                            }
                            className="w-full pl-7 pr-2 py-1.5 h-auto bg-white border border-[#E2E8F0] rounded-md focus-visible:border-[#044866] focus-visible:ring-2 focus-visible:ring-[#044866] focus-visible:ring-opacity-20 transition-all text-[10px]"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
