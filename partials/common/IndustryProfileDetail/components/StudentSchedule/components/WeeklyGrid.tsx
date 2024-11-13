import React from 'react'

interface WeeklyGridProps {
    startDate: Date
}

export const WeeklyGrid = ({ startDate }: WeeklyGridProps) => {
    // Helper function to get day name
    const getDayName = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long' })
    }

    // Helper function to get the last day of the month
    const getLastDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    // Generate week dates starting from Monday
    const generateWeekDates = (startDate: Date) => {
        const dates = []
        const currentDate = new Date(startDate)

        // Adjust to Monday if necessary
        const dayOfWeek = currentDate.getDay()
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek // If Sunday, go back 6 days, otherwise adjust to Monday
        currentDate.setDate(currentDate.getDate() + diff)

        // Generate 7 days starting from Monday
        for (let i = 0; i < 7; i++) {
            const date = new Date(currentDate)
            date.setDate(currentDate.getDate() + i)

            // Handle month transitions
            const lastDayOfMonth = getLastDayOfMonth(date)
            if (date.getDate() > lastDayOfMonth) {
                // If we've exceeded the last day of the current month,
                // move to the first day of the next month
                date.setDate(1)
                date.setMonth(date.getMonth() + 1)
            }

            // Handle year transition
            if (date.getMonth() === 0 && date.getDate() === 1 && i > 0) {
                date.setFullYear(date.getFullYear() + 1)
            }

            dates.push(date)
        }
        return dates
    }

    const weekDates = generateWeekDates(new Date(startDate))

    return (
        <div className="grid grid-cols-7 bg-white">
            {weekDates.map((date, index) => {
                const isWeekend = index >= 5
                const dayName = getDayName(date)
                const currentMonth =
                    date.getMonth() === new Date(startDate).getMonth()

                return (
                    <div
                        key={date.toISOString()}
                        className={`p-4 text-center border-b border-r border-gray-200 h-[4.8rem]
                            ${isWeekend ? 'bg-red-700' : 'bg-teal-700'}
                            ${currentMonth ? 'text-white' : 'text-gray-300'}`}
                    >
                        <div className="font-medium">{date.getDate()}</div>
                        <div className="text-sm">{dayName}</div>
                    </div>
                )
            })}
        </div>
    )
}
