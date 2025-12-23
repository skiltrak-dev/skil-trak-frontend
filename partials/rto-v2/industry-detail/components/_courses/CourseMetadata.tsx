import { Globe } from 'lucide-react'
import { motion } from 'framer-motion'

interface CourseMetadataProps {
    requestedBy?: string
    referenceUrl?: string
}

export function CourseMetadata({
    requestedBy,
    referenceUrl,
}: CourseMetadataProps) {
    if (!requestedBy && !referenceUrl) {
        return null
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm"
        >
            <div className="grid gap-3">
                {requestedBy && (
                    <div>
                        <p className="text-xs font-bold text-[#64748B] uppercase tracking-wide mb-1">
                            Requested By
                        </p>
                        <p className="text-sm text-[#1A2332]">{requestedBy}</p>
                    </div>
                )}
                {referenceUrl && (
                    <div>
                        <p className="text-xs font-bold text-[#64748B] uppercase tracking-wide mb-1">
                            Reference URL
                        </p>
                        <a
                            href={referenceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#044866] hover:text-[#0D5468] underline-offset-2 hover:underline break-all transition-colors inline-flex items-center gap-1.5"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Globe className="w-4 h-4 flex-shrink-0" />
                            {referenceUrl}
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
