import { useEffect } from 'react'

import {
    Card,
    Typography,
    DisplayPrimaryActions,
    CircularProgresbar,
} from '@components'

import { useContextBar, useJoyRide } from '@hooks'

import { Animations } from '@animations'
import { AdForRPL } from '@components/sections'
import Link from 'next/link'

export const JobsPrimaryActions = [
    {
        link: 'jobs/advertised-jobs',
        title: 'Advertise A Job',
        description: ' ',
        animation: Animations.Industry.Jobs.Advertise,
        id: 'advertise-a-job',
    },
    // {
    //     link: 'jobs/browse-candidates',
    //     title: 'Browse For Candidates',
    //     description: ' ',
    //     animation: Animations.Industry.Jobs.BrowseCandidate,
    //     id: 'browse-for-candidates',
    // },
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
                        <Link
                            href={
                                '/portals/industry/students/current-students?tab=pending'
                            }
                        >
                            View All
                        </Link>
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
