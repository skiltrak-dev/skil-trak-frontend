import { FC, useState, useRef, useEffect } from 'react'
import { createPopper } from '@popperjs/core'

interface TimeTable {
    id: number
    date: string
    openingTime: string
    closingTime: string
    day: string
    isActive: boolean
    isCancelled: boolean
    reScheduled: boolean
}

interface Schedule {
    id: number
    hours: number
    endDate: string
    timeTables: TimeTable[]
}

interface User {
    email: string
    name: string
    schedules: Schedule[]
}

interface UserData {
    id: number
    createdAt: string
    user: User
}

interface ScheduleViewProps {
    data: UserData[]
    startDate: Date
}

export const EmployeeMonthlyScheduleRow: FC<ScheduleViewProps> = ({
    data,
    startDate,
}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const popperRef = useRef<HTMLDivElement | null>(null)
    const popperInstance = useRef<any>(null)

    useEffect(() => {
        if (buttonRef.current && popperRef.current && selectedDate) {
            // Create new Popper instance
            popperInstance.current = createPopper(
                buttonRef.current,
                popperRef.current,
                {
                    placement: 'auto', // automatically choose best placement
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 8], // [skidding, distance]
                            },
                        },
                        {
                            name: 'preventOverflow',
                            options: {
                                padding: 8, // keep away from viewport edges
                            },
                        },
                        {
                            name: 'flip',
                            options: {
                                fallbackPlacements: [
                                    'top',
                                    'bottom',
                                    'right',
                                    'left',
                                ],
                                padding: 8,
                            },
                        },
                    ],
                }
            )
        }

        // Cleanup function
        return () => {
            if (popperInstance.current) {
                popperInstance.current.destroy()
                popperInstance.current = null
            }
        }
    }, [selectedDate]) // Re-run when selectedDate changes

    // Format date consistently without timezone issues
    const formatDateString = (date: Date): string => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    // Get days in month
    const getDaysInMonth = () => {
        const year = startDate.getFullYear()
        const month = startDate.getMonth()
        return new Date(year, month + 1, 0).getDate()
    }

    // Get all schedules for a specific day
    const getSchedulesForDay = (date: Date) => {
        const dateString = formatDateString(date)

        // Collect all schedules for this date across all users
        const daySchedules = data.flatMap((userData) => {
            const userSchedules = userData.user.schedules.flatMap(
                (schedule) => {
                    const timeTablesForDay = schedule.timeTables.filter(
                        (timeTable) => {
                            // Parse the timeTable date in local timezone
                            const tableDate = new Date(timeTable.date)
                            const tableDateString = formatDateString(tableDate)

                            return (
                                tableDateString === dateString &&
                                timeTable.isActive &&
                                !timeTable.isCancelled
                            )
                        }
                    )

                    return timeTablesForDay.map((timeTable) => ({
                        timeTable,
                        userName: userData.user.name,
                        userEmail: userData.user.email,
                    }))
                }
            )
            return userSchedules
        })

        return daySchedules
    }

    // Generate calendar data with proper week alignment
    const generateCalendarDays = () => {
        const year = startDate.getFullYear()
        const month = startDate.getMonth()
        const daysInMonth = getDaysInMonth()
        const firstDay = new Date(year, month, 1)

        // Get day of week (0-6), adjust to make Monday = 0
        let firstDayOfWeek = firstDay.getDay()
        if (firstDayOfWeek === 0) firstDayOfWeek = 6
        else firstDayOfWeek--

        const weeks: Date[][] = []
        let currentWeek: Date[] = []

        // Add days from previous month
        for (let i = 0; i < firstDayOfWeek; i++) {
            const prevDate = new Date(year, month, -firstDayOfWeek + i + 1)
            currentWeek.push(prevDate)
        }

        // Add days of current month
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day)
            currentWeek.push(currentDate)

            if (currentWeek.length === 7) {
                weeks.push(currentWeek)
                currentWeek = []
            }
        }

        // Add days from next month to complete the last week
        if (currentWeek.length > 0) {
            const nextMonth = month === 11 ? 0 : month + 1
            const nextYear = month === 11 ? year + 1 : year
            let dayCount = 1

            while (currentWeek.length < 7) {
                currentWeek.push(new Date(nextYear, nextMonth, dayCount++))
            }
            weeks.push(currentWeek)
        }

        return weeks
    }

    const renderSchedulePopup = (date: Date, schedules: any[]) => {
        if (!selectedDate) return null

        return (
            <div
                ref={popperRef}
                className="z-50 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-4"
            >
                <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">
                        {date.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                    <button
                        onClick={() => setSelectedDate(null)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ×
                    </button>
                </div>
                <div className="max-h-72 overflow-y-auto space-y-3">
                    {schedules.map((schedule, index) => (
                        <div
                            key={`${schedule.timeTable.id}-${index}`}
                            className="p-2 rounded-md bg-gray-50 border border-gray-100"
                        >
                            <div className="font-medium text-gray-900">
                                {schedule.userName}
                            </div>
                            <div className="text-sm text-gray-600">
                                {schedule.timeTable.openingTime} -{' '}
                                {schedule.timeTable.closingTime}
                            </div>
                            <div className="text-xs text-gray-500">
                                {schedule.userEmail}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const weeks = generateCalendarDays()

    return (
        <div className="flex w-full">
            <div className="flex-1">
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="grid grid-cols-7">
                        {week.map((date, dayIndex) => {
                            const isWeekend = dayIndex >= 5
                            const isCurrentMonth =
                                date.getMonth() === startDate.getMonth()
                            const schedulesForDay = getSchedulesForDay(date)
                            const hasSchedules = schedulesForDay.length > 0
                            const isSelected =
                                selectedDate &&
                                formatDateString(date) ===
                                    formatDateString(selectedDate)

                            return (
                                <div
                                    key={date.toISOString()}
                                    className={`relative border-r border-b border-gray-200 min-h-16 p-1
                                    ${isWeekend ? 'bg-red-50' : 'bg-white'}
                                    ${!isCurrentMonth ? 'text-gray-400' : ''}`}
                                >
                                    <span className="text-sm">
                                        {date.getDate()}
                                    </span>
                                    {hasSchedules && isCurrentMonth && (
                                        <button
                                            ref={isSelected ? buttonRef : null}
                                            onClick={() =>
                                                setSelectedDate(date)
                                            }
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-md border-2 border-teal-500 bg-teal-100 text-center p-1 flex items-center justify-center group hover:bg-teal-200"
                                        >
                                            <div className="text-xs font-medium text-teal-700">
                                                {schedulesForDay.length}
                                            </div>
                                        </button>
                                    )}
                                    {isSelected &&
                                        renderSchedulePopup(
                                            date,
                                            schedulesForDay
                                        )}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}
