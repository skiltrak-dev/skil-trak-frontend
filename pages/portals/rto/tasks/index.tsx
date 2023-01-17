import { ReactElement, useEffect } from 'react'
// Layouts
import { RtoLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'
// Animations
import { Animations } from '@animations'
// Components
import {
    DisplayPrimaryActions,
    HelpQuestionSet,
    RecentAppointmentCard,
} from '@components'
// Hooks
import { useContextBar, useJoyRide } from '@hooks'
import { CommonCB } from '@partials/rto/contextBar'
import { useGetRTOAppointmentsQuery, CommonApi } from '@queries'

const PrimaryLinks = [
    {
        title: 'Assessment Tools',
        description: 'View & Manage Your Assessment Tools',
        link: 'tasks/assessment-tools',
        animation: Animations.Student.Appointments.AssessmentEvidence,
        id: 'assessment-tools',
    },
    {
        title: 'Appointments',
        description: 'View & Manage Your Appointments',
        link: 'tasks/appointments',
        animation: Animations.Student.Appointments.AssessmentTool,
        id: 'appointments',
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

    const futureAppointments = CommonApi.Appointments.useBookedAppointments({
        status: 'future',
    })

    //  TASKS JOY RIDE - START
    const joyride = useJoyRide()
    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 1 })
            }, 1200)
        }
    }, [])
    //  TASKS JOY RIDE - END
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
                        appointment={futureAppointments?.data}
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
    return (
        <RtoLayout
            pageTitle={{
                title: 'Tasks',
            }}
        >
            {page}
        </RtoLayout>
    )
}

export default RtoTasks
