import { TabNavigation, TabProps } from '@components'
import { AllCommunicationTab, MailsTab, NotesTab } from '@partials/common'
import { SubAdminHistory } from './SubAdminHistory'
import { SubAdminReportsTab } from './SubAdminReportsTab'
import { ViewSummary } from './ViewSummary'

export const DetailTabs = ({
    id,
    subAdmin,
}: {
    id?: number | string | string[] | undefined
    subAdmin: any
}) => {
    const tabs: TabProps[] = [
        {
            label: 'History',
            href: { query: { tab: 'history', id } },
            element: <SubAdminHistory subadmin={subAdmin?.user?.id} />,
        },
        {
            label: 'Reports',
            href: { query: { tab: 'reports', id } },
            element: <SubAdminReportsTab subadmin={subAdmin?.user?.id} />,
        },
        {
            label: 'Notes',
            href: { query: { tab: 'notes', id } },
            element: <NotesTab user={subAdmin?.user} />,
        },
        {
            label: 'Mails',
            href: { query: { tab: 'mails', id } },
            element: <MailsTab user={subAdmin?.user} />,
        },
        {
            label: 'All Communication',
            href: { query: { tab: 'all-communications', id } },
            element: <AllCommunicationTab user={subAdmin?.user} />,
        },
        {
            label: 'View Summary',
            href: { query: { tab: 'view-summary', id } },
            element: <ViewSummary user={subAdmin?.user} />,
        },
    ]

    return (
        <div>
            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => {
                    return (
                        <div>
                            <div>{header}</div>
                            <div className="p-4">{element}</div>
                        </div>
                    )
                }}
            </TabNavigation>
        </div>
    )
}
