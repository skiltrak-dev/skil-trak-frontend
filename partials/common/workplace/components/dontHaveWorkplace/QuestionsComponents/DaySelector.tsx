import { Button } from '@components'
import React from 'react'

const days = [
    'Anyday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
]

type DaySelectorProps = {
    selectedDays: string[]
    onChange: (day: string) => void
}

export const DaySelector = ({ selectedDays, onChange }: DaySelectorProps) => {
    console.log({ selectedDays })
    return (
        <div className="flex flex-wrap gap-2">
            {days.map((day) => {
                const isSelected = selectedDays.includes(day)
                return (
                    <Button
                        key={day}
                        variant={isSelected ? 'primary' : 'secondary'}
                        onClick={() => onChange(day)}
                        text={day}
                        disabled={
                            selectedDays.includes('Anyday') && day !== 'Anyday'
                        }
                    />
                )
            })}
        </div>
    )
}
