import { ReactElement, useEffect } from 'react'
// Layouts
import { SubAdminLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'
// Animations
import { Animations } from '@animations'
// Components
import {
    Button,
    DisplayPrimaryActions,
    HelpQuestionSet,
    RtoContextBarData,
    SidebarCalendar,
} from '@components'
import { RecentAppointment } from '@partials/common'
// Hooks
import { useContextBar, useJoyRide } from '@hooks'

// query
import { SubAdminApi } from '@queries'

// query

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
    const statistics = SubAdminApi.Count.statistics()
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

    const PrimaryLinks = [
        {
            title: 'Workplace Requests',
            description: 'Student Workplace',
            link: 'tasks/workplace?tab=all',
            animation: Animations.Student.Appointments.AssessmentTool,
            id: 'workplace',
            badge: {
                text: statistics?.data?.workplaceRequest,
                loading: statistics.isLoading,
            },
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
            link: 'tasks/assessment-evidence?tab=pending',
            animation: Animations.Student.Appointments.AssessmentEvidence,
            id: 'assessment-evidence',
            badge: {
                text: statistics?.data?.assessmentEvidence,
                loading: statistics.isLoading,
            },
        },
        {
            title: 'My Student Report',
            description: 'My Student Report',
            link: 'tasks/my-students-report',
            animation: Animations.Student.Appointments.AssessmentEvidence,
            id: 'my-student-report',
        },
    ]

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
                    <RecentAppointment
                        link={'/portals/sub-admin/tasks/appointments'}
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

SubAdminTasks.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Tasks' }}>{page}</SubAdminLayout>
    )
}

export default SubAdminTasks
