import { ReactElement, useEffect } from 'react'

import { Animations } from '@animations'
import {
    Button,
    DisplayPrimaryActions,
    HelpQuestionSet,
    PlacementProgressCard,
    RtoContextBarData,
    SidebarCalendar,
} from '@components'
import { SubAdminLayout } from '@layouts'
import { RecentAppointment } from '@partials/common'
import { NextPageWithLayout } from '@types'

import { useContextBar } from '@hooks'

const PrimaryLinks = [
    {
        title: 'RTOs',
        description: 'Manage Allocated RTOs',
        link: 'users/rtos',
        animation: Animations.Student.Workplace.Student,
    },
    {
        title: 'Students',
        description: 'Manage Allocated Students',
        link: 'users/students',
        animation: Animations.Student.Appointments.AssessmentTool,
    },
    {
        title: 'Industries',
        description: 'Manage Allocated Industries',
        link: 'users/industries',
        animation: Animations.Student.Workplace.Jobs,
    },
]

const RelatedQuestions = [
    {
        text: `I have a workplace. What next?`,
        link: '#',
    },
    {
        text: `I don't have a workplace. What should I do?`,
        link: '#',
    },
    {
        text: `I want to book an appointment`,
        link: '#',
    },
    {
        text: `I want to look for a job`,
        link: '#',
    },
]

const OtherQuestions = [
    {
        text: `I have a workplace. What next?`,
        link: '#',
    },
    {
        text: `I don't have a workplace. What should I do?`,
        link: '#',
    },
    {
        text: `I want to book an appointment`,
        link: '#',
    },
    {
        text: `I want to look for a job`,
        link: '#',
    },
]

const SubAdminESignature: NextPageWithLayout = () => {
    const { setContent } = useContextBar()
    useEffect(() => {
        setContent(
            <>
                <Button variant={'dark'} text={'My Schedule'} />
                <SidebarCalendar />
                <RtoContextBarData />
            </>
        )
    }, [setContent])
    return (
        <div className="flex flex-col">
            <div className="flex gap-x-6">
                {/* Primary Actions */}
                <div className="bg-white p-4 rounded-2xl shadow-xl flex-shrink-0">
                    <DisplayPrimaryActions actions={PrimaryLinks} />
                </div>

                {/* Special Cards */}
                <div className="w-full flex flex-col justify-center space-y-2">
                    <PlacementProgressCard placementProgress={'Query'} />
                    <RecentAppointment
                        link={'/portals/student/workplace/appointments'}
                    />
                </div>
            </div>

            {/* <div className="mt-6 flex justify-between">
            
                <HelpQuestionSet
                    title={'What you want to do here?'}
                    questions={RelatedQuestions}
                />

                
                <HelpQuestionSet
                    title={'What else you want to do?'}
                    questions={OtherQuestions}
                />
            </div> */}
        </div>
    )
}

SubAdminESignature.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout
            pageTitle={{
                title: 'E-Signature',
                backTitle: 'Go back',
                navigateBack: true,
            }}
        >
            {page}
        </SubAdminLayout>
    )
}

export default SubAdminESignature
