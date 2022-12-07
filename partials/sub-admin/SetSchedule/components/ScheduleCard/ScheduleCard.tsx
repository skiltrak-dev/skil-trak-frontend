import React, { useState, ChangeEvent, useEffect } from 'react'

// components
import { Typography, TextInput, Switch } from '@components'

export const ScheduleCard = ({
    availability,
    setScheduleTime,
    onScheduleChange,
}: {
    availability: any
    setScheduleTime: any
    onScheduleChange: Function
}) => {
    const [isAvailable, setIsAvailable] = useState<boolean>(
        availability?.isActive
    )
    const [openingTime, setOpeningTime] = useState<any>(
        availability?.openingTime
    )
    const [closingTime, setClosingTime] = useState<any>(
        availability?.closingTime
    )

    // useEffect(() => {
    //     setIsAvailable(availability?.isActive)
    //     setOpeningTime(availability?.openingTime)
    //     setClosingTime(availability?.closingTime)
    // }, [availability])

    useEffect(() => {
        onScheduleChange({
            name: availability.name,
            openingTime,
            closingTime,
            isActive: isAvailable,
        })
    }, [isAvailable, openingTime, closingTime])

    const onChange = (e: any) => {
        // setScheduleTime((scheduleTime: any) => {
        //     const { name, value } = e.target
        //     const find = scheduleTime?.find(
        //         (f: any) => f.name === availability.name
        //     )
        //     const filter = scheduleTime?.filter(
        //         (f: any) => f.name !== availability.name
        //     )
        //     return [
        //         ...filter,
        //         {
        //             ...find,
        //             name: availability.name,
        //             [name]: value + ':00',
        //         },
        //     ]
        // })
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
                        onChange({})
                        // setScheduleTime((preVal: any) =>
                        //     !e.target.checked
                        //         ? preVal?.filter(
                        //               (f: any) => f.name !== availability.name
                        //           )
                        //         : preVal
                        // )
                    }}
                    // {...(availability?.isActive
                    //     ? { defaultChecked: availability?.isActive }
                    //     : {})}
                    defaultChecked={isAvailable}
                />
            </div>
            <div className="flex items-end gap-x-2.5">
                <TextInput
                    label={'Opening'}
                    type={'time'}
                    name={'openingTime'}
                    disabled={!isAvailable}
                    onChange={(e: any) => {
                        setOpeningTime(e.target.value)
                        onChange(e)
                    }}
                    // {...(availability?.openingTime
                    //     ? { value: availability?.openingTime }
                    //     : {})}
                    value={openingTime}
                />
                <TextInput
                    label={'Closing'}
                    type={'time'}
                    name={'closingTime'}
                    disabled={!isAvailable}
                    onChange={(e: any) => {
                        setClosingTime(e.target.value)
                        onChange(e)
                    }}
                    // {...(availability?.closingTime
                    //     ? { value: availability?.closingTime }
                    //     : {})}
                    value={closingTime}
                />
            </div>
        </div>
    )
}
