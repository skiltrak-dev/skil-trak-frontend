import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// animations
import { Animations } from 'assets'

// components
import {
    Card,
    CircularProgresbar,
    DisplayPrimaryActions,
    Typography,
} from 'components'
import { RightSidebarData } from './components'

// Context
import { useContextBar } from 'hooks'
import { AdForRPL } from 'pages/ApplyForRPL'

export const GeneralInfoPrimaryActions = [
    {
        link: 'unit-requirements',
        title: 'Unit Requirements',
        description: 'Some helping text',
        image: null, //"./images/dashboardbtn3.png",
        animation: Animations.GeneralInfo.UnitRequirements,
    },
    {
        link: 'placement-workflow',
        title: 'Placement Workflow',
        description: 'Some helping text',
        image: null, //"./images/dashboardbtn4.png",
        animation: Animations.GeneralInfo.Placement,
    },
    {
        link: 'industry-consultation',
        title: 'Industry Consultation',
        description: 'Some helping text',
        image: null, //"./images/dashboardbtn4.png",
        animation: Animations.GeneralInfo.IndustryConsultation,
    },
    {
        link: 'mou',
        title: 'MoU',
        description: 'Some helping text',
        image: null, //"./images/dashboardbtn4.png",
        animation: Animations.GeneralInfo.Signature,
    },
]

export const GeneralInfromation = () => {
    const navigate = useNavigate()
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
                    {/*  */}
                    <Card px={9} mt={2}>
                        <DisplayPrimaryActions
                            actions={GeneralInfoPrimaryActions}
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
