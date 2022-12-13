import { TabNavigation, TabProps } from '@components'
import { RequiredDocs } from '../../pages'
import { MailsTab } from './MailsTab'
import { NotesTab } from './NotesTab'
import { OverViewTab } from './OverViewTab'

export const DetailTabs = ({
    id,
    student,
}: {
    id: number | string | string[] | undefined
    student: any
}) => {
    const tabs: TabProps[] = [
        {
            label: 'Required Documents',
            href: { query: { tab: 'required-documents', id } },
            element: (
                <RequiredDocs
                    courses={student?.courses}
                    assessmentEvidence={student?.assessmentEvidence}
                />
            ),
        },

        {
            label: 'Notes',
            href: { query: { tab: 'notes', id } },
            element: <NotesTab student={student} />,
        },
        {
            label: 'Mails',
            href: { query: { tab: 'mails', id } },
            element: <MailsTab student={student?.user} />,
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
