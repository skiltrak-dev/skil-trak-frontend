import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export const SectorTitle = ({ sector }: { sector: any }) => {
    return (
        <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="font-bold text-[#1A2332] text-sm">{sector.name}</h3>
            {sector.eSignature && (
                <motion.div
                    whileHover={{
                        scale: 1.05,
                    }}
                    className={`px-2 py-1 rounded-md text-[10px] font-semibold flex items-center gap-1 shadow-sm ${
                        sector.eSignature.status === 'approved'
                            ? 'bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] text-[#065F46]'
                            : sector.eSignature.status === 'signed'
                            ? 'bg-gradient-to-br from-[#DBEAFE] to-[#BAE6FD] text-[#1E40AF]'
                            : 'bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] text-[#92400E]'
                    }`}
                >
                    <CheckCircle className="w-3 h-3" fill="currentColor" />
                    {sector.eSignature.status === 'approved'
                        ? 'Approved'
                        : sector.eSignature.status === 'signed'
                        ? 'Signed'
                        : 'Pending'}
                </motion.div>
            )}
        </div>
    )
}
