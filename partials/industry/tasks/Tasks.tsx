import { useEffect } from 'react'

// Components
import {
    Card,
    CircularProgresbar,
    Typography,
    DisplayPrimaryActions,
} from '@components'

// Context
import { useContextBar } from 'hooks'

// Colors
import { Animations } from '@animations'
import { AdForRPL } from '@components/sections'

export const TaskPrimaryActions = [
    {
        link: 'required-documents',
        title: 'Documentation Required',
        description: 'Some helping text',
        animation: Animations.Industry.Dashboard.RequiredDocuments,
    },
    {
        link: 'tasks/add-a-schedule',
        title: 'Add Schedule',
        description: 'Some helping text',
        // image: null, //"./images/Schedule.png",
        animation: Animations.Industry.MyTasks.Scheduling,
    },
    {
        link: 'tasks/add-a-schedule',
        title: 'Available Shifts',
        description: 'Some helping text',
        // image: null, //"./images/dashboardbtn.png",
        animation: Animations.Industry.MyTasks.AvailableShift,
    },
]

export const TasksContainer = () => {
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
                    <Card>
                        <DisplayPrimaryActions actions={TaskPrimaryActions} />
                    </Card>
                </div>
                <div className="w-[36%]">
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
                <Card>
                    <AdForRPL />
                </Card>
            </div>
        </div>
    )
}
