import { useRouter } from 'next/router'
import { CiMail } from 'react-icons/ci'
import { IoNotificationsOutline } from 'react-icons/io5'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'
import { TopBar } from '@partials/common/MailsListing/components'
import {
    ReceiverMailsInbox,
    SenderMailsInbox,
    TabNotification,
} from '@partials/common/MailsListing'

export const MailsListing = () => {
    const router = useRouter()

    const role = getUserCredentials()?.role

    const roleUrl = () => {
        switch (role) {
            case UserRoles.SUBADMIN:
                return '/portals/sub-admin/notifications'
            case UserRoles.INDUSTRY:
                return '/portals/industry/notifications/e-mails'
            case UserRoles.STUDENT:
                return '/portals/student/mails'
            // case UserRoles.RTO:

            default:
                return null
        }
    }

    const mailsTabs = [
        {
            text: 'All',
            Icon: CiMail,
            href: {
                pathname: roleUrl(),
                query: { tab: 'all' },
            },
            component: ReceiverMailsInbox,
        },
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
    ]

    const getActiveTab = (tab: string) => tab === router?.query?.tab

    const Component = mailsTabs?.find((tab) =>
        getActiveTab(tab?.href?.query?.tab)
    )?.component

    const DefaultComponent = mailsTabs?.[0]?.component
    return (
        <div className="mb-6">
            <TopBar mailsTabs={mailsTabs} />

            {/* Component */}
            {Component ? <Component /> : <DefaultComponent />}
        </div>
    )
}
