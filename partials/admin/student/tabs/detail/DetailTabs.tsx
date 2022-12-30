import { TabNavigation, TabProps } from '@components'
import { AllCommunicationTab, NotesTab, MailsTab } from '@partials/common'
import { RequiredDocs } from '../../pages'

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
            element: <NotesTab user={student?.user} />,
        },
        {
            label: 'Mails',
            href: { query: { tab: 'mails', id } },
            element: <MailsTab user={student?.user} />,
        },
        {
            label: 'All Communications',
            href: { query: { tab: 'all-communications', id } },
            element: <AllCommunicationTab user={student?.user} />,
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
