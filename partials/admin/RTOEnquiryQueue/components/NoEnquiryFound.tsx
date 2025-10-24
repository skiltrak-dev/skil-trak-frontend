import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

export const NoEnquiryFound = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
        >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f0f2f5] mb-4">
                <Search className="h-8 w-8 text-[#8c8c8c]" />
            </div>
            <h3 className="text-[#262626] mb-2">No enquiries found</h3>
            <p className="text-[#8c8c8c] mb-4">
                Try adjusting your filters or search query
            </p>
            {/* <Button
                variant="secondary"
                text="Clear Filters"
                onClick={() => {
                    setSearchQuery('')
                    setFilterStatus('all')
                    setServiceTypeFilter('all')
                }}
            /> */}
        </motion.div>
    )
}
