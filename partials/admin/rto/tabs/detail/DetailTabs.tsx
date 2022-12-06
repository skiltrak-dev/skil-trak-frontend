import { MailsTab } from './MailsTab'
import { NotesTab } from './NotesTab'
import { SectorsTab } from './SectorsTab'
import { SubAdminsTab } from './SubAdminsTab'
import { AssessmentTools } from './AssessmentTools'
import { TabNavigation, TabProps } from '@components'

export const DetailTabs = ({
    id,
    rto,
}: {
    id: number | string | string[] | undefined
    rto: any
}) => {
    const tabs: TabProps[] = [
        {
            label: 'Sectors',
            href: { query: { tab: 'sectors', id } },
            element: <SectorsTab rto={rto} />,
        },
        {
            label: 'Notes',
            href: { query: { tab: 'notes', id } },
            element: <NotesTab rto={rto?.data?.user} />,
        },
        {
            label: 'Assessments',
            href: { query: { tab: 'assessments', id } },
            element: <AssessmentTools rto={rto} />,
        },
        {
            label: 'Sub Admins',
            href: { query: { tab: 'sub-admin', id } },
            element: <SubAdminsTab rto={rto} />,
        },
        {
            label: 'Mails',
            href: { query: { tab: 'mails', id } },
            element: <MailsTab rto={rto?.data?.user} />,
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
