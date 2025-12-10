import { Calendar, CheckCircle, Clock, TrendingUp } from 'lucide-react'
import { CountCard } from '../../cards'
import { RtoV2Api } from '@queries'

export const AppointmentsCount = ({
    studentUserId,
}: {
    studentUserId: number
}) => {
    const appointmentsCount = RtoV2Api.Students.getStudentAppointmentsCount(
        studentUserId,
        {
            skip: !studentUserId,
        }
    )

    console.log({ appointmentsCount })

    const appointmentStats = [
        {
            id: 'total',
            label: 'Total',
            value: appointmentsCount?.data?.total || 0,
            loading: appointmentsCount?.isLoading,
            icon: Calendar,
            gradientFrom: '#044866',
            gradientTo: '#0D5468',
            borderHoverColor: 'hover:border-[#044866]/30',
            shadowColor: 'shadow-[#044866]/20',
        },
        {
            id: 'upcoming',
            label: 'Upcoming',
            loading: appointmentsCount?.isLoading,
            value: appointmentsCount?.data?.future || 0,
            icon: Clock,
            gradientFrom: '#3b82f6',
            gradientTo: '#2563eb',
            borderHoverColor: 'hover:border-blue-500/30',
            shadowColor: 'shadow-blue-500/20',
        },
        {
            id: 'completed',
            label: 'Completed',
            loading: appointmentsCount?.isLoading,
            value: appointmentsCount?.data?.completed || 0,
            icon: CheckCircle,
            gradientFrom: '#10b981',
            gradientTo: '#059669',
            borderHoverColor: 'hover:border-emerald-500/30',
            shadowColor: 'shadow-emerald-500/20',
        },
        {
            id: 'thisWeek',
            label: 'This Week',
            value: appointmentsCount?.data?.week || 0,
            icon: TrendingUp,
            loading: appointmentsCount?.isLoading,
            gradientFrom: '#F7A619',
            gradientTo: 'rgba(247, 166, 25, 0.8)',
            borderHoverColor: 'hover:border-[#F7A619]/30',
            shadowColor: 'shadow-[#F7A619]/20',
        },
    ]
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {appointmentStats.map((card) => (
                <CountCard
                    key={card.id}
                    card={card}
                />
            ))}
        </div>
    )
}
