import { TabNavigation, TabProps } from '@components'
import { MailsTab } from './MailsTab'
import { NotesTab } from './NotesTab'
import { SectorsTab } from './SectorsTab'

export const DetailTabs = ({
    id,
    industry,
}: {
    id?: number | string | string[] | undefined
    industry: any
}) => {
    const tabs: TabProps[] = [
        {
            label: 'Sectors',
            href: { query: { tab: 'sectors', id } },
            element: <SectorsTab industry={industry} />,
        },
        {
            label: 'Notes',
            href: { query: { tab: 'notes', id } },
            element: <NotesTab industry={industry} />,
        },
        {
            label: 'Mails',
            href: { query: { tab: 'mails', id } },
            element: <MailsTab industry={industry?.data} />,
        },
        {
            label: 'All Communications',
            href: { query: { tab: 'all-communications', id } },
            element: 'Under Construction',
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
