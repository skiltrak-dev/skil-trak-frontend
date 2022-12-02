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
import {
    useGetPlacementProgressQuery,
    useGetStudentPastAppointmentsQuery,
} from '@queries'

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
    const { data, isLoading, isError, isSuccess } =
        useGetPlacementProgressQuery()
    const {
        data: recentAppointments,
        isLoading: appointmentLoading,
        isSuccess: isSuccessAppointments,
        isError: isErrorAppointments,
    } = useGetStudentPastAppointmentsQuery()
    const recentAppointment =
        recentAppointments && recentAppointments[recentAppointments?.length - 1]
    // console.log("loading", recentAppointment)
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
                        requestStatus={data?.currentStatus}
                        description="Place a request to start"
                        isError={isError}
                        isLoading={isLoading}
                        isSuccess={isSuccess}
                    />
                    <RecentAppointmentCard
                        title={recentAppointment?.type.title}
                        caseOfficer={recentAppointment?.name}
                        time={recentAppointment?.time}
                        date={recentAppointment?.date}
                        address={recentAppointment?.address}
                        isSuccess={isSuccessAppointments}
                        isError={isErrorAppointments}
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
