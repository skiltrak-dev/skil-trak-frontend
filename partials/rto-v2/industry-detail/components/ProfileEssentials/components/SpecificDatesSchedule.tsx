import { Button, Select } from '@components'
import { OptionType } from '@types'
import { CheckCircle, Clock } from 'lucide-react'

interface SpecificDatesScheduleProps {
    selectedSpecificDates: string[]
    specificDateTimeSlots: Record<string, string>
    timeSlotOptions: OptionType[]
    viewingMonth: number
    viewingYear: number
    onToggleSpecificDate: (dateStr: string) => void
    onUpdateSpecificDateTimeSlot: (dateStr: string, timeSlot: string) => void
    onNavigateMonth: (direction: number) => void
}

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

export function SpecificDatesSchedule({
    selectedSpecificDates,
    specificDateTimeSlots,
    timeSlotOptions,
    viewingMonth,
    viewingYear,
    onToggleSpecificDate,
    onUpdateSpecificDateTimeSlot,
    onNavigateMonth,
}: SpecificDatesScheduleProps) {
    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay()
    }

    const isDateSelected = (day: number) => {
        const dateStr = `${viewingYear}-${String(viewingMonth + 1).padStart(
            2,
            '0'
        )}-${String(day).padStart(2, '0')}`
        return selectedSpecificDates.includes(dateStr)
    }

    return (
        <div className="bg-[#F8FAFB] rounded-lg p-3 space-y-2">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-2">
                <Button
                    onClick={() => onNavigateMonth(-1)}
                    variant="primaryNew"
                    outline
                    className="w-6 h-6 rounded-md bg-white border border-[#E2E8F0] hover:bg-[#044866] hover:text-white transition-all flex items-center justify-center p-0"
                >
                    <span className="text-xs">{'<'}</span>
                </Button>
                <h4 className="text-[10px] font-medium text-[#1A2332]">
                    {months[viewingMonth]} {viewingYear}
                </h4>
                <Button
                    onClick={() => onNavigateMonth(1)}
                    variant="primaryNew"
                    outline
                    className="w-6 h-6 rounded-md bg-white border border-[#E2E8F0] hover:bg-[#044866] hover:text-white transition-all flex items-center justify-center p-0"
                >
                    <span className="text-xs">{'>'}</span>
                </Button>
            </div>

            {/* Calendar Grid */}
            <div>
                {/* Day Labels */}
                <div className="grid grid-cols-7 gap-1 mb-1">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <div
                            key={i}
                            className="h-5 flex items-center justify-center text-[8px] font-medium text-[#64748B]"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Date Grid */}
                <div className="grid grid-cols-7 gap-1">
                    {/* Empty cells for days before month starts */}
                    {Array.from({
                        length: getFirstDayOfMonth(viewingMonth, viewingYear),
                    }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-7"></div>
                    ))}

                    {/* Actual days */}
                    {Array.from(
                        { length: getDaysInMonth(viewingMonth, viewingYear) },
                        (_, i) => i + 1
                    ).map((day) => {
                        const dateStr = `${viewingYear}-${String(
                            viewingMonth + 1
                        ).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                        const selected = isDateSelected(day)

                        return (
                            <Button
                                key={day}
                                onClick={() => onToggleSpecificDate(dateStr)}
                                variant="secondary"
                                className={`h-7 rounded-lg text-[9px] font-medium transition-all flex items-center justify-center p-0 ${
                                    selected
                                        ? 'bg-gradient-to-br from-[#044866] to-[#0D5468] text-white shadow-md hover:bg-gradient-to-br hover:from-[#044866] hover:to-[#0D5468]'
                                        : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#044866]/40 hover:shadow-sm hover:bg-white'
                                }`}
                            >
                                {day}
                            </Button>
                        )
                    })}
                </div>
            </div>

            {selectedSpecificDates.length > 0 && (
                <div className="pt-2 border-t border-[#E2E8F0] space-y-2">
                    <div className="flex items-center gap-1 mb-1.5">
                        <CheckCircle
                            className="w-3 h-3 text-[#044866]"
                            fill="currentColor"
                        />
                        <p className="text-[9px] text-[#044866] font-medium">
                            {selectedSpecificDates.length} date
                            {selectedSpecificDates.length !== 1 ? 's' : ''}{' '}
                            selected
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                        {selectedSpecificDates.slice(0, 3).map((date, i) => (
                            <span
                                key={i}
                                className="text-[8px] px-1.5 py-0.5 bg-[#044866]/10 text-[#044866] rounded-md font-medium"
                            >
                                {new Date(date).toLocaleDateString('en-AU', {
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </span>
                        ))}
                        {selectedSpecificDates.length > 3 && (
                            <span className="text-[8px] px-1.5 py-0.5 bg-[#F7A619]/10 text-[#F7A619] rounded-md font-medium">
                                +{selectedSpecificDates.length - 3} more
                            </span>
                        )}
                    </div>

                    {/* Time Preferences for Specific Dates */}
                    <div>
                        <label className="text-[#1A2332] text-[9px] font-medium mb-1.5 block flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 text-[#044866]" />
                            Time Preferences
                        </label>
                        <div className="space-y-1.5 max-h-40 overflow-y-auto">
                            {selectedSpecificDates.map((dateStr) => (
                                <div
                                    key={dateStr}
                                    className="flex items-center gap-1.5 p-1.5 bg-white rounded-lg border border-[#E2E8F0]"
                                >
                                    <div className="flex-shrink-0 w-14 h-6 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-md flex items-center justify-center">
                                        <span className="text-[8px] text-white font-medium">
                                            {new Date(
                                                dateStr
                                            ).toLocaleDateString('en-AU', {
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <Select
                                        name={`specificTimeSlot-${dateStr}`}
                                        options={timeSlotOptions}
                                        value={
                                            specificDateTimeSlots[dateStr] ||
                                            'morning'
                                        }
                                        onChange={(option: any) =>
                                            onUpdateSpecificDateTimeSlot(
                                                dateStr,
                                                option.value
                                            )
                                        }
                                        className="flex-1 px-2 py-1 text-[8px]"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
