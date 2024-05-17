import React, { useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/router'

// components
import { Button, BackButton, Card, Typography, RedirectUser } from '@components'

// Context
import { useContextBar, useJoyRide } from '@hooks'
import Image from 'next/image'
import studentImage from '../../../public/images/portal-icons/students.png'

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
            image: '/images/portal-icons/Employee.png',
            text: 'Employee Schedule',
        },
        // {
        //     image: '/images/portal-icons/students.png',
        //     text: 'We are currently developing this functionality. Thank you for your patience! Stay tuned for updates.',
        // },
    ]
    // ADD STUDENT JOY RIDE - START
    const joyride = useJoyRide()
    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 2 })
            }, 1200)
        }
    }, [])
    // ADD STUDENT JOY RIDE - END
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
                                id="add-employee-schedule"
                                className={`border p-2 flex flex-col items-center cursor-pointer rounded-lg ${
                                    selectedSchedule === text
                                        ? 'border-primary'
                                        : 'border-secondary-dark'
                                }`}
                                onClick={() => setSelectedSchedule(text)}
                            >
                                <img
                                    className="w-32 h-32"
                                    src={`${image}`}
                                    alt="Employee"
                                />
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
