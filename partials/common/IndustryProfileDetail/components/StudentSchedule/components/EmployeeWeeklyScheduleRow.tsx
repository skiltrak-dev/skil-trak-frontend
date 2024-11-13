import { FC, useMemo } from 'react'

interface EmployeeScheduleRowProps {
    employee: any
    schedules: any
    startDate: Date
}

export const EmployeeWeeklyScheduleRow: FC<EmployeeScheduleRowProps> = ({
    employee,
    schedules,
    startDate,
}) => {
    // Normalize the start date to ensure it begins at midnight local time
    const normalizedStartDate = useMemo(() => {
        const date = new Date(startDate)
        date.setHours(0, 0, 0, 0)
        return date
    }, [startDate])

    // Format date to match timeTablesMap key structure
    const formatDate = (date: Date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    // Prepare the time tables map from schedules
    const timeTablesMap = useMemo(() => {
        const map = new Map()
        schedules[0]?.timeTables?.forEach((timeTable: any) => {
            const date = formatDate(new Date(timeTable.date))
            map.set(date, timeTable)
        })
        return map
    }, [schedules])

    // Generate the week's dates starting from Monday
    const weekDates = useMemo(() => {
        const dates = []
        const firstDay = new Date(normalizedStartDate)

        // Adjust to start from Monday if not already
        const currentDay = firstDay.getDay()
        const diff = currentDay === 0 ? -6 : 1 - currentDay // If Sunday, go back 6 days, else adjust to Monday
        firstDay.setDate(firstDay.getDate() + diff)

        for (let i = 0; i < 7; i++) {
            const date = new Date(firstDay)
            date.setDate(firstDay.getDate() + i)
            dates.push(date)
        }
        return dates
    }, [normalizedStartDate])

    const getDayName = (dayIndex: number): string => {
        const days = [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
        ]
        return days[dayIndex]
    }

    return (
        <div className="grid grid-cols-7 w-full border-b border-gray-200">
            {weekDates.map((date, index) => {
                const formattedDate = formatDate(date)
                const schedule = timeTablesMap.get(formattedDate)
                const isWeekend = index >= 5
                const dayName = getDayName(index)

                return (
                    <div
                        key={formattedDate}
                        className={`p-4 text-center border-r border-gray-200 min-h-24 ${
                            isWeekend ? 'bg-red-50' : 'bg-gray-50'
                        }`}
                    >
                        {schedule?.isActive ? (
                            <div className="flex flex-col space-y-1">
                                <span className="text-teal-600 font-medium">
                                    {schedule.openingTime} -{' '}
                                    {schedule.closingTime}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {schedule?.date.slice(0, 10)}
                                </span>
                                <span className="text-sm text-gray-600">
                                    {schedule.isCancelled
                                        ? 'Cancelled'
                                        : schedule.reScheduled
                                        ? 'Rescheduled'
                                        : 'Active'}
                                </span>
                            </div>
                        ) : (
                            <span className="text-red-600">Off Day</span>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
