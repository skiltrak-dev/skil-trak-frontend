import React, { useState } from 'react'
import { Card, Select } from '@components'


type MonthlyDropdown = {
    year: any
    month: any
    setMonth: any
    setYear: any
    setShowCalendars: any
}

export const MonthlyDropdown = ({
    year,
    month,
    setMonth,
    setYear,
    setShowCalendars
}: MonthlyDropdown) => {
    // const [year, setYear] = useState(new Date().getFullYear())
    // const [month, setMonth] = useState(new Date().getMonth())

    // const handleYearChange = (event: any) => {
    //     setYear(parseInt(event.value))
    // }

    // const handleMonthChange = (event: any) => {
    //     setMonth(parseInt(event.value))
    // }
    console.log("year", year)
    console.log("month", month)
    const yearOptions = Array.from(
        { length: new Date().getFullYear() - 2019 },
        (_, i) => 2020 + i
    )
        .reverse()
        .map((y) => ({ label: y.toString(), value: y.toString() }))

    const monthOptions = Array.from({ length: 12 }, (_, i) => i).map((m) => ({
        label: new Date(0, m).toLocaleString('default', { month: 'long' }),
        value: m.toString(),
    }))

    return (
        <Card>
            {/* if year and month both changed then setShowCalendars to false */}

            <Select
                name="year"
                label="Year"
                value={year}
                options={yearOptions}
                onChange={(e: any) => {
                    setYear(e)
                }}
            />
            <Select
                name="month"
                label="Month"
                value={month}
                options={monthOptions}
                onChange={(e: any) => {
                    if (year && month) {

                        setShowCalendars(false)
                    }
                    setMonth(e)
                }}
            />
        </Card>
    )
}
