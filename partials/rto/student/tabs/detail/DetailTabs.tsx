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
    // TODO Notes and mails need to update
    const tabs: TabProps[] = [
        {
            label: 'Overview',
            href: { query: { tab: 'overview', id } },
            element: <OverViewTab student={student} />,
        },
        // {
        //     label: 'Required Documents',
        //     href: { query: { tab: 'required-documents', id } },
        //     element: (
        //         <RequiredDocs
        //             courses={student?.courses}
        //             assessmentEvidence={student?.assessmentEvidence}
        //         />
        //     ),
        // },
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
