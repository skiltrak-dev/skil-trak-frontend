import { Save } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@components'
import {
    TradingHoursHeader,
    QuickActions,
    DayCard,
    OperatingSummary,
    DayHours,
    Shift,
} from './components'

const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
]

const initialHours: Record<string, DayHours> = {
    Monday: {
        open: true,
        mode: 'fixed',
        start: '09:00',
        end: '17:00',
        break: '12:00-13:00',
        shifts: [],
    },
    Tuesday: {
        open: true,
        mode: 'fixed',
        start: '09:00',
        end: '17:00',
        break: '12:00-13:00',
        shifts: [],
    },
    Wednesday: {
        open: true,
        mode: 'fixed',
        start: '09:00',
        end: '17:00',
        break: '12:00-13:00',
        shifts: [],
    },
    Thursday: {
        open: true,
        mode: 'fixed',
        start: '09:00',
        end: '17:00',
        break: '12:00-13:00',
        shifts: [],
    },
    Friday: {
        open: true,
        mode: 'fixed',
        start: '09:00',
        end: '17:00',
        break: '12:00-13:00',
        shifts: [],
    },
    Saturday: {
        open: false,
        mode: 'fixed',
        start: '09:00',
        end: '13:00',
        break: '',
        shifts: [],
    },
    Sunday: {
        open: false,
        mode: 'fixed',
        start: '09:00',
        end: '13:00',
        break: '',
        shifts: [],
    },
}

export function TradingHoursModule() {
    const [hours, setHours] = useState(initialHours)

    const handleCopyMonFri = () => {
        const mondayHours = hours.Monday
        const updatedHours = { ...hours }
        ;['Tuesday', 'Wednesday', 'Thursday', 'Friday'].forEach((day) => {
            updatedHours[day] = { ...mondayHours }
        })
        setHours(updatedHours)
    }

    const handleReset = () => {
        setHours(initialHours)
    }

    const handleToggleOpen = (day: string) => {
        setHours({
            ...hours,
            [day]: { ...hours[day], open: !hours[day].open },
        })
    }

    const handleModeChange = (day: string, mode: 'fixed' | 'free-shifts') => {
        setHours({
            ...hours,
            [day]: { ...hours[day], mode },
        })
    }

    const handleStartChange = (day: string, value: string) => {
        setHours({
            ...hours,
            [day]: { ...hours[day], start: value },
        })
    }

    const handleEndChange = (day: string, value: string) => {
        setHours({
            ...hours,
            [day]: { ...hours[day], end: value },
        })
    }

    const handleBreakChange = (day: string, value: string) => {
        setHours({
            ...hours,
            [day]: { ...hours[day], break: value },
        })
    }

    const addShift = (day: string) => {
        setHours({
            ...hours,
            [day]: {
                ...hours[day],
                shifts: [
                    ...hours[day].shifts,
                    { start: '09:00', end: '17:00', break: '' },
                ],
            },
        })
    }

    const removeShift = (day: string, index: number) => {
        setHours({
            ...hours,
            [day]: {
                ...hours[day],
                shifts: hours[day].shifts.filter((_, i) => i !== index),
            },
        })
    }

    const updateShift = (
        day: string,
        index: number,
        field: keyof Shift,
        value: string
    ) => {
        const newShifts = [...hours[day].shifts]
        newShifts[index] = { ...newShifts[index], [field]: value }
        setHours({
            ...hours,
            [day]: {
                ...hours[day],
                shifts: newShifts,
            },
        })
    }

    return (
        <div className="space-y-3 px-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-1.5">
                <TradingHoursHeader />
                <QuickActions
                    onCopyMonFri={handleCopyMonFri}
                    onReset={handleReset}
                />
            </div>

            {/* Days Grid */}
            <div className="grid gap-2">
                {daysOfWeek.map((day) => (
                    <DayCard
                        key={day}
                        day={day}
                        hours={hours[day]}
                        onToggleOpen={() => handleToggleOpen(day)}
                        onModeChange={(mode) => handleModeChange(day, mode)}
                        onStartChange={(value) => handleStartChange(day, value)}
                        onEndChange={(value) => handleEndChange(day, value)}
                        onBreakChange={(value) => handleBreakChange(day, value)}
                        onAddShift={() => addShift(day)}
                        onRemoveShift={(index) => removeShift(day, index)}
                        onUpdateShift={(index, field, value) =>
                            updateShift(day, index, field, value)
                        }
                    />
                ))}
            </div>

            {/* Summary Card */}
            <OperatingSummary hours={hours} daysOfWeek={daysOfWeek} />

            {/* Save Button */}
            <Button className="w-full bg-gradient-to-br from-[#044866] to-[#0D5468] hover:shadow-lg text-white text-sm font-medium">
                <Save className="w-3.5 h-3.5 mr-2" />
                Save Trading Hours
            </Button>
        </div>
    )
}
