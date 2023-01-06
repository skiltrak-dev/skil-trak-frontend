import React, { useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/router'

// components
import { Button, BackButton, Card, Typography } from '@components'

// Context
import { useContextBar } from 'hooks'

export const AddScheduleContainer = () => {
    const { setContent } = useContextBar()
    const [selectedSchedule, setSelectedSchedule] = useState('')
    const router = useRouter()

    useEffect(() => {
        setContent(null)
    }, [setContent])

    // const origin = window.location.origin;
    const continueWith = [
        {
            image: '/images/Employee.png',
            text: 'Employee Schedule',
        },
        {
            image: '/images/student.png',
            text: 'Student Scheduled',
        },
    ]
    return (
        <div>
            <BackButton
                link={'/portals/industry/tasks'}
                text={'Back To Dashboard'}
            />

            <Card>
                <Typography variant={'subtitle'}>Continue with</Typography>

                <div className="flex flex-col gap-y-2 md:flex-row  md:gap-x-16 px-6 py-11">
                    {continueWith.map(({ image, text }, index) => (
                        <Fragment key={index}>
                            <div
                                className={`border p-2 flex flex-col items-center cursor-pointer rounded-lg ${
                                    selectedSchedule === text
                                        ? 'border-primary'
                                        : 'border-secondary-dark'
                                }`}
                                onClick={() => setSelectedSchedule(text)}
                            >
                                <img src={`${image}`} alt="Employee" />
                                <Typography variant={'subtitle'}>
                                    {text}
                                </Typography>
                            </div>
                            {index !== continueWith.length - 1 && (
                                <div className="border-r"></div>
                            )}
                        </Fragment>
                    ))}
                </div>

                {/* Action */}
                <Button
                    onClick={() =>
                        router.push(
                            '/portals/industry/tasks/add-a-schedule/schedule?tab=employee-schedule'
                        )
                    }
                    disabled={selectedSchedule !== 'Employee Schedule'}
                >
                    Continue
                </Button>
            </Card>
        </div>
    )
}
