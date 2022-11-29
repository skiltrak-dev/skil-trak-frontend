import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import { Paginate } from '@components/Paginate/Paginate'
// import 'react-calendar/dist/Calendar.css'

import { CalendarStyles } from './style'

export const SidebarCalendar = ({ enbledDays, setSelectedDate }: any) => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        if (setSelectedDate) {
            setSelectedDate(date)
        }
    }, [date])

    return (
        <CalendarStyles>
            <Calendar
                {...(enbledDays
                    ? {
                          tileDisabled: ({ date }) => {
                              return (
                                  !enbledDays?.includes(date.getDay()) ||
                                  date < new Date()
                              )
                          },
                      }
                    : {})}
                onChange={setDate}
                value={date}
            />
        </CalendarStyles>
    )
}
