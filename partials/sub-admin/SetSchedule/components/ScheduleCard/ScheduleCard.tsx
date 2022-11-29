import React, { useState, ChangeEvent, useEffect } from 'react'

// components
import { Typography, TextInput, Switch } from '@components'

export const ScheduleCard = ({
    availability,
    setScheduleTime,
}: {
    availability: any
    setScheduleTime: any
}) => {
    const [isAvailable, setIsAvailable] = useState<boolean>(false)

    useEffect(() => {
        setIsAvailable(availability?.isActive)
    }, [availability])

    const onChange = (e: any) => {
        setScheduleTime((scheduleTime: any) => {
            const { name, value } = e.target
            const find = scheduleTime?.find(
                (f: any) => f.name === availability.name
            )
            const filter = scheduleTime?.filter(
                (f: any) => f.name !== availability.name
            )
            return [
                ...filter,
                {
                    ...find,
                    name: availability.name,
                    [name]: value + ':00',
                },
            ]
        })
    }
    return (
        <div className="bg-gray-100 rounded-lg px-6 grid grid-cols-3 items-center">
            <Typography variant={'label'} capitalize>
                {availability.name}
            </Typography>
            <div className="flex">
                <Switch
                    name={availability?.name}
                    label={'Available'}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setIsAvailable(e.target.checked)
                        setScheduleTime((preVal: any) =>
                            !e.target.checked
                                ? preVal?.filter(
                                      (f: any) => f.name !== availability.name
                                  )
                                : preVal
                        )
                    }}
                    {...(availability?.isActive
                        ? { defaultChecked: availability?.isActive }
                        : {})}
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
                    {...(availability?.openingTime
                        ? { value: availability?.openingTime }
                        : {})}
                />
                <TextInput
                    label={'Closing'}
                    type={'time'}
                    name={'closingTime'}
                    disabled={!isAvailable}
                    onChange={(e: any) => {
                        onChange(e)
                    }}
                    // {...(availability?.closingTime
                    //     ? { value: availability?.closingTime }
                    //     : {})}
                />
            </div>
        </div>
    )
}
