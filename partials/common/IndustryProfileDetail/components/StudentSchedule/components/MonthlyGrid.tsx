import { FC } from 'react'
import { ScheduleEntry } from '../types'

interface WeeklyGridProps {
    schedules: ScheduleEntry[]
    startDate: Date
}

export const MonthlyGrid: FC<WeeklyGridProps> = ({ schedules, startDate }) => {
    const days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ]

    const getScheduleForDay = (employeeId: string, dayIndex: number) => {
        const date = new Date(startDate)
        date.setDate(date.getDate() + dayIndex)
        const dateString = date.toISOString().split('T')[0]

        return schedules.find(
            (s) => s.employeeId === employeeId && s.date === dateString
        )
    }

    return (
        <div className="grid grid-cols-7 bg-white w-full">
            {/* Header row */}
            {days.map((day, index) => {
                const date = new Date(startDate)
                date.setDate(date.getDate() + index)
                const isWeekend = index >= 5

                return (
                    <div
                        key={day}
                        className={`py-1  text-center border-b border-r border-gray-200 w-full
              ${
                  isWeekend ? 'bg-red-700 text-white' : 'bg-teal-700 text-white'
              }`}
                    >
                        <div className="text-sm">{day}</div>
                    </div>
                )
            })}
        </div>
    )
}
