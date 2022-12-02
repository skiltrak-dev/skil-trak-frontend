import { ReactElement, useEffect } from 'react'

import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { Animations } from '@animations'
import {
    AssessmentResultCard,
    Button,
    DisplayPrimaryActions,
    HelpQuestionSet,
    ImportantDocumentCard,
    PendingSignatureCard,
    PlacementProgressCard,
    RecentAppointmentCard,
    RtoContextBarData,
    SidebarCalendar,
} from '@components'
import { useContextBar } from '@hooks'
import { AppointmentCard } from '@components/sections/subAdmin/components/Cards/AppointmentCard'
import { FigureCard } from '@components/sections/subAdmin'

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
        link: 'users/students?tab=all',
        animation: Animations.Student.Appointments.AssessmentTool,
    },
    {
        title: 'Industries',
        description: 'Manage Allocated Industries',
        link: 'users/industries?tab=all',
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
const FigureCardData = [
    {
        count: 0,
        title: 'RTOs',
        imageUrl: '/images/icons/rto.png',
    },
    {
        count: 0,
        title: 'Students',
        imageUrl: '/images/icons/students.png',
    },
    {
        count: 0,
        title: 'Industries',
        imageUrl: '/images/icons/industry.png',
    },
    {
        count: 0,
        title: 'Pending Students',
        imageUrl: '/images/icons/pending-student.png',
    },
]

const SubAdminUsers: NextPageWithLayout = () => {
    const contextBar = useContextBar()
    useEffect(() => {
        contextBar.setContent(
            <>
                <Button variant={'dark'} text={'My Schedule'} />
                <SidebarCalendar />
                <RtoContextBarData />
            </>
        )
        contextBar.show(false)
    }, [])
    return (
        <div className="flex flex-col">
            <div className="flex gap-x-6">
                {/* Primary Actions */}
                <div className="bg-white p-4 rounded-2xl shadow-xl flex-shrink-0">
                    <DisplayPrimaryActions actions={PrimaryLinks} />
                </div>

                {/* Figure Cards */}

                <div className="flex gap-y-2 flex-col w-full">
                    <div className="flex gap-x-2">
                        <FigureCard
                            imageUrl={FigureCardData[0].imageUrl}
                            count={FigureCardData[0].count}
                            title={FigureCardData[0].title}
                        />
                        <FigureCard
                            imageUrl={FigureCardData[1].imageUrl}
                            count={FigureCardData[1].count}
                            title={FigureCardData[1].title}
                        />
                        <FigureCard
                            imageUrl={FigureCardData[2].imageUrl}
                            count={FigureCardData[2].count}
                            title={FigureCardData[2].title}
                        />
                    </div>

                    <AppointmentCard />
                </div>
            </div>

            <div className="mt-6 flex justify-between">
                {/* Related Questions */}
                <HelpQuestionSet
                    title={'What you want to do here?'}
                    questions={RelatedQuestions}
                />

                {/* Other Questions */}
                <HelpQuestionSet
                    title={'What else you want to do?'}
                    questions={OtherQuestions}
                />
            </div>
        </div>
    )
}

SubAdminUsers.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Users' }}>{page}</SubAdminLayout>
    )
}

export default SubAdminUsers
