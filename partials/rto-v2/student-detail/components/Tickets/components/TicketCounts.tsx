import { RtoV2Api } from '@queries'
import { AlertCircle, CheckCircle, Clock, Ticket } from 'lucide-react'
import { CountCard } from '../../cards'

export const TicketCounts = ({ studentId }: { studentId: number }) => {
    const ticketsCount = RtoV2Api.Students.getStudentTicketsCount(studentId, {
        skip: !studentId,
    })

    const statsCards = [
        {
            id: 'total',
            label: 'Total Tickets',
            value: ticketsCount?.data?.all || 0,
            icon: Ticket,
            gradientFrom: '#044866',
            gradientTo: '#0D5468',
            borderHoverColor: 'hover:border-[#044866]/30',
            shadowColor: 'shadow-[#044866]/20',
        },
        {
            id: 'open',
            label: 'Open',
            value: ticketsCount?.data?.open || 0,
            icon: AlertCircle,
            gradientFrom: '#ef4444',
            gradientTo: '#dc2626',
            borderHoverColor: 'hover:border-red-500/30',
            shadowColor: 'shadow-red-500/20',
        },
        {
            id: 'reopened',
            label: 'Reopened',
            value: ticketsCount?.data?.reopened || 0,
            icon: Clock,
            gradientFrom: '#3b82f6',
            gradientTo: '#2563eb',
            borderHoverColor: 'hover:border-blue-500/30',
            shadowColor: 'shadow-blue-500/20',
        },
        {
            id: 'resolved',
            label: 'Resolved',
            value: ticketsCount?.data?.closed || 0,
            icon: CheckCircle,
            gradientFrom: '#10b981',
            gradientTo: '#059669',
            borderHoverColor: 'hover:border-emerald-500/30',
            shadowColor: 'shadow-emerald-500/20',
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {statsCards.map((card) => (
                <CountCard key={card.id} card={card} />
            ))}
        </div>
    )
}
