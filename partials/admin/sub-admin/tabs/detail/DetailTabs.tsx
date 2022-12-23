import { TabNavigation, TabProps } from '@components'
import { AllCommunicationTab, NotesTab } from '@partials/common'
import { MailsTab } from './MailsTab'

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
            element: <MailsTab subAdmin={subAdmin?.user} />,
        },
        {
            label: 'All Communication',
            href: { query: { tab: 'all-communications', id } },
            element: <AllCommunicationTab user={subAdmin?.user} />,
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
