import { motion } from 'framer-motion'
import { Image as ImageIcon, FileText, LucideIcon } from 'lucide-react'
import { IndustryApi } from '@redux'
import { PuffLoader } from 'react-spinners'

interface GalleryStatsProps {
    industryUserId: number
}

interface MediaStatCard {
    label: string
    count: number
    icon: LucideIcon
    iconBg: string
    textColor: string
    bgGradient: string
    borderColor: string
    delay: number
}

export function GalleryStats({ industryUserId }: GalleryStatsProps) {
    const { data: galleryCount, isLoading } =
        IndustryApi.Gallery.industryGalleryCount(
            {
                userId: industryUserId,
            },
            { skip: !industryUserId }
        )

    const mediaStatsCards: MediaStatCard[] = [
        {
            label: 'Total Items',
            icon: ImageIcon,
            iconBg: 'from-[#044866] to-[#0D5468]',
            textColor: 'text-[#1A2332]',
            bgGradient: 'from-[#F8FAFB] to-white',
            borderColor: 'border-[#E2E8F0]',
            delay: 0,
            count: galleryCount?.total ?? 0,
        },
        {
            label: 'Photos',
            icon: ImageIcon,
            iconBg: 'from-[#10B981] to-[#059669]',
            textColor: 'text-[#10B981]',
            bgGradient: 'from-[#E8F4F8] to-white',
            borderColor: 'border-[#044866]/20',
            delay: 0.1,
            count: galleryCount?.images ?? 0,
        },
        {
            label: 'PDFs',
            icon: FileText,
            iconBg: 'from-[#F7A619] to-[#EA580C]',
            textColor: 'text-[#F7A619]',
            bgGradient: 'from-[#FEF3E2] to-white',
            borderColor: 'border-[#F7A619]/20',
            delay: 0.2,
            count: galleryCount?.documents ?? 0,
        },
    ]

    return (
        <div className="grid grid-cols-3 gap-2.5">
            {mediaStatsCards.map((card, index) => {
                const IconComponent = card.icon

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: card.delay }}
                        className={`bg-gradient-to-br ${card.bgGradient} rounded-lg p-3 border ${card.borderColor} hover:shadow-md transition-all`}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <div
                                className={`w-6 h-6 bg-gradient-to-br ${card.iconBg} rounded-lg flex items-center justify-center`}
                            >
                                <IconComponent className="w-3 h-3 text-white" />
                            </div>
                            <p className="text-[10px] font-medium text-[#64748B]">
                                {card.label}
                            </p>
                        </div>
                        <p className={`text-xl font-bold ${card.textColor}`}>
                            {isLoading ? <PuffLoader size={4} /> : card.count}
                        </p>
                    </motion.div>
                )
            })}
        </div>
    )
}
