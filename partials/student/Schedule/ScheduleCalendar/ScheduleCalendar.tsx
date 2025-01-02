import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { LoadingAnimation } from '@components/LoadingAnimation'
import { CustomToolbar } from './CustomToolbar'
import { EventWrapper } from './EventWrapper'
import { TimeSlotWrapper } from './TimeSlotWrapper'
import { WeekHeaderWrapper } from './WeekHeaderWrapper'
import { CalendarStyles } from './style'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { currentMonthDates, currentWeekDates } from '@utils'
import { CalendarView } from '@components/Calendar/enum'

const localizer = momentLocalizer(moment)

export interface CalendarEvent {
    priority: 'high' | 'medium' | 'low'
    title: string
    subTitle?: string
    type?: 'video' | 'workplace' | 'mobile'
    start: Date
    end: Date
    allDay?: boolean
}

export const ScheduleCalendar = ({
    events,
    loading,
    onSelectedDate,
    onNavigateDate,
    startData = new Date(),
}: {
    startData: Date
    loading?: boolean
    events: CalendarEvent[]
    onNavigateDate: (date: Date) => void
    onSelectedDate?: ({ start, end }: any) => void | undefined
}) => {
    const monthDays = currentMonthDates(startData)
    const dates = {
        start: monthDays?.[0]?.toDate(),
        end: monthDays?.[monthDays?.length - 1]?.toDate(),
    }

    const defaultView = CalendarView.Month
    const calendarRef = useRef<any>(null)
    const [calanderView, setCalanderView] = useState<CalendarView>(defaultView)
    const [rangeDates, setRangeDates] = useState<any>(dates)

    const today = new Date()
    const min = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0
    )
    const max = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59
    )

    const calanderViewType = useMemo(() => calanderView, [calanderView])

    const onCalanderViewType = useCallback((view: CalendarView) => {
        setCalanderView(view)
    }, [])

    useEffect(() => {
        const onRangeChange = () => {
            if (onSelectedDate) {
                if (calanderViewType === CalendarView.Day) {
                    onSelectedDate({
                        start: rangeDates?.start || rangeDates?.[0],
                        end: rangeDates?.end || rangeDates?.[0],
                    })
                } else if (calanderViewType === CalendarView.Week) {
                    onSelectedDate({
                        start: rangeDates?.[0],
                        end: rangeDates?.[rangeDates?.length - 1],
                    })
                } else if (calanderViewType === CalendarView.Month) {
                    onSelectedDate(rangeDates)
                }
            }
        }
        onRangeChange()
    }, [calanderView, rangeDates, startData])

    return (
        <CalendarStyles>
            {loading && (
                <div className="absolute w-full h-full flex items-center justify-center bg-[#ffffff95] z-50">
                    <LoadingAnimation />
                </div>
            )}
            <Calendar
                localizer={localizer}
                events={events || []}
                date={startData}
                defaultView={defaultView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                components={{
                    toolbar: CustomToolbar,
                    week: { header: WeekHeaderWrapper },
                    timeSlotWrapper: TimeSlotWrapper,
                    eventWrapper: EventWrapper<any>,
                }}
                min={min}
                max={max}
                onView={(view: any) => {
                    // onCalanderViewType(view)
                    setCalanderView(view)
                }}
                onNavigate={(navigate) => {
                    onNavigateDate(navigate)
                }}
                onRangeChange={(e: any) => {
                    setTimeout(() => {
                        setRangeDates(e)
                    }, 1000)
                }}
            />
        </CalendarStyles>
    )
}
