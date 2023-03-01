import React, { useEffect, useState, ChangeEvent } from 'react'
import Calendar from 'react-calendar'
import { Paginate } from '@components/Paginate/Paginate'
// import 'react-calendar/dist/Calendar.css'

import { CalendarStyles } from './style'

export const SidebarCalendar = ({ enabledDays, setSelectedDate }: any) => {
    const [isDateChange, setIsDateChange] = useState(false)
    const [date, setDate] = useState(new Date())

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        if (setSelectedDate && isDateChange) {
            setSelectedDate(date)
        }
    }, [date, isDateChange])

    useEffect(() => {
        if (!mounted) {
            setMounted(true)
        }
    }, [])

    return mounted ? (
        <CalendarStyles>
            <Calendar
                {...(enabledDays
                    ? {
                          tileDisabled: ({ date }) =>
                              !enabledDays?.includes(date.getDay()) ||
                              date < new Date(),
                      }
                    : {})}
                onChange={(e: Date) => {
                    setDate(e)
                    setIsDateChange(true)
                }}
                value={date}
            />
        </CalendarStyles>
    ) : null
}
