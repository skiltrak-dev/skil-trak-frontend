import { ArrowUp } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Button, Typography } from '@components'
import { LucideIcon } from 'lucide-react'

interface AnalyticsCardProps {
    card: {
        title: string
        value: string
        change: string
        changeText: string
        icon: LucideIcon
        gradient: string
        trend: string
        percentage?: number
        color: string
        showBar?: boolean
        showButton?: boolean
        buttonText?: string
        showChart?: boolean
    }
    index: number
    weeklyData: Array<{ value: number }>
    onClick: () => void
}

export function AnalyticsCard({
    card,
    index,
    weeklyData,
    onClick,
}: AnalyticsCardProps) {
    const Icon = card.icon

    return (
        <div
            key={index}
            className="relative group"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            {/* Gradient Glow Effect on Hover */}
            <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${card.gradient} rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300`}
            />

            {/* Card Content */}
            <div
                onClick={onClick}
                className="relative w-full bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-2.5 hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] card-hover overflow-hidden cursor-pointer text-left h-auto"
            >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-16 h-16 opacity-5">
                    <div
                        className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`}
                        style={{
                            clipPath: 'circle(50% at 100% 0)',
                        }}
                    />
                </div>

                <div className="relative">
                    <div className="flex items-start justify-between mb-1.5">
                        {/* Icon with Gradient */}
                        <div
                            className={`w-7 h-7 bg-gradient-to-br ${card.gradient} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                        >
                            <Icon className="w-3.5 h-3.5 text-white" />
                        </div>

                        {/* Trend Badge */}
                        {card.trend === 'up' && (
                            <div className="flex items-center gap-0.5 bg-[#10B981]/10 text-[#10B981] px-1 py-0.5 rounded text-[8px] font-semibold border border-[#10B981]/20">
                                <ArrowUp className="w-2 h-2" />
                                <span>{card.percentage}%</span>
                            </div>
                        )}

                        {/* Urgent Badge */}
                        {card.trend === 'urgent' && (
                            <div className="flex items-center gap-0.5 bg-[#EF4444]/10 text-[#EF4444] px-1 py-0.5 rounded text-[8px] font-semibold border border-[#EF4444]/20 animate-pulse">
                                <span>Urgent</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-end justify-between">
                        <div>
                            <Typography variant="xs" color="text-[#64748B]">
                                {card.title}
                            </Typography>
                            <Typography variant="h4" color="text-[#1A2332]">
                                {card.value}
                            </Typography>
                        </div>
                        <div className="flex items-center gap-1 text-[10px]">
                            <span className="text-[#044866] font-semibold">
                                {card.change}
                            </span>
                            <span className="text-[#94A3B8]">•</span>
                            <span className="text-[#94A3B8]">
                                {card.changeText}
                            </span>
                        </div>
                    </div>

                    {/* Mini Chart */}
                    {card.showChart && (
                        <div className="mt-1.5 h-7 -mx-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={weeklyData}>
                                    <defs>
                                        <linearGradient
                                            id={`gradient-${index}`}
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor={card.color}
                                                stopOpacity={0.3}
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor={card.color}
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke={card.color}
                                        strokeWidth={1}
                                        fill={`url(#gradient-${index})`}
                                        dot={false}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {/* Progress Bar */}
                    {card.showBar && (
                        <div className="mt-1.5">
                            <div className="flex items-center justify-between mb-0.5">
                                <span className="text-[7px] text-[#64748B] font-medium">
                                    Usage
                                </span>
                                <span className="text-[7px] text-[#044866] font-bold">
                                    65%
                                </span>
                            </div>
                            <div className="h-1 bg-[#E8F4F8] rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-gradient-to-r ${card.gradient} rounded-full transition-all duration-1000`}
                                    style={{ width: '65%' }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Action Button */}
                    {card.showButton && (
                        <div className="mt-1.5 w-full px-2.5 py-1.5 bg-gradient-to-r from-[#F7A619] to-[#EA580C] text-white rounded-lg transition-all text-[10px] font-medium shadow-sm text-center">
                            {card.buttonText}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
