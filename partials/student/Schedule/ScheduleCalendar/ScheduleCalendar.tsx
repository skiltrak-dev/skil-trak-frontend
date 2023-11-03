import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { LoadingAnimation } from '@components/LoadingAnimation'
import { CustomToolbar } from './CustomToolbar'
import { EventWrapper } from './EventWrapper'
import { TimeSlotWrapper } from './TimeSlotWrapper'
import { WeekHeaderWrapper } from './WeekHeaderWrapper'
import { CalendarStyles } from './style'
import { useEffect, useRef } from 'react'

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
}: {
    events: any
    loading?: boolean
}) => {
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
                defaultView="month"
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
            />
        </CalendarStyles>
    )
}
