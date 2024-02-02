import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

// animations
import { Animations } from '@animations'

// components
import {
    Card,
    CircularProgresbar,
    DisplayPrimaryActions,
    Typography,
} from '@components'

// Context
import { useContextBar } from 'hooks'
import { AdForRPL } from '@components/sections'

export const GeneralInfoPrimaryActions = [
    // {
    //     link: 'general-information/unit-requirements',
    //     title: 'Unit Requirements',
    //     description: ' ',
    //     // image: null, //"./images/dashboardbtn3.png",
    //     animation: Animations.Industry.GeneralInfo.UnitRequirements,
    // },
    // {
    //     link: 'general-information/placement-workflow',
    //     title: 'Placement Workflow',
    //     description: ' ',
    //     // image: null, //"./images/dashboardbtn4.png",
    //     animation: Animations.Industry.GeneralInfo.Placement,
    // },
    {
        link: 'general-information/industry-consultation',
        title: 'Industry Consultation',
        description: ' ',
        // image: null, //"./images/dashboardbtn4.png",
        animation: Animations.Industry.GeneralInfo.IndustryConsultation,
    },
    {
        link: 'general-information/mou',
        title: 'MoU',
        description: ' ',
        // image: null, //"./images/dashboardbtn4.png",
        animation: Animations.Industry.GeneralInfo.Signature,
    },
]

export const GeneralInformationContainer = () => {
    const router = useRouter()
    const { setContent } = useContextBar()

    return (
        <div>
            {/* Links */}
            <div className="w-full flex flex-col gap-y-2 md:flex-row md:justify-between">
                <div className="md:w-[59%] w-full ">
                    <Typography variant={'title'}>Get Started</Typography>
                    {/*  */}
                    <Card>
                        <DisplayPrimaryActions
                            actions={GeneralInfoPrimaryActions}
                        />
                    </Card>
                </div>
                <div className="md:w-[36%] w-full">
                    <div className="w-full flex justify-between">
                        <Typography variant={'title'}>
                            Total Students
                        </Typography>
                        <Typography variant={'small'} color={'text-info'}>
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
