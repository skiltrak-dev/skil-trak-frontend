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
import { currentWeekDates } from '@utils'
import { CalendarView } from '../enum'

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

export const BigCalendar = ({
    events,
    loading,
    onSelectedDate,
}: {
    events: CalendarEvent[]
    loading?: boolean
    onSelectedDate?: ({ start, end }: any) => void | undefined
}) => {
    const weekDays = currentWeekDates()
    const defaultView = CalendarView.Week
    const calendarRef = useRef<any>(null)
    const [calanderView, setCalanderView] = useState<CalendarView>(defaultView)
    const [rangeDates, setRangeDates] = useState<any>(weekDays)

    const today = new Date()
    const min = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        8
    )
    const max = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        19
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
                        start: rangeDates?.[0],
                        end: rangeDates?.[0],
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
    }, [calanderView, rangeDates])

    return (
        <CalendarStyles>
            {loading && (
                <div className="absolute w-full h-full flex items-center justify-center bg-[#ffffff95] z-50">
                    <LoadingAnimation />
                </div>
            )}
            <Calendar
                ref={(el) => {
                    calendarRef.current = el
                }}
                localizer={localizer}
                events={events || []}
                defaultView={defaultView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                components={{
                    toolbar: CustomToolbar,
                    week: { header: WeekHeaderWrapper },
                    timeSlotWrapper: TimeSlotWrapper,
                    eventWrapper: EventWrapper<CalendarEvent>,
                }}
                min={min}
                max={max}
                onView={(view: any) => {
                    onCalanderViewType(view)
                    setCalanderView(view)
                }}
                onRangeChange={(e: any) => {
                    setRangeDates(e)
                }}
            />
        </CalendarStyles>
    )
}
