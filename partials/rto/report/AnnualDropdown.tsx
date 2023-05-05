import React, { useState } from 'react'
import { Card, Select } from '@components'


type AnnualDropdownProps = {
    year: any
    setYear: any
    setShowCalendars: any
}

export const AnnualDropdown = ({
    year,

    setYear,
    setShowCalendars
}: AnnualDropdownProps) => {
    // const [year, setYear] = useState(new Date().getFullYear())
    // const [month, setMonth] = useState(new Date().getMonth())

    // const handleYearChange = (event: any) => {
    //     setYear(parseInt(event.value))
    // }

    // const handleMonthChange = (event: any) => {
    //     setMonth(parseInt(event.value))
    // }

    const yearOptions = Array.from(
        { length: new Date().getFullYear() - 2019 },
        (_, i) => 2020 + i
    )
        .reverse()
        .map((y) => ({ label: y.toString(), value: y.toString() }))



    return (
        <Card>
            {/* if year and month both changed then setShowCalendars to false */}

            <Select
                name="year"
                label="Year"
                value={year}
                options={yearOptions}
                onChange={(e: any) => {
                    setShowCalendars(false)
                    setYear(e)
                }}
            />

        </Card>
    )
}
