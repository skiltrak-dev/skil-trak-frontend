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
import { CommonCB } from '@partials/rto/contextBar'
import { useGetRTOAppointmentsQuery } from '@queries'

const PrimaryLinks = [
    {
        title: 'Assessment Tools',
        description: 'View & Manage Your Assessment Tools',
        link: 'tasks/assessment-tools',
        animation: Animations.Student.Appointments.AssessmentEvidence,
    },
    {
        title: 'Appointments',
        description: 'View & Manage Your Appointments',
        link: 'tasks/appointments',
        animation: Animations.Student.Appointments.AssessmentTool,
    },
    // {
    //     title: 'E-Signs',
    //     description: 'View & Sign Your Digital Documents',
    //     link: 'tasks/e-signs',
    //     animation: Animations.Student.Appointments.Esign,
    // },
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
    const contextBar = useContextBar()
    const { data, isSuccess, isError } = useGetRTOAppointmentsQuery({ status: 'future' })
    const rtoRecentAppointment = data[data?.length - 1]
    console.log("rtoRecentAppointments", rtoRecentAppointment)
    useEffect(() => {
        contextBar.setContent(<CommonCB />)
        contextBar.show(false)
    }, [])

    return (
        <div className="flex flex-col">
            <div className="flex gap-x-6">
                {/* Primary Actions */}
                <div className="w-2/5 bg-white p-4 rounded-2xl shadow-xl flex-shrink-0">
                    <DisplayPrimaryActions actions={PrimaryLinks} />
                </div>

                {/* Special Cards */}
                <div className="w-3/5 flex flex-col justify-center space-y-2">
                    <RecentAppointmentCard
                        appointment={data}
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
