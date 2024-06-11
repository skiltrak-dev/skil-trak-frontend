import { BigCalendar, CalendarEvent, Card, Typography } from '@components'
import React from 'react'

export const SubadminCalendarViewDetail = () => {
    const events: CalendarEvent[] = [
        {
            allDay: false,
            start: new Date('2024-06-26T02:00:15.221Z'),
            end: new Date('2024-06-27T02:00:15.221Z'),
            title: 'Appointment',
            priority: 'high',
            subTitle: 'Go For It',
        },
        {
            allDay: false,
            end: new Date('2024-06-29T05:00:00.000Z'),
            start: new Date('2024-06-29T07:00:00.000Z'),
            title: 'test larger',
            priority: 'low',
        },
    ]

    return (
        <Card fullHeight shadowType="profile" noPadding>
            <div className="h-full overflow-hidden">
                <div className="px-4 py-3.5 border-b border-secondary-dark">
                    <Typography semibold>
                        <span className="text-[15px]">Calendar</span>
                    </Typography>
                </div>
            </div>

            {/*  */}
            <div className="p-4">
                <BigCalendar events={events} />
            </div>
        </Card>
    )
}
