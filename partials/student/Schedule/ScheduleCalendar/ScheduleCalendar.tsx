import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CustomToolbar } from './CustomToolbar'
import { WeekHeaderWrapper } from './WeekHeaderWrapper'
import { CalendarStyles } from './style'
import { TimeSlotWrapper } from './TimeSlotWrapper'
import { EventWrapper } from './EventWrapper'
import { LoadingAnimation } from '@components/LoadingAnimation'

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

    console.log({ events })

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
                defaultView="week"
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
