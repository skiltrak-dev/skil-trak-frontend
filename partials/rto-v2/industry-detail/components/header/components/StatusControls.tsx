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
        <div className="relative px-4 py-2 bg-gradient-to-br from-white via-[#F8FAFB] to-white border-t border-[#E2E8F0] shadow-sm">
            <div className="flex items-center gap-2">
                {/* Hiring with ON/OFF Toggle */}
                <IndustryHiring />

                {/* Partner with ON/OFF Toggle */}
                <IndustryPartner />

                {/* Snoozed Button */}
                <SnoozedIndustry />

                {/* No Capacity Button */}
                <Button
                    onClick={onNoCapacityClick}
                    className={`group relative flex-1 px-3 py-1.5 rounded-lg border-2 transition-all duration-300 flex items-center justify-center gap-1.5 h-auto ${
                        industryStatus.noCapacity
                            ? 'bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] text-white border-[#8B5CF6] shadow-md shadow-[#8B5CF6]/30'
                            : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-[#8B5CF6]/40 hover:bg-[#8B5CF6]/5'
                    }`}
                >
                    <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                            industryStatus.noCapacity
                                ? 'bg-white/20'
                                : 'bg-gradient-to-br from-[#F3E8FF] to-[#E9D5FF]'
                        }`}
                    >
                        <XCircle className="w-3 h-3" />
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="text-[10px] font-semibold">
                            No Capacity
                        </span>
                        {industryStatus.noCapacity && capacityAvailableDate && (
                            <span className="text-[8px] opacity-90">
                                Until{' '}
                                {new Date(
                                    capacityAvailableDate
                                ).toLocaleDateString('en-US', {
                                    month: 'numeric',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </span>
                        )}
                    </div>
                    {industryStatus.noCapacity && (
                        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full shadow-sm flex items-center justify-center">
                            <div className="w-1 h-1 bg-[#8B5CF6] rounded-full"></div>
                        </div>
                    )}
                </Button>
            </div>
        </div>
    )
}
