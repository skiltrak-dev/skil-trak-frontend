import { Clock } from 'lucide-react'
import { Card } from '@components'
import { DayHours } from './DayCard'

interface OperatingSummaryProps {
    hours: Record<string, DayHours>
    daysOfWeek: string[]
}

export function OperatingSummary({ hours, daysOfWeek }: OperatingSummaryProps) {
    const openDaysCount = daysOfWeek.filter((day) => hours[day].open).length
    const standardStart = hours.Monday?.start || '09:00'
    const standardEnd = hours.Monday?.end || '17:00'

    return (
        <Card className="bg-gradient-to-br from-[#E8F4F8] to-[#D1E7F0] p-3 border border-[#B8D9E8]">
            <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                    <Clock className="w-4 h-4 text-[#044866]" />
                </div>
                <div className="flex-1">
                    <h4 className="text-xs font-bold text-[#1A2332] mb-0.5">
                        Operating Summary
                    </h4>
                    <p className="text-[10px] text-[#64748B] leading-relaxed">
                        {openDaysCount} days open this week • Standard hours:{' '}
                        {standardStart} - {standardEnd}
                    </p>
                </div>
            </div>
        </Card>
    )
}
