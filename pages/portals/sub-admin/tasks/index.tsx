import { ReactElement, useEffect } from 'react'
// Layouts
import { SubAdminLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'
// Animations
import { Animations } from '@animations'
// Components
import { DisplayPrimaryActions } from '@components'
import { RecentAppointment } from '@partials/common'
// Hooks
import { useJoyRide } from '@hooks'

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
    const statistics = SubAdminApi.Count.statistics()

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
            link: 'tasks/workplace?tab=all&subTab=case-officer-not-assigned',
            animation: Animations.Student.Appointments.Workplace,
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
            animation: Animations.Student.Appointments.AppointmentsSec,
            id: 'appointments',
        },
        {
            title: 'Assessment Submissions',
            description: ' ',
            link: 'tasks/assessment-evidence?tab=pending',
            animation: Animations.Student.Appointments.Submissions,
            id: 'assessment-evidence',
            badge: {
                text: statistics?.data?.assessmentEvidence,
                loading: statistics.isLoading,
            },
        },
        // {
        //     title: 'My Student Report',
        //     description: 'My Student Report',
        //     link: 'tasks/my-students-report',
        //     animation: Animations.Student.Appointments.MyStudentsReport,
        //     id: 'my-student-report',
        // },
    ]

    // WORKPLACE JOY RIDE - END
    return (
        <div className="flex flex-col">
            <div className="flex items-start gap-x-6">
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
        </div>
    )
}

SubAdminTasks.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Tasks' }}>{page}</SubAdminLayout>
    )
}

export default SubAdminTasks
