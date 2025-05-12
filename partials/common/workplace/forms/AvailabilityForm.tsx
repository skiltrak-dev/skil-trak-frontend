import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

// components
import {
    Card,
    Button,
    Checkbox,
    Typography,
    ShowErrorNotifications,
    AuthorizedUserComponent,
} from '@components'
import { UserRoles } from '@constants'

type AvailabilityProps = {
    setActive: any
    onSubmit: any
    onSubmitBeta?: any
    result: any
    availabilities: any
    setAvailabilities: any
    autoResult?: any
}

export const AvailabilityForm = ({
    autoResult,
    setActive,
    onSubmit,
    onSubmitBeta,
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
                                                Object.entries(
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
                                                            availabilityDay &&
                                                            availabilityDay[
                                                                shift?.time
                                                            ]
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
                            {/* <Typography variant={'muted'} color={'grayLight'}>
                                * Click Find Workplace Manually to submit your
                                request. A SkilTrak coordinator will then
                                manually match you with a suitable workplace.
                            </Typography> */}
                            <Typography variant={'muted'} color={'grayLight'}>
                                * Click Auto-Match & Apply (Beta) to let the
                                system automatically find and apply to the
                                nearest available workplace on your behalf.
                            </Typography>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-x-4">
                                <Button
                                    variant={'secondary'}
                                    onClick={() => {
                                        setActive(
                                            (active: number) => active - 1
                                        )
                                    }}
                                >
                                    Previous
                                </Button>
                                {autoResult && onSubmitBeta && (
                                    <Button
                                        onClick={() => {
                                            onSubmitBeta(daysAvailability)
                                        }}
                                        loading={autoResult.isLoading}
                                        disabled={autoResult.isLoading}
                                    >
                                        Auto-Match & Apply (Automatically)
                                    </Button>
                                )}
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        if (!result?.isLoading) {
                                            onSubmit(daysAvailability)
                                        }
                                    }}
                                    disabled={result?.isLoading}
                                    className="text-[10px] 2xl:text-xs font-medium uppercase transition-all duration-300 border px-2 py-1 rounded-md shadow focus:outline-none focus:ring-4 bg-transparent text-primary hover:bg-primary-dark hover:text-white border-primary-dark"
                                >
                                    {result?.isLoading ? 'Loading...' : 'More'}
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
