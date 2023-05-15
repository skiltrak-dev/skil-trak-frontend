import { ReactElement, useEffect } from 'react'

import { Animations } from '@animations'
import { DisplayPrimaryActions } from '@components'
import { PlacementProgressCard } from '@components/specialCards/PlacementProgress'
import { StudentLayout } from '@layouts'
import { RecentAppointment } from '@partials/common'
import {
    useGetPlacementProgressQuery,
    useGetStudentPastAppointmentsQuery,
} from '@queries'
import { NextPageWithLayout } from '@types'
import { useJoyRide } from 'hooks'

const PrimaryLinks = [
    {
        title: 'My Workplace',
        description: 'Track Progress or File a request',
        link: 'workplace/my-workplace',
        animation: Animations.Student.Workplace.MyWorkplace,
        id: 'my-workplace',
    },
    {
        title: 'Appointments',
        description: 'View or Book Appointments',
        link: 'workplace/appointments',
        animation: Animations.Student.Workplace.Appointments,
        id: 'appointments',
    },
    {
        title: 'Jobs',
        description: 'Find a job here',
        link: 'workplace/jobs',
        animation: Animations.Student.Workplace.Jobs,
        id: 'jobs',
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

const StudentWorkplace: NextPageWithLayout = () => {
    const { data: getPlacementProgress } = useGetPlacementProgressQuery()
    const { data: recentAppointments } = useGetStudentPastAppointmentsQuery()

    // WORKPLACE JOY RIDE - start
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
            <div className="flex flex-col md:flex-row gap-y-2 gap-x-6">
                {/* Primary Actions */}
                <div className="bg-white p-4 rounded-2xl shadow-xl flex-shrink-0">
                    <DisplayPrimaryActions actions={PrimaryLinks} />
                </div>

                {/* Special Cards */}
                <div className="w-full flex flex-col space-y-2">
                    <PlacementProgressCard
                        placementProgress={getPlacementProgress}
                    />
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

StudentWorkplace.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout pageTitle={{ title: 'Workplace' }}>{page}</StudentLayout>
    )
}

export default StudentWorkplace
