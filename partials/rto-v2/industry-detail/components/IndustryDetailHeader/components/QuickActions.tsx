import { Button, Switch } from '@components'
import { Briefcase, Clock, UserCheck, XCircle } from 'lucide-react'
import { useState } from 'react'

export const QuickActions = ({
    industryStatus,
    toggleStatus,
}: {
    industryStatus: any
    toggleStatus: any
}) => {
    const [showSnoozedDatePicker, setShowSnoozedDatePicker] = useState(false)
    const [snoozedStartDate, setSnoozedStartDate] = useState('')
    const [snoozedEndDate, setSnoozedEndDate] = useState('')

    return (
        <div className="rounded-b-2xl relative px-4 py-2 bg-gradient-to-br from-white via-[#F8FAFB] to-white border-t border-[#E2E8F0] shadow-sm">
            <div className="grid grid-cols-4 gap-2">
                {/* Hiring with ON/OFF Toggle */}
                <div className="group relative flex-1 px-3 py-1.5 rounded-lg border-2 transition-all duration-300 flex items-center justify-between gap-1.5 bg-white border-[#E2E8F0]">
                    <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7]">
                            <Briefcase className="w-3 h-3 text-[#10B981]" />
                        </div>
                        <span className="text-[10px] font-semibold text-[#1A2332]">
                            Hiring
                        </span>
                    </div>
                    <Switch
                        name="hiring"
                        isChecked={industryStatus.hiring}
                        onChange={() => toggleStatus('hiring')}
                        customStyleClass="profileSwitch"
                        showError={false}
                    />
                </div>

                {/* Partner with ON/OFF Toggle */}
                <div className="group relative flex-1 px-3 py-1.5 rounded-lg border-2 transition-all duration-300 flex items-center justify-between gap-1.5 bg-white border-[#E2E8F0]">
                    <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center bg-gradient-to-br from-[#E8F4F8] to-[#D1E7F0]">
                            <UserCheck className="w-3 h-3 text-[#044866]" />
                        </div>
                        <span className="text-[10px] font-semibold text-[#1A2332]">
                            Partner
                        </span>
                    </div>
                    <Switch
                        name="partner"
                        isChecked={industryStatus.partner}
                        onChange={() => toggleStatus('partner')}
                        customStyleClass="profileSwitch"
                        showError={false}
                    />
                </div>

                {/* Snoozed Button */}
                <Button
                    onClick={() => {
                        if (!industryStatus.snoozed) {
                            setShowSnoozedDatePicker(true)
                        } else {
                            toggleStatus('snoozed')
                            setSnoozedStartDate('')
                            setSnoozedEndDate('')
                        }
                    }}
                    fullWidth
                    outline
                >
                    <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                            industryStatus.snoozed
                                ? 'bg-white/20'
                                : 'bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]'
                        }`}
                    >
                        <Clock className="w-3 h-3" />
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="text-[10px] font-semibold">
                            Snoozed
                        </span>
                        {industryStatus.snoozed &&
                            snoozedStartDate &&
                            snoozedEndDate && (
                                <span className="text-[8px] opacity-90 whitespace-nowrap">
                                    {new Date(
                                        snoozedStartDate
                                    ).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                    })}{' '}
                                    -{' '}
                                    {new Date(
                                        snoozedEndDate
                                    ).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </span>
                            )}
                    </div>
                    {industryStatus.snoozed && (
                        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full shadow-sm flex items-center justify-center">
                            <div className="w-1 h-1 bg-[#F7A619] rounded-full"></div>
                        </div>
                    )}
                </Button>

                {/* No Capacity Button */}
                <Button onClick={() => toggleStatus('noCapacity')} outline>
                    <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                            industryStatus.noCapacity
                                ? 'bg-white/20'
                                : 'bg-gradient-to-br from-[#F3E8FF] to-[#E9D5FF]'
                        }`}
                    >
                        <XCircle className="w-3 h-3" />
                    </div>
                    <span className="text-[10px] font-semibold">
                        No Capacity
                    </span>
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
