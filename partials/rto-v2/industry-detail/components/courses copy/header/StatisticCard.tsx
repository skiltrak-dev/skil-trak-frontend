import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface StatisticCardProps {
    icon: LucideIcon
    iconBgColor: string
    trendIcon: LucideIcon
    trendColor: string
    value: string | number
    label: string
    valueColor?: string
}

export function StatisticCard({
    icon: Icon,
    iconBgColor,
    trendIcon: TrendIcon,
    trendColor,
    value,
    label,
    valueColor = 'text-[#1A2332]',
}: StatisticCardProps) {
    return (
        <motion.div
            whileHover={{ y: -1 }}
            className="bg-white bg-opacity-80 backdrop-blur-sm rounded-md p-2 border border-[#E2E8F0] shadow-sm"
        >
            <div className="flex items-center justify-between mb-0.5">
                <div
                    className={`w-5 h-5 bg-gradient-to-br ${iconBgColor} rounded-md flex items-center justify-center`}
                >
                    <Icon className="w-3 h-3" />
                </div>
                <TrendIcon className={`w-2.5 h-2.5 ${trendColor}`} />
            </div>
            <p className={`text-base font-bold mb-0.5 ${valueColor}`}>
                {value}
            </p>
            <p className="text-[8px] text-[#64748B]">{label}</p>
        </motion.div>
    )
}
