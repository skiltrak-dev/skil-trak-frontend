import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// images
import { Animations } from 'assets'

// components
import {
    Card,
    Typography,
    CircularProgresbar,
    DisplayPrimaryActions,
} from 'components'
import { AdForRPL } from 'pages/ApplyForRPL'

// hooks
import { useContextBar } from 'hooks'

export const StudentsPrimaryActions = [
    {
        link: 'student-list',
        title: 'Current Students',
        description: 'Some helping text',
        image: null, //"./images/dashboardbtn3.png",
        animation: Animations.Students.CurrentStudents,
    },
    {
        link: 'student-list',
        title: 'Future Candidates',
        description: 'Some helping text',
        image: null, //"./images/dashboardbtn4.png",
        animation: Animations.Students.FutureCandidates,
    },
    {
        link: 'request-a-volunteer',
        title: 'Request a Volunteer',
        description: 'Some helping text',
        image: null, //"./images/dashboardbtn4.png",
        animation: Animations.Jobs.BrowseCandidate,
    },
    {
        link: 'appointments',
        title: 'Appointments',
        description: 'Some helping text',
        image: null, //"./images/dashboardbtn4.png",
        animation: Animations.Students.Appointment,
    },
]

export const Students = () => {
    const navigate = useNavigate()
    const { setContent } = useContextBar()

    useEffect(() => {
        setContent(null)
    }, [setContent])

    return (
        <div>
            {/* Links */}
            <div className="w-full flex justify-between">
                <div className="w-[59%] ">
                    <Typography variant={'title'}>Get Started</Typography>
                    {/*  */}
                    <Card px={9} mt={2}>
                        <DisplayPrimaryActions
                            actions={StudentsPrimaryActions}
                        />
                    </Card>
                </div>
                <div className="w-[36%]">
                    <div className="w-full flex justify-between">
                        <Typography variant={'title'}>
                            Total Students
                        </Typography>
                        <Typography variant={'links'} color={'textLink'}>
                            View All
                        </Typography>
                    </div>

                    {/*  */}
                    <Card px={9} mt={2}>
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
                <Card mt={2} px={9}>
                    <AdForRPL />
                </Card>
            </div>
        </div>
    )
}
