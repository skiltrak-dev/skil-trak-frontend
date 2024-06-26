import { Button, Typography } from '@components'
import { useRouter } from 'next/router'
import React from 'react'
import { CiMail } from 'react-icons/ci'
import { IoNotificationsOutline } from 'react-icons/io5'
import { MailsInbox, TabNotification } from './tabs'
import { TopBar } from './components'

export const MailsListing = () => {
    const router = useRouter()

    const mailsTabs = [
        {
            text: 'Inbox',
            Icon: CiMail,
            href: {
                pathname: '/portals/sub-admin/notifications/e-mails',
                query: { tab: 'inbox' },
            },
            component: MailsInbox,
        },
        {
            text: 'All Notifications',
            Icon: IoNotificationsOutline,
            href: {
                pathname: '/portals/sub-admin/notifications/e-mails',
                query: { tab: 'notification' },
            },
            component: TabNotification,
        },
    ]

    const getActiveTab = (tab: string) => tab === router?.query?.tab

    const Component = mailsTabs?.find((tab) =>
        getActiveTab(tab?.href?.query?.tab)
    )?.component

    const DefaultComponent = mailsTabs?.[0]?.component
    return (
        <div>
            <TopBar mailsTabs={mailsTabs} />

            {/* Component */}
            {Component ? <Component /> : <DefaultComponent />}
        </div>
    )
}
