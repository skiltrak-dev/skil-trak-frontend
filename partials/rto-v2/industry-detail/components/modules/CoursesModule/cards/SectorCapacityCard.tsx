import EditSectorCapacityModal from '@partials/rto-v2/industry-detail/modal/EditSectorCapacityModal'
import { motion } from 'framer-motion'
import { Edit2, Target } from 'lucide-react'
import { useState } from 'react'
export const SectorCapacityCard = ({
    capacityPercent,
    startEditingSectorMetrics,
    sector,
}: {
    capacityPercent: number
    startEditingSectorMetrics: (id: number) => void
    sector: any
}) => {
    const [open, setOpen] = useState(false)
    return (
        <div className="w-full">
            <motion.button
                onClick={(e) => {
                    e.stopPropagation()
                    setOpen(true)
                    // startEditingSectorMetrics(sector.id)
                }}
                whileHover={{
                    scale: 1.02,
                    y: -1,
                }}
                whileTap={{
                    scale: 0.98,
                }}
                className={`flex-1 w-full rounded-lg p-2 shadow-md border transition-all group/edit cursor-pointer ${
                    capacityPercent >= 80
                        ? 'bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FEF3C7] border-[#F7A619]/20 hover:border-[#F7A619]/50'
                        : 'bg-gradient-to-br from-[#D1FAE5] via-[#A7F3D0] to-[#D1FAE5] border-[#10B981]/20 hover:border-[#10B981]/50'
                } hover:shadow-lg`}
            >
                <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-5 h-5 rounded-md bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm group-hover/edit:bg-white transition-all">
                        <Target
                            className={`w-3 h-3 ${
                                capacityPercent >= 80
                                    ? 'text-[#F7A619]'
                                    : 'text-[#10B981]'
                            }`}
                        />
                    </div>
                    <span
                        className={`text-[9px] font-bold uppercase tracking-wide ${
                            capacityPercent >= 80
                                ? 'text-[#92400E]'
                                : 'text-[#065F46]'
                        }`}
                    >
                        Capacity
                    </span>
                    <Edit2
                        className={`w-2.5 h-2.5 opacity-0 group-hover/edit:opacity-100 transition-opacity ml-auto ${
                            capacityPercent >= 80
                                ? 'text-[#92400E]'
                                : 'text-[#065F46]'
                        }`}
                    />
                </div>
                <div className="space-y-1.5">
                    <div className="flex items-baseline gap-1">
                        <span
                            className={`text-lg font-bold ${
                                capacityPercent >= 80
                                    ? 'text-[#92400E]'
                                    : 'text-[#065F46]'
                            }`}
                        >
                            {capacityPercent}%
                        </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/50 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                            initial={{
                                width: 0,
                            }}
                            animate={{
                                width: `${capacityPercent}%`,
                            }}
                            transition={{
                                duration: 1,
                                ease: 'easeOut',
                                delay: 0.2,
                            }}
                            className={`h-full rounded-full ${
                                capacityPercent >= 80
                                    ? 'bg-gradient-to-r from-[#F7A619] to-[#EA580C]'
                                    : 'bg-gradient-to-r from-[#10B981] to-[#059669]'
                            }`}
                        />
                    </div>
                </div>
            </motion.button>
            {open && <EditSectorCapacityModal open={open} setOpen={setOpen} />}
        </div>
    )
}
