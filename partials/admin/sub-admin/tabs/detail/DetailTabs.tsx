import { TabNavigation, TabProps } from '@components'
import { MailsTab } from './MailsTab'
import { NotesTab } from './NotesTab'
import { AllCommunicationTab } from './AllCommunicationTab'

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
            element: <NotesTab subAdmin={subAdmin?.user} />,
        },
        {
            label: 'Mails',
            href: { query: { tab: 'mails', id } },
            element: <MailsTab subAdmin={subAdmin?.user} />,
        },
        {
            label: 'All Communication',
            href: { query: { tab: 'all-communications', id } },
            element: <AllCommunicationTab subAdmin={subAdmin} />,
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
