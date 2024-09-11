import { Typography } from '@components'
import { weekdays } from 'moment'
import { useState } from 'react'

export const WeekDays = ({ onClick }: { onClick: (day: string) => void }) => {
    const [selectedDay, setSelectedDay] = useState<string>('')

    const weekDays = [...weekdays().slice(1), weekdays()[0]]

    return (
        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            {weekDays?.map((day) => (
                <div
                    key={day}
                    onClick={() => {
                        onClick(day)
                        setSelectedDay(day)
                    }}
                    className={`border border-gray-400 hover:bg-gray-200 ${
                        selectedDay === day ? 'bg-gray-300' : ''
                    } cursor-pointer transition-all rounded p-1`}
                >
                    <Typography variant="small" center>
                        {day}
                    </Typography>
                </div>
            ))}
        </div>
    )
}
