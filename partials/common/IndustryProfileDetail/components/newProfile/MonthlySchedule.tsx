import { Select } from '@components'
import { Clock, Calendar as CalendarIcon } from 'lucide-react'
import Calendar from 'react-calendar'
import { CalendarStyles } from '@components/Calendar/style'
import { format } from 'date-fns'
import { OptionType } from '@types'

export interface MonthlyScheduleData {
    startDate: string
    endDate: string
    slots: { startTime: string; endTime: string }[]
}

interface MonthlyScheduleProps {
    data: MonthlyScheduleData
    onChange: (data: MonthlyScheduleData) => void
}

const timeSlotPresets: OptionType[] = [
    { label: 'Morning (9:00 AM - 12:00 PM)', value: 'morning' },
    { label: 'Afternoon (1:00 PM - 5:00 PM)', value: 'afternoon' },
    { label: 'All Day (9:00 AM - 5:00 PM)', value: 'allday' },
]

export function MonthlySchedule({ data, onChange }: MonthlyScheduleProps) {
    const handleTimeChange = (
        field: 'startTime' | 'endTime',
        value: string
    ) => {
        // Always operate on the first slot or create default
        const currentSlot = data.slots[0] || {
            startTime: '09:00',
            endTime: '12:00',
        }
        const newSlot = { ...currentSlot, [field]: value }
        onChange({ ...data, slots: [newSlot] })
    }

    const detectPreset = (start: string, end: string): string => {
        if (start === '09:00' && end === '12:00') return 'morning'
        if (start === '13:00' && end === '17:00') return 'afternoon'
        if (start === '09:00' && end === '17:00') return 'allday'
        return 'custom'
    }

    const handlePresetChange = (value: string) => {
        let newStart = '09:00'
        let newEnd = '12:00'

        if (value === 'morning') {
            newStart = '09:00'
            newEnd = '12:00'
        } else if (value === 'afternoon') {
            newStart = '13:00'
            newEnd = '17:00'
        } else if (value === 'allday') {
            newStart = '09:00'
            newEnd = '17:00'
        } else {
            // Keep existing time or default for custom
            const current = data.slots[0]
            if (current) {
                newStart = current.startTime
                newEnd = current.endTime
            }
        }

        onChange({ ...data, slots: [{ startTime: newStart, endTime: newEnd }] })
    }

    // Ensure we have at least one slot to view
    const currentSlot = data.slots[0] || {
        startTime: '09:00',
        endTime: '12:00',
    }
    const currentPreset = detectPreset(
        currentSlot.startTime,
        currentSlot.endTime
    )

    return (
        <div className="space-y-3.5 animate-in fade-in duration-500">
            {/* Calendar Section */}
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#044866]" />
                    Select Date Range
                </h4>
                <div className="flex justify-center">
                    <CalendarStyles>
                        <Calendar
                            selectRange={true}
                            onChange={(value: any) => {
                                if (
                                    Array.isArray(value) &&
                                    value.length === 2 &&
                                    value[0] &&
                                    value[1]
                                ) {
                                    onChange({
                                        ...data,
                                        startDate: format(
                                            value[0],
                                            'yyyy-MM-dd'
                                        ),
                                        endDate: format(value[1], 'yyyy-MM-dd'),
                                    })
                                }
                            }}
                            value={
                                data.startDate && data.endDate
                                    ? [
                                          new Date(data.startDate),
                                          new Date(data.endDate),
                                      ]
                                    : null
                            }
                        />
                    </CalendarStyles>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">
                    <div>
                        <span className="font-semibold text-[#044866]">
                            Start:
                        </span>{' '}
                        {data.startDate || 'Select date'}
                    </div>
                    <div>
                        <span className="font-semibold text-[#044866]">
                            End:
                        </span>{' '}
                        {data.endDate || 'Select date'}
                    </div>
                </div>
            </div>

            {/* Time Slot Section - Below Calendar */}
            <div className="bg-white px-5 py-3 rounded-xl border border-slate-100 shadow-sm">
                <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#044866]" />
                    Daily Time Slot
                </h4>

                <div className="flex flex-col gap-2">
                    <div className="w-full">
                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1.5 block">
                            Time Preset
                        </label>
                        <Select
                            name="monthly-preset"
                            options={timeSlotPresets}
                            value={currentPreset}
                            onChange={(opt: any) =>
                                handlePresetChange(opt.value)
                            }
                            className="w-full text-xs"
                            showError={false}
                        />
                    </div>

                    {currentPreset === 'custom' ? (
                        <div className="animate-in fade-in zoom-in-95 duration-200 bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2 block">
                                Custom Duration
                            </label>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-slate-400" />
                                <div className="flex items-center gap-2 flex-1">
                                    <input
                                        type="time"
                                        value={currentSlot.startTime}
                                        onChange={(e) =>
                                            handleTimeChange(
                                                'startTime',
                                                e.target.value
                                            )
                                        }
                                        className="bg-white border border-slate-200 rounded px-2 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:border-emerald-500 w-full cursor-pointer transition-colors hover:border-emerald-300"
                                    />
                                    <span className="text-slate-400 font-light text-[10px] uppercase">
                                        to
                                    </span>
                                    <input
                                        type="time"
                                        value={currentSlot.endTime}
                                        onChange={(e) =>
                                            handleTimeChange(
                                                'endTime',
                                                e.target.value
                                            )
                                        }
                                        className="bg-white border border-slate-200 rounded px-2 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:border-emerald-500 w-full text-right cursor-pointer transition-colors hover:border-emerald-300"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center gap-3 animate-in fade-in">
                            <Clock className="w-4 h-4 text-[#044866]" />
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-slate-700">
                                    Selected Time
                                </span>
                                <span className="text-xs text-slate-500">
                                    {currentSlot.startTime} -{' '}
                                    {currentSlot.endTime}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
