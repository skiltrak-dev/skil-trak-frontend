// import { Switch, TextInput, Typography } from '@components'
// import React, { ChangeEvent, useEffect, useState } from 'react'

// export const ScheduleCard = ({
//     time,
//     setScheduleTime,
//     onScheduleChange,
// }: {
//     time: any
//     setScheduleTime: any
//     onScheduleChange: any
// }) => {
//     const [isChanged, setIsChanged] = useState<boolean>(false)
//     const [isAvailable, setIsAvailable] = useState<boolean>(time?.isActive)
//     const [openingTime, setOpeningTime] = useState<any>(time?.openingTime)
//     const [closingTime, setClosingTime] = useState<any>(time?.closingTime)

//     useEffect(() => {
//         setIsAvailable(time?.isActive)
//         setOpeningTime(time?.openingTime)
//         setClosingTime(time?.closingTime)
//     }, [time])

//     useEffect(() => {
//         onScheduleChange({
//             name: time.name,
//             openingTime,
//             closingTime,
//             isActive: isAvailable,
//         })
//     }, [isAvailable, openingTime, closingTime])

//     return (
//         <div className="bg-gray-100 rounded-lg px-6 grid grid-cols-3 items-center">
//             <Typography variant={'label'} capitalize>
//                 {time?.name}
//             </Typography>
//             <div className="flex">
//                 <Switch
//                     name={'availability?.name'}
//                     label={'Available'}
//                     onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                         setIsAvailable(e.target.checked)
//                         setIsChanged(true)
//                         // onChange({})
//                         // setScheduleTime((preVal: any) =>
//                         //     !e.target.checked
//                         //         ? preVal?.filter(
//                         //               (f: any) => f.name !== availability.name
//                         //           )
//                         //         : preVal
//                         // )
//                     }}
//                     // {...(availability?.isActive
//                     //     ? { defaultChecked: availability?.isActive }
//                     //     : {})}
//                     value={isChanged ? isAvailable : time?.isActive}
//                     defaultChecked={isAvailable}
//                 />
//             </div>
//             <div className="flex items-end gap-x-2.5">
//                 <TextInput
//                     label={'Starting Time'}
//                     type={'time'}
//                     name={'openingTime'}
//                     disabled={isChanged ? !isAvailable : !time?.isActive}
//                     onChange={(e: any) => {
//                         setOpeningTime(e.target.value)
//                         setIsChanged(true)
//                         // onChange(e)
//                     }}
//                     // {...(availability?.openingTime
//                     //     ? { value: availability?.openingTime }
//                     //     : {})}
//                     value={isChanged ? openingTime : time?.openingTime}
//                 />
//                 <TextInput
//                     label={'Closing Time'}
//                     type={'time'}
//                     name={'closingTime'}
//                     disabled={isChanged ? !isAvailable : !time?.isActive}
//                     onChange={(e: any) => {
//                         setClosingTime(e.target.value)
//                         setIsChanged(true)
//                         // onChange(e)
//                     }}
//                     // {...(availability?.closingTime
//                     //     ? { value: availability?.closingTime }
//                     //     : {})}
//                     value={isChanged ? closingTime : time?.closingTime}
//                 />
//             </div>
//         </div>
//     )
// }

import React, { ChangeEvent, useEffect, useState, useCallback } from 'react'
import { Switch, TextInput, Typography } from '@components'

export const ScheduleCard = ({
    time,
    onScheduleChange,
}: {
    time: {
        id: number
        name: string
        openingTime: string
        closingTime: string
        isActive: boolean
    }
    onScheduleChange: (schedule: {
        name: string
        openingTime: string
        closingTime: string
        isActive: boolean
    }) => void
}) => {
    const [isAvailable, setIsAvailable] = useState(time?.isActive)
    const [openingTime, setOpeningTime] = useState(time?.openingTime)
    const [closingTime, setClosingTime] = useState(time?.closingTime)

    // Track if we should send updates to parent
    const [shouldNotifyParent, setShouldNotifyParent] = useState(false)

    // Sync local state with props when they change
    useEffect(() => {
        setIsAvailable(time?.isActive)
        setOpeningTime(time?.openingTime)
        setClosingTime(time?.closingTime)
        // Don't notify on initial load or prop changes
        setShouldNotifyParent(false)
    }, [time])

    // Notify parent only when local state changes (not on initial render or prop changes)
    useEffect(() => {
        if (shouldNotifyParent) {
            onScheduleChange({
                name: time.name,
                openingTime,
                closingTime,
                isActive: isAvailable,
            })
        }
    }, [isAvailable, openingTime, closingTime, shouldNotifyParent])

    const handleAvailabilityChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsAvailable(e.target.checked)
        setShouldNotifyParent(true)
    }

    const handleOpeningTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOpeningTime(e.target.value)
        setShouldNotifyParent(true)
    }

    const handleClosingTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setClosingTime(e.target.value)
        setShouldNotifyParent(true)
    }

    return (
        <div className="bg-gray-100 rounded-lg px-6 grid grid-cols-3 items-center py-4">
            <Typography variant="label" capitalize>
                {time?.name}
            </Typography>
            <div className="flex">
                <Switch
                    name={`available-${time?.name}`}
                    label="Available"
                    onChange={handleAvailabilityChange}
                    defaultChecked={isAvailable}
                />
            </div>
            <div className="flex items-end gap-x-2.5">
                <TextInput
                    label="Starting Time"
                    type="time"
                    name={`openingTime-${time?.name}`}
                    disabled={!isAvailable}
                    onChange={handleOpeningTimeChange}
                    value={openingTime}
                />
                <TextInput
                    label="Closing Time"
                    type="time"
                    name={`closingTime-${time?.name}`}
                    disabled={!isAvailable}
                    onChange={handleClosingTimeChange}
                    value={closingTime}
                />
            </div>
        </div>
    )
}
