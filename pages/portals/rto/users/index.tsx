import { ReactElement, useEffect } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { Animations } from '@animations'
import {
    AssessmentResultCard,
    Button,
    DisplayPrimaryActions,
    HelpQuestionSet,
    ImportantDocument,
    PendingSignatureCard,
    PlacementProgressCard,
    RecentAppointmentCard,
    RtoContextBarData,
    SidebarCalendar,
} from '@components'
import { useContextBar } from '@hooks'
import { CommonCB } from '@partials/rto/contextBar'
import { FigureCard } from '@components/sections'

const PrimaryLinks = [
    {
        title: 'Students',
        description: 'View & Manage Your Students',
        link: 'users/students',
        animation: Animations.Student.Workplace.Student,
    },
    {
        title: 'Admins',
        description: 'View & Manage Your Admins',
        link: 'users/contact-person',
        animation: Animations.Student.Appointments.AssessmentTool,
    },
    {
        title: 'Coordinators',
        description: 'View & Manage Your Coordinators',
        link: 'users/coordinators',
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

const RtoUsers: NextPageWithLayout = () => {
    const contextBar = useContextBar()

    useEffect(() => {
        contextBar.setContent(<CommonCB />)
        contextBar.show(false)
    }, [])

    return (
        <div className="flex flex-col">
            <div className="flex gap-x-6">
                {/* Primary Actions */}
                <div className="bg-white p-4 rounded-2xl shadow-xl flex-shrink-0 w-2/5">
                    <DisplayPrimaryActions actions={PrimaryLinks} />
                </div>

                {/* Special Cards */}
                <div className="w-3/5 flex flex-col justify-center space-y-2">
                    {/* Figure Cards */}
                    <div className="flex flex-col gap-y-4">
                        <div className="flex gap-x-4">
                            <FigureCard
                                imageUrl="/images/icons/students.png"
                                count={0}
                                title={'Current Students'}
                            />
                            <FigureCard
                                imageUrl="/images/icons/pending-student.png"
                                count={0}
                                title={'Pending Students'}
                            />
                        </div>
                    </div>
                    
                    <RecentAppointmentCard
                        title="Work Place Visit"
                        caseOfficer="John Smith Khan"
                        time="09:00 am - 11:00 am"
                        date="Monday, 17 Oct,2022"
                        address="221B Baker Street, Melbourne, VIC 3000"
                    />
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

RtoUsers.getLayout = (page: ReactElement) => {
    return <RtoLayout title="Users">{page}</RtoLayout>
}

export default RtoUsers
