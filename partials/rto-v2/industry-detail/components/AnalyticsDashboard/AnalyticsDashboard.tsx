import {
    Calendar,
    Clock,
    Layers,
    Star,
    Target,
    Timer,
    Users,
    Zap,
} from 'lucide-react'
import { useState } from 'react'
import {
    AnalyticsCard,
    AnalyticsEditDialog,
    AnalyticsHeader,
} from './components'

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

export function AnalyticsDashboard() {
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
            <AnalyticsHeader />

            {/* Stats Grid - Enhanced Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {analyticsCards.map((card, index) => (
                    <AnalyticsCard
                        key={index}
                        card={card}
                        index={index}
                        weeklyData={weeklyData}
                        onClick={() => handleCardClick(card)}
                    />
                ))}
            </div>

            {/* Edit Modal */}
            <AnalyticsEditDialog
                selectedCard={selectedCard}
                weeklyData={weeklyData}
                editedValue={editedValue}
                onEditedValueChange={setEditedValue}
                onClose={handleCloseModal}
                open={!!selectedCard}
            />
        </div>
    )
}
