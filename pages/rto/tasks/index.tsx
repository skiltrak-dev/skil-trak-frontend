import { ReactElement, useEffect } from 'react'
// Layouts
import { RtoLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'
// Animations
import { Animations } from '@animations'
// Components
import {
    AssessmentResultCard,
    Button,
    DisplayPrimaryActions,
    HelpQuestionSet,
    PendingSignatureCard,
    PlacementProgressCard,
    RecentAppointmentCard,
    RtoContextBarData,
    SidebarCalendar,
} from '@components'
// Hooks
import { useContextBar } from '@hooks'

const PrimaryLinks = [
    {
        title: 'Assessment Tools',
        description: 'Some helping text',
        link: 'tasks/assessment-tools',
        animation: Animations.Student.Appointments.AssessmentEvidence,
    },
    {
        title: 'Appointments',
        description: 'Appointments',
        link: 'tasks/appointments',
        animation: Animations.Student.Appointments.AssessmentTool,
    },
    {
        title: 'E-Signs',
        description: 'E-signs',
        link: 'tasks/e-signs',
        animation: Animations.Student.Appointments.Esign,
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

const RtoTasks: NextPageWithLayout = () => {
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
                    <PlacementProgressCard
                        requestStatus="Not Requested"
                        description="Place a request to start"
                    />
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

RtoTasks.getLayout = (page: ReactElement) => {
    return <RtoLayout title="Tasks">{page}</RtoLayout>
}

export default RtoTasks
