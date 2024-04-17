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

type AvailabilityProps = {
    setActive: any
    onSubmit: any
    result: any
    availabilities: any
    setAvailabilities: any
}

export const AvailabilityForm = ({
    setActive,
    onSubmit,
    result,
    availabilities,
    setAvailabilities,
}: AvailabilityProps) => {
    const [daysAvailability, setDaysAvailability] =
        useState<any>(availabilities)

    const handleChange = (e: any) => {
        const { name, value, checked } = e.target
        const filterData = daysAvailability.filter((f: any) => f.name !== name)

        const findIndex = daysAvailability.findIndex(
            (f: any) => f.name === name
        )

        const shiftAvailabilities = [
            ...filterData,
            {
                ...daysAvailability[findIndex],
                name,
                [value]: checked,
            },
        ]

        setDaysAvailability(shiftAvailabilities)
        setAvailabilities(shiftAvailabilities)
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
            <ShowErrorNotifications result={result} />
            <Typography variant={'label'}>Select Your Availability</Typography>

            {/*  */}
            <div className="overflow-scroll remove-scrollbar">
                <div className="min-w-[500px]">
                    <Card>
                        <div className="grid grid-cols-5 gap-4 px-3">
                            {shifts.map((shift, i) => {
                                return (
                                    <div
                                        key={shift.time}
                                        className={`${
                                            i === 0 ? 'col-start-2' : ''
                                        } mx-auto flex items-center gap-x-2`}
                                    >
                                        <img src={shift.icon} alt="" />
                                        <Typography
                                            variant={'label'}
                                            capitalize
                                        >
                                            {shift.time}
                                        </Typography>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="flex flex-col gap-y-2 mt-4">
                            {days.map((day, i) => {
                                const availabilityDay = availabilities?.find(
                                    (availability: any) =>
                                        availability?.name == day
                                )

                                return (
                                    <div
                                        key={day}
                                        className="grid grid-cols-5 items-center gap-4 px-3 bg-secondary rounded-lg py-2"
                                    >
                                        <Typography
                                            capitalize
                                            variant={'label'}
                                        >
                                            {day}
                                        </Typography>

                                        {shifts.map((shift, i) => {
                                            const defaultChecked =
                                                availabilityDay &&
                                                Object.values(
                                                    availabilityDay
                                                )?.find(
                                                    (time: any) =>
                                                        time == shift?.time
                                                )

                                            return (
                                                <div
                                                    className="mx-auto"
                                                    key={shift.time}
                                                >
                                                    <Checkbox
                                                        name={day}
                                                        value={shift.time}
                                                        defaultChecked={
                                                            defaultChecked
                                                        }
                                                        onChange={(e: any) => {
                                                            handleChange(e)
                                                        }}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="my-4">
                            <Typography variant={'muted'} color={'grayLight'}>
                                * Your request will be submitted when you’ll
                                click find industries
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
                                onClick={() => {
                                    onSubmit(daysAvailability)
                                }}
                                loading={result.isLoading}
                                disabled={result.isLoading}
                            >
                                Find Industries
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
