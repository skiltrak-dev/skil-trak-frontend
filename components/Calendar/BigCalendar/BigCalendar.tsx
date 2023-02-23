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

export const BigCalendar = ({
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
        8
    )
    const max = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        17
    )

    return (
        // <div className="relative">
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
                    eventWrapper: EventWrapper<CalendarEvent>,
                }}
                min={min}
                max={max}
            />
        </CalendarStyles>
        // </div>
    )
}
