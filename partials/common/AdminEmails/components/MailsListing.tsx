import { UserRoles } from '@constants'
import {
    ReceiverMailsInbox,
    SenderMailsInbox,
} from '@partials/common/MailsListing'
import { TopBar } from '@partials/common/MailsListing/components'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { CiMail } from 'react-icons/ci'

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
