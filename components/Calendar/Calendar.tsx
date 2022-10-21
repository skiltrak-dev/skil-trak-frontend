import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'

import { CalendarStyles } from './style'

export const SidebarCalendar = ({ enbledDays, setSelectedDate }: any) => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        if (setSelectedDate) {
            setSelectedDate(date)
        }
    }, [date])

    return (
        <>
            <CalendarStyles>
                <Calendar
                    {...(enbledDays
                        ? {
                              tileDisabled: ({ date }) => {
                                  return !enbledDays?.includes(date.getDay())
                              },
                          }
                        : {})}
                    onChange={setDate}
                    value={date}
                />
            </CalendarStyles>
        </>
    )
}
