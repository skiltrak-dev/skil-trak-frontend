import { Switch, TextInput, Typography } from '@components'
import React, { ChangeEvent, useEffect, useState } from 'react'

export const ScheduleCard = ({
    time,
    setScheduleTime,
    onScheduleChange,
}: {
    time: any
    setScheduleTime: any
    onScheduleChange: any
}) => {
    const [isAvailable, setIsAvailable] = useState<boolean>(time?.isActive)
    const [openingTime, setOpeningTime] = useState<any>(time?.openingTime)
    const [closingTime, setClosingTime] = useState<any>(time?.closingTime)

    useEffect(() => {
        onScheduleChange({
            name: time.name,
            openingTime,
            closingTime,
            isActive: isAvailable,
        })
    }, [isAvailable, openingTime, closingTime])
    return (
        <div className="bg-gray-100 rounded-lg px-6 grid grid-cols-3 items-center">
            <Typography variant={'label'} capitalize>
                {time?.name}
            </Typography>
            <div className="flex">
                <Switch
                    name={'availability?.name'}
                    label={'Available'}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setIsAvailable(e.target.checked)
                        // onChange({})
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
                    label={'Starting Time'}
                    type={'time'}
                    name={'openingTime'}
                    disabled={!isAvailable}
                    onChange={(e: any) => {
                        setOpeningTime(e.target.value)
                        // onChange(e)
                    }}
                    // {...(availability?.openingTime
                    //     ? { value: availability?.openingTime }
                    //     : {})}
                    value={openingTime}
                />
                <TextInput
                    label={'Closing Time'}
                    type={'time'}
                    name={'closingTime'}
                    disabled={!isAvailable}
                    onChange={(e: any) => {
                        setClosingTime(e.target.value)
                        // onChange(e)
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
