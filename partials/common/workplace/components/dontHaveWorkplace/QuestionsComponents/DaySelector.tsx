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
    return (
        <div className="flex flex-wrap gap-2">
            {days.map((day) => {
                const isSelected = selectedDays.includes(day)
                return (
                    <button
                        key={day}
                        onClick={() => onChange(day)}
                        className={`px-4 py-2 rounded-xl text-sm transition ${
                            isSelected
                                ? 'bg-primary text-white shadow'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        type="button"
                    >
                        {day}
                    </button>
                )
            })}
        </div>
    )
}
