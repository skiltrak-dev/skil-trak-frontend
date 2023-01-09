import { useEffect } from 'react'

import {
    Card,
    Typography,
    DisplayPrimaryActions,
    CircularProgresbar,
} from '@components'

import { useContextBar } from 'hooks'

import { Animations } from '@animations'
import { AdForRPL } from '@components/sections'

export const JobsPrimaryActions = [
    {
        link: 'jobs/advertised-jobs',
        title: 'Advertise A Job',
        description: 'Some helping text',
        animation: Animations.Industry.Jobs.Advertise,
    },
    {
        link: 'jobs/browse-candidates',
        title: 'Browse For Candidates',
        description: 'Some helping text',
        animation: Animations.Industry.Jobs.BrowseCandidate,
    },
]
export const JobsContainer = () => {
    const { setContent } = useContextBar()

    // useEffect(() => {
    //   setContent(
    //     <>
    //       <RightSidebarData />
    //     </>
    //   )
    // }, [setContent])

    return (
        <div>
            {/* Links */}
            <div className="w-full flex flex-col gap-2 md:flex-row md:justify-between">
                <div className="md:w-[59%] w-full ">
                    <Typography variant={'title'}>Get Started</Typography>
                    <Card>
                        <DisplayPrimaryActions actions={JobsPrimaryActions} />
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
                <Card>
                    <AdForRPL />
                </Card>
            </div>
        </div>
    )
}
