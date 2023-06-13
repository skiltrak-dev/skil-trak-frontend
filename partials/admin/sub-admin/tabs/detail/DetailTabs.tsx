import { TabNavigation, TabProps } from '@components'
import { AllCommunicationTab, NotesTab, MailsTab } from '@partials/common'
import { ViewSummary } from './ViewSummary'
import { SubAdminHistory } from './SubAdminHistory'

export const DetailTabs = ({
    id,
    subAdmin,
}: {
    id?: number | string | string[] | undefined
    subAdmin: any
}) => {
    const tabs: TabProps[] = [
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
        {
            label: 'History',
            href: { query: { tab: 'history', id } },
            element: <SubAdminHistory subadmin={subAdmin?.user?.id} />,
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
