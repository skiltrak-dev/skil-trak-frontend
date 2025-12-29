import {
    Phone,
    Clock,
    Calendar,
    Eye,
    CheckCircle,
    TicketPlus,
    Circle,
} from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import { Call } from './call'
import { CallCard, MobileViewCallCard } from './cards'

interface CallListProps {
    calls: Call[]
    onCallSelect: (call: Call) => void
    onMarkCompleted?: (callId: string) => void
    onCreateTicket?: (callId: string) => void
}

export function CallList({
    calls,
    onCallSelect,
    onMarkCompleted,
    onCreateTicket,
}: CallListProps) {

    if (calls.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center">
                <Phone className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-gray-900 mb-1">No calls found</h3>
                <p className="text-gray-600 text-sm">
                    Try adjusting your filters or search query
                </p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Desktop List */}
            <div className="hidden lg:block">
                {calls.map((call, index) => {
                    const isCompleted = call.isCompleted
                    const hasTicket = call.hasTicket

                    return (
                        <CallCard
                            hasTicket={hasTicket}
                            isCompleted={isCompleted}
                            key={call.id}
                            index={index}
                            call={call}
                            onCallSelect={onCallSelect}
                            onMarkCompleted={onMarkCompleted}
                            onCreateTicket={onCreateTicket}
                        />
                    )
                })}
            </div>

            {/* Mobile List */}
            <div className="lg:hidden divide-y divide-gray-100">
                {calls.map((call) => {
                    const isCompleted = call.isCompleted
                    const hasTicket = call.hasTicket

                    return (
                        <MobileViewCallCard
                            hasTicket={hasTicket}
                            isCompleted={isCompleted}
                            key={call.id}
                            call={call}
                            onCallSelect={onCallSelect}
                            onMarkCompleted={onMarkCompleted}
                            onCreateTicket={onCreateTicket}
                        />
                    )
                })}
            </div>
        </div>
    )
}
