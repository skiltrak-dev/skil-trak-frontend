import { ReactElement, useEffect } from 'react'
// Layouts
import { SubAdminLayout } from '@layouts'
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
import { useContextBar, useJoyRide } from '@hooks'

const PrimaryLinks = [
    {
        title: 'Workplace Requests',
        description: 'Student Workplace',
        link: 'tasks/workplace?tab=all',
        animation: Animations.Student.Appointments.AssessmentTool,
        id: 'workplace',
    },
    {
        title: 'Appointments',
        description: 'Appointments',
        link: 'tasks/appointments',
        animation: Animations.Student.Appointments.AssessmentTool,
        id: 'appointments',
    },
    {
        title: 'Assessment Submissions',
        description: 'Some helping text',
        link: 'tasks/assessment-evidence',
        animation: Animations.Student.Appointments.AssessmentEvidence,
        id: 'assessment-evidence',
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

const SubAdminTasks: NextPageWithLayout = () => {
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

    // WORKPLACE JOY RIDE - Start
    const joyride = useJoyRide()

    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 1 })
            }, 1200)
        }
    }, [])
    // WORKPLACE JOY RIDE - END
    return (
        <div className="flex flex-col">
            <div className="flex gap-x-6">
                {/* Primary Actions */}
                <div className="bg-white p-4 rounded-2xl shadow-xl flex-shrink-0">
                    <DisplayPrimaryActions actions={PrimaryLinks} />
                </div>

                {/* Special Cards */}
                <div className="w-full flex flex-col justify-center space-y-2">
                    {/* <PlacementProgressCard
                        placementProgress={'Query'}
                    /> */}
                    <RecentAppointmentCard appointment={'Query'} />
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

SubAdminTasks.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Tasks' }}>{page}</SubAdminLayout>
    )
}

export default SubAdminTasks
