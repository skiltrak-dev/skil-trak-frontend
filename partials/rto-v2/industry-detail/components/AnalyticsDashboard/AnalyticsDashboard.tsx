import { RtoV2Api, CommonApi } from '@redux'
import { useAppSelector } from '@redux/hooks'
import { Calendar, Clock, Layers, Star, Timer, Users } from 'lucide-react'
import { useState } from 'react'
import { AnalyticsCard, AnalyticsHeader } from './components'

const weeklyData = [
    { value: 20 },
    { value: 35 },
    { value: 28 },
    { value: 45 },
    { value: 38 },
    { value: 52 },
    { value: 48 },
]

export function AnalyticsDashboard() {
    const { industryDetail: industry } = useAppSelector(
        (state) => state.industry
    )

    const { data: counts } = RtoV2Api.Industries.getRtoIndustryDataCount(
        industry?.id || 0,
        {
            skip: !industry?.id,
        }
    )

    console.log({ industryindustryindustryindustry: industry })

    const overAllRating =
        CommonApi.Feedback.useOverAllIndustryRatingsFromStudent(
            { id: industry?.id || 0 },
            {
                skip: !industry?.id,
            }
        )

    const analyticsCards = [
        {
            title: 'Students',
            value: counts?.totalStudents || 0,
            change: '+0',
            changeText: 'this month',
            icon: Users,
            gradient: 'from-[#044866] to-[#0D5468]',
            trend: 'up',
            percentage: 0,
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
            value: `${counts?.totalEnrolledStudents || 0}/${
                counts?.totalSectorCapacity || 0
            }`,
            change: 'Spots',
            changeText: 'available',
            icon: Layers,
            gradient: 'from-[#0D5468] to-[#044866]',
            trend: 'neutral',
            showBar: true,
            percentage: counts?.totalSectorCapacity
                ? Math.round(
                      (counts.totalEnrolledStudents /
                          counts.totalSectorCapacity) *
                          100
                  )
                : 0,
            color: '#0D5468',
        },
        // {
        //     title: 'Response Time',
        //     value: '2.4hrs',
        //     change: '-0.8hrs',
        //     changeText: 'improvement',
        //     icon: Timer,
        //     gradient: 'from-[#14B8A6] to-[#0D9488]',
        //     trend: 'up',
        //     percentage: 25,
        //     color: '#14B8A6',
        // },
        {
            title: 'Rating',
            value: overAllRating?.data?.averageRating || 0,
            change: overAllRating?.data?.totalFeedbacks || '0',
            changeText: `${
                (Number(overAllRating?.data?.averageRating) / 5) * 100
            }% positive`,
            icon: Star,
            gradient: 'from-[#F7A619] to-[#F59E0B]',
            trend: 'up',
            percentage: 2.1,
            color: '#F7A619',
        },
    ]

    const [selectedCard, setSelectedCard] = useState<
        (typeof analyticsCards)[0] | null
    >(null)
    const [editedValue, setEditedValue] = useState('')

    const handleCardClick = (card: (typeof analyticsCards)[0]) => {
        // setSelectedCard(card)
        // setEditedValue(card.value)
    }

    const handleCloseModal = () => {
        setSelectedCard(null)
    }

    return (
        <div className="space-y-6">
            {/* Section Header - Enhanced */}
            <AnalyticsHeader />

            {/* Stats Grid - Enhanced Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
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
        </div>
    )
}
