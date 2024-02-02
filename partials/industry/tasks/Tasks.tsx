import { useEffect } from 'react'

// Components
import {
    Card,
    Typography,
    RedirectUser,
    CircularProgresbar,
    DisplayPrimaryActions,
} from '@components'

// Context
import { useContextBar, useJoyRide } from 'hooks'

// Colors
import { Animations } from '@animations'
import { AdForRPL } from '@components/sections'
import { AuthUtils } from '@utils'

export const TaskPrimaryActions = [
    {
        link: 'required-documents',
        title: 'Documents required for placement',
        description: '',
        animation: Animations.Industry.Dashboard.RequiredDocuments,
        id: 'required-documents',
    },
    {
        link: 'tasks/add-a-schedule',
        title: 'Add Schedule',
        description: '',
        // image: null, //"./images/Schedule.png",
        animation: Animations.Industry.MyTasks.Scheduling,
        id: 'add-schedule',
    },
    {
        link: 'tasks/available-shifts',
        title: 'Available Shifts',
        description: '',
        // image: null, //"./images/dashboardbtn.png",
        animation: Animations.Industry.MyTasks.AvailableShift,
        id: 'available-shifts',
    },
    // {
    //     link: 'tasks/branches',
    //     title: 'Branches',
    //     description: 'branches',
    //     // image: null, //"./images/dashboardbtn.png",
    //     animation: Animations.Industry.MyTasks.AvailableShift,
    //     id: 'branches',
    // },
    // {
    //     link: 'tasks/head-quarters',
    //     title: 'Head Quarters',
    //     description: 'Head Quarters',
    //     // image: null, //"./images/dashboardbtn.png",
    //     animation: Animations.Industry.MyTasks.AvailableShift,
    //     id: 'head-quarters',
    // },
]

export const TasksContainer = () => {
    const { setContent } = useContextBar()

    const status = AuthUtils.getUserCredentials()?.status
    // useEffect(() => {
    //     if (token && status !== 'approved') {
    //         router?.push('/portals/industry')
    //     }
    // }, [router, token])

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
            <div className="w-full flex md:flex-row flex-col gap-y-4 justify-between">
                <div className="md:w-[59%] w-full">
                    <Typography variant={'title'}>Get Started</Typography>
                    {/*  */}
                    <Card>
                        <DisplayPrimaryActions actions={TaskPrimaryActions} />
                    </Card>
                </div>
                <div className="md:w-[36%] w-full">
                    <div className="w-full flex justify-between">
                        <Typography variant={'title'}>
                            Total Students
                        </Typography>
                        <Typography variant={'small'} color={'textLink'}>
                            View All
                        </Typography>
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
                <div>
                    <Card>
                        <AdForRPL />
                    </Card>
                </div>
            </div>
        </div>
    )
}
