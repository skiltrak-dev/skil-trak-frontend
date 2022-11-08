import React, { useState, ChangeEvent } from 'react'

// components
import { Typography, TextInput, Switch } from '@components'

export const ScheduleCard = ({ day }: { day: string }) => {
    const [isAvailable, setIsAvailable] = useState(false)
    return (
        <div className="bg-gray-100 rounded-lg px-6 py-2 grid grid-cols-3 items-center">
            <Typography variant={'label'}>{day}</Typography>
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
                    name={'opening'}
                    disabled={!isAvailable}
                />
                <TextInput
                    label={'Closing'}
                    type={'time'}
                    name={'closing'}
                    disabled={!isAvailable}
                />
            </div>
        </div>
    )
}
