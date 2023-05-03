import { TabNavigation, TabProps } from '@components'
import {
    AllCommunicationTab,
    AppointmentTab,
    MailsTab,
    NotesTab,
    Supervisor,
} from '@partials/common'
import { SectorsTab } from './SectorsTab'
import { Students } from './Students'

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
            label: 'Supervisors',
            href: { query: { tab: 'supervisors', id } },
            element: <Supervisor industry={industry?.data} />,
        },
        {
            label: 'Students',
            href: { query: { tab: 'students', id } },
            element: <Students industry={industry?.data} />,
        },
        {
            label: 'Notes',
            href: { query: { tab: 'notes', id } },
            element: <NotesTab user={industry?.data?.user} />,
        },
        {
            label: 'Appointments',
            href: { pathname: String(id), query: { tab: 'appointments' } },
            element: <AppointmentTab userId={industry?.data?.user?.id} />,
        },
        {
            label: 'Mails',
            href: { query: { tab: 'mails', id } },
            element: <MailsTab user={industry?.data?.user} />,
        },
        {
            label: 'All Communications',
            href: { query: { tab: 'all-communications', id } },
            element: <AllCommunicationTab user={industry?.data?.user} />,
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
