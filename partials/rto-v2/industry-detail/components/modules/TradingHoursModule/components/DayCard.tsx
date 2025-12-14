import { ModeSelector } from './ModeSelector'
import { FixedHoursInput } from './FixedHoursInput'
import { FreeShiftsManager, Shift } from './FreeShiftsManager'
import { Card, Switch } from '@components'

export type DayHours = {
    open: boolean
    mode: 'fixed' | 'free-shifts'
    start: string
    end: string
    break: string
    shifts: Shift[]
}

interface DayCardProps {
    day: string
    hours: DayHours
    onToggleOpen: () => void
    onModeChange: (mode: 'fixed' | 'free-shifts') => void
    onStartChange: (value: string) => void
    onEndChange: (value: string) => void
    onBreakChange: (value: string) => void
    onAddShift: () => void
    onRemoveShift: (index: number) => void
    onUpdateShift: (index: number, field: keyof Shift, value: string) => void
}

export function DayCard({
    day,
    hours,
    onToggleOpen,
    onModeChange,
    onStartChange,
    onEndChange,
    onBreakChange,
    onAddShift,
    onRemoveShift,
    onUpdateShift,
}: DayCardProps) {
    return (
        <Card className="p-3 hover:border-[#044866]/20 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 flex-wrap">
                {/* Day & Toggle */}
                <div className="w-32 flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-[#1A2332]">
                        {day}
                    </span>
                    <Switch
                        name={day}
                        isChecked={hours.open}
                        onChange={() => onToggleOpen()}
                        customStyleClass="profileSwitch"
                    />
                </div>

                {hours.open ? (
                    <>
                        <ModeSelector
                            mode={hours.mode}
                            onModeChange={onModeChange}
                        />

                        {hours.mode === 'fixed' ? (
                            <FixedHoursInput
                                start={hours.start}
                                end={hours.end}
                                break={hours.break}
                                onStartChange={onStartChange}
                                onEndChange={onEndChange}
                                onBreakChange={onBreakChange}
                            />
                        ) : (
                            <FreeShiftsManager
                                shifts={hours.shifts}
                                onAddShift={onAddShift}
                                onRemoveShift={onRemoveShift}
                                onUpdateShift={onUpdateShift}
                            />
                        )}
                    </>
                ) : (
                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] rounded-lg">
                        <span className="text-sm font-medium text-[#94A3B8]">
                            Closed
                        </span>
                    </div>
                )}
            </div>
        </Card>
    )
}
