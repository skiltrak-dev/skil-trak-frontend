import React, { useState, ChangeEvent } from 'react'

// components
import { Typography, TextInput, Switch } from '@components'

export const ScheduleCard = ({
    day,
    setScheduleTime,
}: {
    day: string
    setScheduleTime: any
}) => {
    const [isAvailable, setIsAvailable] = useState(false)

    const onChange = (e: any) => {
        setScheduleTime((scheduleTime: any) => {
            const { name, value } = e.target
            const find = scheduleTime?.find((f: any) => f.name === day)
            const filter = scheduleTime?.filter((f: any) => f.name !== day)
            return [
                ...filter,
                {
                    ...find,
                    name: day,
                    [name]: value + ':00',
                },
            ]
        })
    }
    return (
        <div className="bg-gray-100 rounded-lg px-6 grid grid-cols-3 items-center">
            <Typography variant={'label'} capitalize>
                {day}
            </Typography>
            <div className="flex">
                <Switch
                    name={day}
                    label={'Available'}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setIsAvailable(e.target.checked)
                    }}
                />
            </div>
            <div className="flex items-end gap-x-2.5">
                <TextInput
                    label={'Opening'}
                    type={'time'}
                    name={'openingTime'}
                    disabled={!isAvailable}
                    onChange={(e: any) => {
                        onChange(e)
                    }}
                />
                <TextInput
                    label={'Closing'}
                    type={'time'}
                    name={'closingTime'}
                    disabled={!isAvailable}
                    onChange={(e: any) => {
                        onChange(e)
                    }}
                />
            </div>
        </div>
    )
}
