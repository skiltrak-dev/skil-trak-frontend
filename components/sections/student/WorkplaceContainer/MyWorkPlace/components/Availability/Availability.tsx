import React, { useEffect, useState } from 'react'

// components
import { Typography, Card } from 'components'
import { Button, Checkbox } from 'components'
import { FormProvider, useForm } from 'react-hook-form'

// queries
import { useWorkPlaceRequestMutation } from '@queries'

type AvailabilityProps = {
    setActive: any
    personalInfoData: any
    setWorkplaceIndustries: any
    setSelectedCourses: any
}
export const Availability = ({
    setActive,
    personalInfoData,
    setSelectedCourses,
    setWorkplaceIndustries,
}: AvailabilityProps) => {
    const [daysAvailability, setDaysAvailability] = useState(Array())
    // query
    const [workplaceRequest, workplaceRequestResult] =
        useWorkPlaceRequestMutation()

    useEffect(() => {
        if (workplaceRequestResult.isSuccess) {
            setWorkplaceIndustries(workplaceRequestResult?.data)
            setActive((active: number) => active + 1)
        }
    }, [workplaceRequestResult.isSuccess])

    const handleChange = (e: any) => {
        const { name, value, checked } = e.target
        const filterData = daysAvailability.filter((f) => f.name !== name)

        const findIndex = daysAvailability.findIndex((f) => f.name === name)

        setDaysAvailability([
            ...filterData,
            daysAvailability.map((d) => d.name).includes(name)
                ? {
                      ...daysAvailability[findIndex],
                      [value]: checked,
                  }
                : { name, [value]: checked },
        ])
    }
    console.log('daysAvailability', daysAvailability)
    const days = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
    ]

    const shifts = ['morning', 'afternoon', 'evening', 'night']
    return (
        <div>
            <Typography variant={'label'}>Select Your Availability</Typography>

            {/*  */}
            <Card>
                <div className="grid grid-cols-5 gap-4 px-3">
                    <div className="col-start-2 mx-auto flex items-center gap-x-2">
                        <img src="./icons/morning.svg" alt="" />
                        <Typography variant={'label'}>Mornings</Typography>
                    </div>
                    <div className="mx-auto flex items-center gap-x-2">
                        <img src="./icons/afternoon.svg" alt="" />
                        <Typography variant={'label'}>After Noons</Typography>
                    </div>
                    <div className="mx-auto flex items-center gap-x-2">
                        <img src="./icons/evening.svg" alt="" />
                        <Typography variant={'label'}>Evenings</Typography>
                    </div>
                    <div className="mx-auto flex items-center gap-x-2">
                        <img src="./icons/night.svg" alt="" />
                        <Typography variant={'label'}>Nights</Typography>
                    </div>
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
                                <div className="mx-auto">
                                    <Checkbox
                                        name={days}
                                        value={shift}
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
                            setSelectedCourses(personalInfoData.courses)
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
