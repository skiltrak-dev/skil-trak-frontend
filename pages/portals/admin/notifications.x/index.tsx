import { ReactElement, useEffect } from 'react'
// Layouts
import { AdminLayout } from '@layouts'
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
import { EmailsCard, RecentAppointment } from '@partials/common'
// Hooks
import { useContextBar, useJoyRide } from '@hooks'

const Notifications: NextPageWithLayout = () => {
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
    // const joyride = useJoyRide()

    // useEffect(() => {
    //     if (joyride.state.tourActive) {
    //         setTimeout(() => {
    //             joyride.setState({ ...joyride.state, run: true, stepIndex: 1 })
    //         }, 1200)
    //     }
    // }, [])

    const PrimaryLinks = [
        {
            title: 'Emails',
            description: 'All Emails',
            link: 'notifications/e-mails?tab=all-mails',
            animation: Animations.Student.Appointments.AssessmentTool,
            // id: 'workplace',
            // badge: {
            //     text: statistics?.data?.workplaceRequest,
            //     loading: statistics.isLoading,
            // },
        },
        // {
        //     title: 'Discussions',
        //     description: 'Discussions',
        //     link: 'notifications/e-mails?tab=all-mails',
        //     animation: Animations.Student.Appointments.AssessmentEvidence,
        //     // id: 'assessment-evidence',
        //     // badge: {
        //     //     text: statistics?.data?.assessmentEvidence,
        //     //     loading: statistics.isLoading,
        //     // },
        // },
        {
            title: 'All Notifications',
            description: 'All Notifications',
            link: 'notifications/all-notifications',
            animation: Animations.Student.Appointments.AssessmentEvidence,
            // id: 'assessment-evidence',
            // badge: {
            //     text: statistics?.data?.assessmentEvidence,
            //     loading: statistics.isLoading,
            // },
        },
    ]

    // WORKPLACE JOY RIDE - END
    return (
        <div className="px-4 mt-4">
            <div className="flex flex-col">
                <div className="flex gap-x-6">
                    {/* Primary Actions */}
                    <div className="bg-white p-4 rounded-2xl shadow-xl flex-shrink-0">
                        <DisplayPrimaryActions actions={PrimaryLinks} />
                    </div>

                    {/* Special Cards */}
                    <div className="w-full flex flex-col justify-center space-y-2">
                        <EmailsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

Notifications.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Notifications
