import { Briefcase, UserCheck, Clock, XCircle } from 'lucide-react'
import { Switch } from '@components'
import { Button } from '@components'
import { IndustryStatus } from '../types'
import { IndustryHiring } from './IndustryHiring'
import { IndustryPartner } from './IndustryPartner'
import { SnoozedIndustry } from './SnoozedIndustry'

interface StatusControlsProps {
    industryStatus: IndustryStatus
    snoozedStartDate: string
    snoozedEndDate: string
    capacityAvailableDate: string
    onToggleHiring: () => void
    onTogglePartner: () => void
    onSnoozedClick: () => void
    onNoCapacityClick: () => void
}

export function StatusControls({
    industryStatus,
    snoozedStartDate,
    snoozedEndDate,
    capacityAvailableDate,
    onToggleHiring,
    onTogglePartner,
    onSnoozedClick,
    onNoCapacityClick,
}: StatusControlsProps) {
    return (
        <div className="relative px-3 py-2.5 bg-slate-50 border-t border-slate-200">
            <div className="flex items-center gap-2">
                {/* Hiring with ON/OFF Toggle */}
                <IndustryHiring />

                {/* Partner with ON/OFF Toggle */}
                <IndustryPartner />

                {/* Snoozed Button */}
                <SnoozedIndustry />
            </div>
        </div>
    )
}
