import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

// images
import { Animations } from '@animations'

// components
import {
    Card,
    Typography,
    CircularProgresbar,
    DisplayPrimaryActions,
} from '@components'
import { AdForRPL } from '@components/sections'

// hooks
import { useContextBar, useJoyRide } from '@hooks'

export const StudentsPrimaryActions = [
    {
        link: 'students/current-students',
        title: 'Current Students',
        description: ' ',
        // image: null, //"./images/dashboardbtn3.png",
        animation: Animations.Industry.Students.CurrentStudents,
        id: 'current-students',
    },
    // {
    //     link: 'students/future-candidates',
    //     title: 'Future Candidates',
    //     description: ' ',
    //     // image: null, //"./images/dashboardbtn4.png",
    //     animation: Animations.Industry.Students.FutureCandidates,
    //     id: 'future-candidates',
    // },
    // {
    //     link: 'students/request-a-volunteer',
    //     title: 'Request a Volunteer',
    //     description: ' ',
    //     // image: null, //"./images/dashboardbtn4.png",
    //     animation: Animations.Industry.Jobs.BrowseCandidate,
    //     id: 'request-a-volunteer',
    // },
    {
        link: 'students/appointments',
        title: 'Appointments',
        description: ' ',
        // image: null, //"./images/dashboardbtn4.png",
        animation: Animations.Industry.Students.Appointment,
        id: 'appointments',
    },
]

export const StudentsContainer = () => {
    const router = useRouter()
    const { setContent } = useContextBar()

    useEffect(() => {
        setContent(null)
    }, [setContent])

    // ADD STUDENT JOY RIDE - START
    const joyride = useJoyRide()
    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 1 })
            }, 1200)
        }
    }, [])
    // ADD STUDENT JOY RIDE - END

    return (
        <div>
            {/* Links */}
            <div className="w-full flex flex-col md:flex-row gap-y-4 md:justify-between">
                <div className="md:w-[59%] w-full ">
                    <Typography variant={'title'}>Get Started</Typography>
                    {/*  */}
                    <Card>
                        <DisplayPrimaryActions
                            actions={StudentsPrimaryActions}
                        />
                    </Card>
                </div>
                <div className="md:w-[36%] w-full">
                    <div className="w-full flex justify-between">
                        <Typography variant={'title'}>
                            Total Students
                        </Typography>
                        {/* <Typography variant={'small'} color={'text-info'}>
                            View All
                        </Typography> */}
                    </div>

                    {/*  */}
                    <Card>
                        <div className="flex flex-col gap-y-2">
                            <CircularProgresbar />
                        </div>
                    </Card>
                </div>
            </div>

            {/* Others */}
            <div className="w-full mt-8">
                <Typography variant={'title'}>Others</Typography>

                {/*  */}
                <Card>
                    <AdForRPL />
                </Card>
            </div>
        </div>
    )
}
