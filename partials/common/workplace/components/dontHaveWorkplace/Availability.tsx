import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

// components
import {
    Card,
    Button,
    Checkbox,
    Typography,
    ShowErrorNotifications,
} from '@components'

// queries
import { useWorkPlaceRequestMutation } from '@queries'

type AvailabilityProps = {
    setActive: any
    personalInfoData: any
}
export const Availability = ({
    setActive,
    personalInfoData,
}: AvailabilityProps) => {
    const [daysAvailability, setDaysAvailability] = useState(Array())
    // query
    const [workplaceRequest, workplaceRequestResult] =
        useWorkPlaceRequestMutation()

    useEffect(() => {
        if (workplaceRequestResult.isSuccess) {
            setActive((active: number) => active + 1)
        }
    }, [workplaceRequestResult.isSuccess])

    const handleChange = (e: any) => {
        const { name, value, checked } = e.target
        const filterData = daysAvailability.filter((f) => f.name !== name)

        const findIndex = daysAvailability.findIndex((f) => f.name === name)

        setDaysAvailability([
            ...filterData,
            {
                ...daysAvailability[findIndex],
                name,
                [value]: checked,
            },
        ])
        // setDaysAvailability([
        //     ...filterData,
        //     daysAvailability.map((d) => d.name).includes(name)
        //         ? {
        //               ...daysAvailability[findIndex],
        //               [value]: checked,
        //           }
        //         : { name, [value]: checked },
        // ])
    }
    const days = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
    ]

    const shifts = [
        {
            time: 'morning',
            icon: './icons/morning.svg',
        },
        {
            time: 'afternoon',
            icon: './icons/afternoon.svg',
        },
        {
            time: 'evening',
            icon: './icons/evening.svg',
        },
        {
            time: 'night',
            icon: './icons/night.svg',
        },
    ]
    return (
        <div>
            <ShowErrorNotifications result={workplaceRequestResult} />
            <Typography variant={'label'}>Select Your Availability</Typography>

            {/*  */}
            <Card>
                <div className="grid grid-cols-5 gap-4 px-3">
                    {shifts.map((shift, i) => (
                        <div
                            key={shift.time}
                            className={`${
                                i === 0 ? 'col-start-2' : ''
                            } mx-auto flex items-center gap-x-2`}
                        >
                            <img src={shift.icon} alt="" />
                            <Typography variant={'label'} capitalize>
                                {shift.time}
                            </Typography>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-y-2 mt-4">
                    {days.map((days, i) => (
                        <div
                            key={days}
                            className="grid grid-cols-5 gap-4 px-3 bg-secondary rounded-lg py-2"
                        >
                            <Typography capitalize variant={'label'}>
                                {days}
                            </Typography>

                            {shifts.map((shift, i) => (
                                <div className="mx-auto" key={shift.time}>
                                    <Checkbox
                                        name={days}
                                        value={shift.time}
                                        onChange={(e: any) => {
                                            handleChange(e)
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="my-4">
                    <Typography variant={'muted'} color={'grayLight'}>
                        * Your request will be submitted when you’ll click find
                        industries
                    </Typography>
                </div>

                <div className="flex items-center gap-x-4">
                    <Button
                        variant={'secondary'}
                        onClick={() => {
                            setActive((active: number) => active - 1)
                        }}
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={async () => {
                            await workplaceRequest({
                                ...personalInfoData,
                                generalAvailabilities: daysAvailability,
                            })
                        }}
                        loading={workplaceRequestResult.isLoading}
                        disabled={workplaceRequestResult.isLoading}
                    >
                        Find Industries
                    </Button>
                </div>
            </Card>
        </div>
    )
}
