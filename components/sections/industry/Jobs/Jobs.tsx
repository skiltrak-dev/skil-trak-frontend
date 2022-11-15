import { useEffect } from 'react'

import {
    Card,
    CircularProgresbar,
    Typography,
    DisplayPrimaryActions,
} from 'components'
import { RightSidebarData } from './components'

import { useContextBar } from 'hooks'

import { Animations } from 'assets'

import { AdForRPL } from 'pages/Dashboard'

export const JobsPrimaryActions = [
    {
        link: 'advertised-jobs',
        title: 'Advertise A Job',
        description: 'Some helping text',
        image: null, //"./images/dashboardbtn3.png",
        animation: Animations.Jobs.Advertise,
    },
    {
        link: 'browse-candidates',
        title: 'Browse For Candidates',
        description: 'Some helping text',
        image: null, //"./images/dashboardbtn4.png",
        animation: Animations.Jobs.BrowseCandidate,
    },
]
export const Jobs = () => {
    const { setContent } = useContextBar()

    useEffect(() => {
        setContent(
            <>
                <RightSidebarData />
            </>
        )
    }, [setContent])

    return (
        <div>
            {/* Links */}
            <div className="w-full flex justify-between">
                <div className="w-[59%] ">
                    <Typography variant={'title'}>Get Started</Typography>
                    <Card px={9} mt={2}>
                        <DisplayPrimaryActions actions={JobsPrimaryActions} />
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
