import { ReactElement, useEffect } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { Animations } from '@animations'
import { DisplayPrimaryActions, HelpQuestionSet } from '@components'
import { RecentEmailCard } from '@components/specialCards/RecentEmails'
import { useContextBar } from '@hooks'
import { CommonCB } from '@partials/rto/contextBar'

const PrimaryLinks = [
    {
        title: 'E-mails',
        description: 'Track Progress or File a request',
        link: '#',
        animation: Animations.Student.Notifications.Emails,
    },
    {
        title: 'Discussions',
        description: 'View or Book Appointments',
        link: '#',
        animation: Animations.Student.Notifications.Discussion,
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

const DummyEmails = [
    {
        subject: 'Attention Needed',
        sender: 'Skiltrak Coordinator',
        body: 'You need to upgrade your account as it is being blocked and we dont want you get blocked just due to non-payment but it will be good to go if you dont want to pay',
        dated: 'Fri 14, Oct 11:00am',
    },
    {
        subject: 'Placement Started',
        sender: 'Skiltrak Admin',
        body: 'You need to upgrade your account as it is being blocked',
        dated: 'Fri 14, Oct 11:00am',
    },
    {
        subject: 'Placement Ended',
        sender: 'John Smith',
        body: 'You need to upgrade your account as it is being blocked',
        dated: 'Fri 14, Oct 11:00am',
    },
]

const Notifications: NextPageWithLayout = () => {
    const contextBar = useContextBar()

    useEffect(() => {
        contextBar.setContent(<CommonCB />)
        contextBar.show(false)
        return () => {
            contextBar.setContent(null)
            contextBar.hide()
        }
    }, [])

    return (
        <div className="flex flex-col">
            <div className="flex gap-x-6">
                {/* Primary Actions */}
                <div className="bg-white p-4 rounded-2xl shadow-xl flex-shrink-0">
                    <DisplayPrimaryActions actions={PrimaryLinks} />
                </div>

                {/* Special Cards */}
                <div className="w-full flex flex-col space-y-2">
                    <RecentEmailCard emails={DummyEmails} />
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

Notifications.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout
            pageTitle={{
                title: 'Notifications',
            }}
        >
            {page}
        </RtoLayout>
    )
}

export default Notifications
