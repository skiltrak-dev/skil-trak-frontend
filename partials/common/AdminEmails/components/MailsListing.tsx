import { AuthorizedUserComponent } from '@components'
import { UserRoles } from '@constants'
import {
    FilterMails,
    ReceiverMailsInbox,
    SenderMailsInbox,
} from '@partials/common/MailsListing'
import { TopBar } from '@partials/common/MailsListing/components'
import { MailsCountCard } from '@partials/common/MailsListing/tabs/MailsInbox/Cards'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CiMail } from 'react-icons/ci'
import { IoSearch } from 'react-icons/io5'

export const MailsListing = () => {
    const [searchQuery, setSearchQuery] = useState('')
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
        <div className="mb-6 flex items-start gap-x-2">
            <TopBar mailsTabs={mailsTabs} />

            {/* Component */}
            <div className="w-full">
                <AuthorizedUserComponent
                    roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                >
                    <div className="flex items-center justify-between gap-x-16 mb-5 w-full">
                        <MailsCountCard
                            imageUrl="/images/mails/student-mail-icon.svg"
                            title="Student"
                            count={20}
                        />
                        <MailsCountCard
                            imageUrl="/images/mails/industry-mail-icon.svg"
                            title="Industry"
                            count={10}
                        />
                        <MailsCountCard
                            imageUrl="/images/mails/department-mail-icon.svg"
                            title="Department"
                            count={13}
                        />
                        <MailsCountCard
                            imageUrl="/images/mails/management-mail-icon.svg"
                            title="Management"
                            count={33}
                        />
                    </div>
                </AuthorizedUserComponent>
                <div className="relative w-full mb-4">
                    <div className="absolute top-1/2 left-8 ">
                        <IoSearch
                            size={25}
                            className="transform font-bold -translate-y-1/2 text-indigo-400"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Search here..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e?.target?.value)}
                        className="w-full pl-16 pr-8 py-6 bg-[#FFF2D6] border-0 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                </div>
                {searchQuery !== '' ? (
                    <FilterMails query={searchQuery} filteredData={[]} />
                ) : (
                    <>{Component ? <Component /> : <DefaultComponent />}</>
                )}
            </div>
        </div>
    )
}
