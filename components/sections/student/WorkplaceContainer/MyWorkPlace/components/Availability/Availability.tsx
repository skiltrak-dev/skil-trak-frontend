import React from 'react'

// components
import { Typography, Card } from 'components'
import { Button, Checkbox } from 'components'

type AvailabilityProps = {
    setActive: any
}
export const Availability = ({ setActive }: AvailabilityProps) => {
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
                    {[
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                    ].map((days, i) => (
                        <div
                            key={days}
                            className="grid grid-cols-5 gap-4 px-3 bg-secondary rounded-lg py-2"
                        >
                            <div>{days}</div>
                            <div className="mx-auto">
                                <Checkbox name="" />
                            </div>
                            <div className="mx-auto">
                                <Checkbox name="" />
                            </div>
                            <div className="mx-auto">
                                <Checkbox name="" />
                            </div>
                            <div className="mx-auto">
                                <Checkbox name="" />
                            </div>
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
                        onClick={() => {
                            setActive((active: number) => active + 1)
                        }}
                    >
                        Find Industries
                    </Button>
                </div>
            </Card>
        </div>
    )
}
