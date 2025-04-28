import { Typography } from '@components'
import { weekdays } from 'moment'

export const WeekDays = ({
    onClick,
    selectedDay,
    disabledDay,
}: {
    onClick: (day: string) => void
    selectedDay?: string
    disabledDay?: string
}) => {
    const weekDays = [...weekdays().slice(1), weekdays()[0]]

    return (
        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            {weekDays.map((day) => {
                const isDisabled = day === disabledDay
                return (
                    <div
                        key={day}
                        onClick={() => {
                            if (!isDisabled) {
                                onClick(day)
                            }
                        }}
                        className={`border border-gray-400 ${
                            isDisabled
                                ? 'bg-gray-100 cursor-not-allowed opacity-50'
                                : 'hover:bg-gray-200 cursor-pointer'
                        } ${
                            selectedDay === day ? 'bg-gray-300' : ''
                        } transition-all rounded p-1`}
                    >
                        <Typography variant="small" center>
                            {day}
                        </Typography>
                    </div>
                )
            })}
        </div>
    )
}
