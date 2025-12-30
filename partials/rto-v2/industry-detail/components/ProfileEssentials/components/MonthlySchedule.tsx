import { Select } from '@components'
import { Clock, Calendar as CalendarIcon } from 'lucide-react'
import Calendar from 'react-calendar'
import { CalendarStyles } from '@components/Calendar/style'
import { format } from 'date-fns'
import { OptionType } from '@types'

export interface MonthlyScheduleData {
    dates: { date: string }[]
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

    const handleDateClick = (date: Date) => {
        const formattedDate = format(date, 'yyyy-MM-dd')
        const isSelected = data.dates.some((d) => d.date === formattedDate)

        let newDates
        if (isSelected) {
            newDates = data.dates.filter((d) => d.date !== formattedDate)
        } else {
            newDates = [...data.dates, { date: formattedDate }]
        }

        onChange({ ...data, dates: newDates })
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
                <style>{`
                    .react-calendar__tile--active-custom {
                        background: #044866 !important;
                        color: white !important;
                        border-radius: 8px !important;
                    }
                    .react-calendar__tile--active-custom:enabled:hover, 
                    .react-calendar__tile--active-custom:enabled:focus {
                        background: #03364d !important;
                    }
                `}</style>
                <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#044866]" />
                    Select Interview Dates
                </h4>
                <div className="flex justify-center">
                    <CalendarStyles>
                        <Calendar
                            onClickDay={handleDateClick}
                            tileClassName={({ date }) => {
                                const formattedDate = format(date, 'yyyy-MM-dd')
                                return data.dates.some(
                                    (d) => d.date === formattedDate
                                )
                                    ? 'react-calendar__tile--active-custom'
                                    : ''
                            }}
                        />
                    </CalendarStyles>
                </div>
                <div className="mt-4 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">
                    <div className="font-semibold text-[#044866] mb-1">
                        Selected Dates ({data.dates.length}):
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {data.dates.length > 0 ? (
                            data.dates
                                .slice()
                                .sort(
                                    (a, b) =>
                                        new Date(a.date).getTime() -
                                        new Date(b.date).getTime()
                                )
                                .map((d) => (
                                    <span
                                        key={d.date}
                                        className="bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-sm"
                                    >
                                        {format(new Date(d.date), 'MMM dd')}
                                    </span>
                                ))
                        ) : (
                            <span className="italic">No dates selected</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
