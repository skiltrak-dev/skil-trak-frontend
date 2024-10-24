import { ReactElement, useEffect } from 'react'
// Layouts
import { StudentLayout } from '@layouts'
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
import { MailsListing } from '@partials/common/MailsListing'

const Mails: NextPageWithLayout = () => {
    // const { setContent } = useContextBar()

    // useEffect(() => {
    //     setContent(
    //         <>
    //             <Button variant={'dark'} text={'My Schedule'} />
    //             <SidebarCalendar />
    //             <RtoContextBarData />
    //         </>
    //     )
    // }, [setContent])

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
    return <MailsListing />
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
                    <EmailsCard />
                </div>
            </div>
        </div>
    )
}

Mails.getLayout = (page: ReactElement) => {
    return <StudentLayout pageTitle={{ title: 'Mails' }}>{page}</StudentLayout>
}

export default Mails
