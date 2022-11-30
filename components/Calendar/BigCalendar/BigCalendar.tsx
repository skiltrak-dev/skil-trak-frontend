import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CustomToolbar } from './CustomToolbar'
import { WeekHeaderWrapper } from './WeekHeaderWrapper'
import { CalendarStyles } from './style'
import { TimeSlotWrapper } from './TimeSlotWrapper'
import { EventWrapper } from './EventWrapper'

const localizer = momentLocalizer(moment)

interface CalendarEvent {
    priority: 'high' | 'medium' | 'low'
    title: string
    subTitle?: string
    type?: 'video' | 'workplace' | 'mobile'
    start: Date
    end: Date
    allDay?: boolean
}

export const BigCalendar = () => {
    const events: CalendarEvent[] = [
        {
            allDay: false,
            start: new Date('2022-11-27T01:00:15.221Z'),
            end: new Date('2022-11-27T02:00:15.221Z'),
            title: 'Appointment',
            priority: 'high',
            subTitle: 'Go For It',
        },
        {
            allDay: false,
            end: new Date('2022-11-29T05:00:00.000Z'),
            start: new Date('2022-11-29T07:00:00.000Z'),
            title: 'test larger',
            priority: 'low',
        },
        {
            allDay: false,
            end: new Date('2022-11-29T18:00:00.000Z'),
            start: new Date('2022-11-29T10:00:00.000Z'),
            title: 'test larger',
            priority: 'medium',
        },
        {
            allDay: true,
            end: new Date('2022-11-29T19:00:00.000Z'),
            start: new Date('2022-11-28T19:00:00.000Z'),
            title: 'test all day',
            priority: 'high',
        },
        {
            allDay: true,
            end: new Date('2022-11-30T19:00:00.000Z'),
            start: new Date('2022-11-28T19:00:00.000Z'),
            title: 'test 2 days',
            priority: 'high',
        },
        {
            allDay: false,
            end: new Date('2022-12-02T10:48:15.222Z'),
            start: new Date('2022-11-29T10:48:15.222Z'),
            title: 'test multi-day',
            priority: 'high',
        },
    ]

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
        <CalendarStyles>
            <Calendar
                localizer={localizer}
                events={events}
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
    )
}
