import { TabNavigation, TabProps } from '@components'
import { MailsTab, NotesTab } from '@partials/common'
import { RequiredDocs } from '../../pages'
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
            element: <NotesTab user={student?.user} />,
        },
        {
            label: 'Mails',
            href: { query: { tab: 'mails', id } },
            element: <MailsTab user={student?.user} />,
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
