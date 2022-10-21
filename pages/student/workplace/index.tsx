import { ReactElement, useEffect } from 'react'

import { Animations } from '@animations'
import {
    DisplayPrimaryActions,
    HelpQuestionSet,
    RecentAppointmentCard,
    Button,
    SidebarCalendar,
} from '@components'
import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { PlacementProgressCard } from '@components/specialCards/PlacementProgress'
import { useContextBar } from 'hooks'

const PrimaryLinks = [
    {
        title: 'My Workplace',
        description: 'Track Progress or File a request',
        link: 'workplace/my-workplace',
        animation: Animations.Student.Workplace.MyWorkplace,
    },
    {
        title: 'Appointments',
        description: 'View or Book Appointments',
        link: 'workplace/appointments',
        animation: Animations.Student.Workplace.Appointments,
    },
    {
        title: 'Jobs',
        description: 'Track Progress Or File a request',
        link: 'workplace/jobs',
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

const StudentWorkplace: NextPageWithLayout = () => {
    const { setContent } = useContextBar()
    useEffect(() => {
        setContent(
            <>
                <Button variant={'dark'} text={'My Schedule'} />
                <SidebarCalendar />
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
                <div className="w-full flex flex-col space-y-2">
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

StudentWorkplace.getLayout = (page: ReactElement) => {
    return <StudentLayout title="Workplace">{page}</StudentLayout>
}

export default StudentWorkplace
