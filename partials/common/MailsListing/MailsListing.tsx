import { useRouter } from 'next/router'
import { CiMail } from 'react-icons/ci'
import { IoNotificationsOutline } from 'react-icons/io5'
import { TopBar } from './components'
import { ReceiverMailsInbox, SenderMailsInbox, TabNotification } from './tabs'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'

export const MailsListing = () => {
    const router = useRouter()

    const role = getUserCredentials()?.role

    const roleUrl = () => {
        switch (role) {
            case UserRoles.SUBADMIN:
                return '/portals/sub-admin/notifications'
            case UserRoles.INDUSTRY:
                return '/portals/industry/notifications/e-mails'

            default:
                return null
        }
    }

    const mailsTabs = [
        {
            text: 'Inbox',
            Icon: CiMail,
            href: {
                pathname: roleUrl(),
                query: { tab: 'inbox' },
            },
            component: ReceiverMailsInbox,
        },
        {
            text: 'Sent Mails',
            Icon: CiMail,
            href: {
                pathname: roleUrl(),
                query: { tab: 'sent' },
            },
            component: SenderMailsInbox,
        },
        {
            text: 'All Notifications',
            Icon: IoNotificationsOutline,
            href: {
                pathname: roleUrl(),
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
