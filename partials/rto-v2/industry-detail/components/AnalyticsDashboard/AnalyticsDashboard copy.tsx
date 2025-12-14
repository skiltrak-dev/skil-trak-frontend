import { Button, TextInput, Typography } from '@components'
import {
    ArrowUp,
    Calendar,
    ChevronRight,
    Clock,
    Download,
    Edit2,
    Layers,
    Star,
    Target,
    Timer,
    TrendingUp,
    Users,
    X,
    Zap,
} from 'lucide-react'
import { useState } from 'react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'

const weeklyData = [
    { value: 20 },
    { value: 35 },
    { value: 28 },
    { value: 45 },
    { value: 38 },
    { value: 52 },
    { value: 48 },
]

const analyticsCards = [
    {
        title: 'Total Students',
        value: '247',
        change: '+12',
        changeText: 'this month',
        icon: Users,
        gradient: 'from-[#044866] to-[#0D5468]',
        trend: 'up',
        percentage: 5.1,
        color: '#044866',
    },
    {
        title: 'Pending',
        value: '18',
        change: '5 urgent',
        changeText: 'needs attention',
        icon: Clock,
        gradient: 'from-[#F7A619] to-[#EA580C]',
        trend: 'neutral',
        color: '#F7A619',
    },
    {
        title: 'Interviews',
        value: '12',
        change: 'Next 7 days',
        changeText: '3 this week',
        icon: Calendar,
        gradient: 'from-[#8B5CF6] to-[#7C3AED]',
        trend: 'neutral',
        color: '#8B5CF6',
    },
    {
        title: 'Capacity',
        value: '65/100',
        change: '35 spots',
        changeText: 'available',
        icon: Layers,
        gradient: 'from-[#0D5468] to-[#044866]',
        trend: 'neutral',
        showBar: true,
        color: '#0D5468',
    },
    {
        title: 'Response Time',
        value: '2.4hrs',
        change: '-0.8hrs',
        changeText: 'improvement',
        icon: Timer,
        gradient: 'from-[#14B8A6] to-[#0D9488]',
        trend: 'up',
        percentage: 25,
        color: '#14B8A6',
    },
    {
        title: 'Rating',
        value: '4.8',
        change: '156 reviews',
        changeText: '98% positive',
        icon: Star,
        gradient: 'from-[#F7A619] to-[#F59E0B]',
        trend: 'up',
        percentage: 2.1,
        color: '#F7A619',
    },
    {
        title: 'Action Needed',
        value: '5 Items',
        change: 'Review Now',
        changeText: 'needs attention',
        icon: Zap,
        gradient: 'from-[#F7A619] to-[#EA580C]',
        trend: 'urgent',
        showButton: true,
        buttonText: 'Review Applications →',
        color: '#F7A619',
    },
    {
        title: 'Weekly Overview',
        value: '12 New',
        change: '8 In Progress',
        changeText: 'this week',
        icon: Target,
        gradient: 'from-[#8B5CF6] to-[#7C3AED]',
        trend: 'neutral',
        color: '#8B5CF6',
    },
]

export const AnalyticsDashboard = () => {
    const [selectedCard, setSelectedCard] = useState<
        (typeof analyticsCards)[0] | null
    >(null)
    const [editedValue, setEditedValue] = useState('')

    const handleCardClick = (card: (typeof analyticsCards)[0]) => {
        setSelectedCard(card)
        setEditedValue(card.value)
    }

    const handleCloseModal = () => {
        setSelectedCard(null)
    }

    return (
        <div className="space-y-6">
            {/* Section Header - Enhanced */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-xl flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-[#1A2332] font-bold">
                            Analytics Dashboard
                        </h2>
                        <p className="text-[#64748B] text-xs">
                            Real-time performance metrics
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="secondary"
                        className="px-3 py-2 bg-white hover:bg-[#F8FAFB] border border-[#E2E8F0] text-[#044866] rounded-lg text-xs font-medium transition-all hover:shadow-md flex items-center gap-2 h-auto"
                    >
                        <Calendar className="w-3.5 h-3.5" />
                        Last 30 days
                        <ChevronRight className="w-3 h-3" />
                    </Button>
                    <Button className="px-3 py-2 bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] text-white rounded-lg text-xs font-medium transition-all hover:shadow-lg flex items-center gap-2 h-auto">
                        <Download className="w-3.5 h-3.5" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Stats Grid - Enhanced Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2.5">
                {analyticsCards.map((card, index) => {
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
                                onClick={() => handleCardClick(card)}
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
                                            <Typography
                                                variant="xs"
                                                color="text-[#64748B]"
                                            >
                                                {card.title}
                                            </Typography>
                                            <Typography
                                                variant="h4"
                                                color="text-[#1A2332]"
                                            >
                                                {card.value}
                                            </Typography>
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px]">
                                            <span className="text-[#044866] font-semibold">
                                                {card.change}
                                            </span>
                                            <span className="text-[#94A3B8]">
                                                •
                                            </span>
                                            <span className="text-[#94A3B8]">
                                                {card.changeText}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Mini Chart */}
                                    {card.showChart && (
                                        <div className="mt-1.5 h-7 -mx-1">
                                            <ResponsiveContainer
                                                width="100%"
                                                height="100%"
                                            >
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
                                                                stopColor={
                                                                    card.color
                                                                }
                                                                stopOpacity={
                                                                    0.3
                                                                }
                                                            />
                                                            <stop
                                                                offset="100%"
                                                                stopColor={
                                                                    card.color
                                                                }
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
                })}
            </div>

            {/* Edit Modal */}
            {selectedCard && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
                        {/* Header */}
                        <div
                            className={`bg-gradient-to-br ${selectedCard.gradient} p-6 text-white relative overflow-hidden`}
                        >
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

                            <div className="relative flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-xl">
                                        {selectedCard.icon && (
                                            <selectedCard.icon className="w-8 h-8 text-white" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">
                                            {selectedCard.title}
                                        </h3>
                                        <p className="text-white/80 text-sm">
                                            View and edit metric details
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    onClick={handleCloseModal}
                                    variant="secondary"
                                    className="w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-xl flex items-center justify-center transition-all duration-300 p-0"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </Button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Current Value */}
                            <div className="bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] rounded-xl p-6 border border-[#E2E8F0]">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-bold text-[#1A2332]">
                                        Current Value
                                    </h4>
                                    {selectedCard.trend === 'up' && (
                                        <div className="flex items-center gap-1.5 bg-[#10B981]/10 text-[#10B981] px-3 py-1.5 rounded-lg text-xs font-medium border border-[#10B981]/20">
                                            <ArrowUp className="w-4 h-4" />
                                            <span>
                                                {selectedCard.percentage}%
                                                increase
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-baseline gap-3">
                                    <p className="text-5xl font-bold text-[#044866]">
                                        {selectedCard.value}
                                    </p>
                                    <div className="text-sm text-[#64748B]">
                                        <span className="font-semibold text-[#044866]">
                                            {selectedCard.change}
                                        </span>{' '}
                                        {selectedCard.changeText}
                                    </div>
                                </div>
                            </div>

                            {/* Chart Section */}
                            {selectedCard.showChart && (
                                <div className="bg-white rounded-xl p-6 border border-[#E2E8F0]">
                                    <h4 className="font-bold text-[#1A2332] mb-4">
                                        Trend Analysis (Last 7 Days)
                                    </h4>
                                    <div className="h-48">
                                        <ResponsiveContainer
                                            width="100%"
                                            height="100%"
                                        >
                                            <AreaChart data={weeklyData}>
                                                <defs>
                                                    <linearGradient
                                                        id="modal-gradient"
                                                        x1="0"
                                                        y1="0"
                                                        x2="0"
                                                        y2="1"
                                                    >
                                                        <stop
                                                            offset="0%"
                                                            stopColor={
                                                                selectedCard.color
                                                            }
                                                            stopOpacity={0.3}
                                                        />
                                                        <stop
                                                            offset="100%"
                                                            stopColor={
                                                                selectedCard.color
                                                            }
                                                            stopOpacity={0}
                                                        />
                                                    </linearGradient>
                                                </defs>
                                                <Area
                                                    type="monotone"
                                                    dataKey="value"
                                                    stroke={selectedCard.color}
                                                    strokeWidth={3}
                                                    fill="url(#modal-gradient)"
                                                    dot={false}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            )}

                            {/* Edit Value */}
                            <div className="bg-white rounded-xl p-6 border border-[#E2E8F0]">
                                <div className="flex items-center gap-2 mb-4">
                                    <Edit2 className="w-5 h-5 text-[#044866]" />
                                    <h4 className="font-bold text-[#1A2332]">
                                        Update Value
                                    </h4>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <TextInput
                                            label="New Value"
                                            name="newValue"
                                            type="text"
                                            value={editedValue}
                                            onChange={(e: any) =>
                                                setEditedValue(e.target.value)
                                            }
                                            className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#044866]/20 focus:border-[#044866] transition-all text-lg font-semibold"
                                            placeholder="Enter new value"
                                        />
                                    </div>
                                    <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-lg p-4 border border-[#FDE68A]">
                                        <p className="text-xs text-[#92400E] leading-relaxed">
                                            <strong>Note:</strong> Updating this
                                            value will affect all related
                                            reports and analytics. Changes are
                                            tracked and can be audited.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] rounded-xl p-4 border border-[#E2E8F0]">
                                    <p className="text-xs font-medium text-[#64748B] mb-2 uppercase tracking-wide">
                                        Last Week
                                    </p>
                                    <p className="text-xl font-bold text-[#1A2332]">
                                        235
                                    </p>
                                    <p className="text-xs text-[#64748B] mt-1">
                                        Previous period
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] rounded-xl p-4 border border-[#E2E8F0]">
                                    <p className="text-xs font-medium text-[#64748B] mb-2 uppercase tracking-wide">
                                        Average
                                    </p>
                                    <p className="text-xl font-bold text-[#1A2332]">
                                        241
                                    </p>
                                    <p className="text-xs text-[#64748B] mt-1">
                                        Monthly avg
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] rounded-xl p-4 border border-[#E2E8F0]">
                                    <p className="text-xs font-medium text-[#64748B] mb-2 uppercase tracking-wide">
                                        Goal
                                    </p>
                                    <p className="text-xl font-bold text-[#1A2332]">
                                        300
                                    </p>
                                    <p className="text-xs text-[#64748B] mt-1">
                                        Target value
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
                                <Button
                                    variant="secondary"
                                    onClick={handleCloseModal}
                                    className="flex-1 px-6 py-3 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFB] text-[#64748B] rounded-xl font-medium transition-all duration-300 h-auto"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleCloseModal}
                                    className="flex-1 px-6 py-3 bg-gradient-to-br from-[#044866] to-[#0D5468] hover:shadow-xl text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 h-auto"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
