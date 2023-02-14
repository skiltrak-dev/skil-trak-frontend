import { TabNavigation, TabProps } from '@components'
import { Detail } from '@partials/sub-admin/assessmentEvidence'

import { OverViewTab } from './OverviewTab'
import { AllCommunicationTab, NotesTab, MailsTab } from '@partials/common'
import { RequiredDocs } from './RequiredDocs'
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
            href: { pathname: String(id), query: { tab: 'overview' } },
            element: <OverViewTab student={student} />,
        },
        {
            label: 'Assessments',
            href: {
                pathname: String(id),
                query: { tab: 'assessments' },
            },
            element: (
                <div className="my-5">
                    <Detail
                        studentId={student?.id}
                        studentUserId={student?.user?.id}
                    />
                </div>
            ),
        },
        {
            label: 'Required Docs',
            href: {
                pathname: String(id),
                query: { tab: 'required-docs' },
            },
            element: (
                <RequiredDocs
                    studentId={student?.id}
                    studentUserId={student?.user?.id}
                    industry={student?.industries[0]}
                />
            ),
        },
        {
            label: 'Mails',
            href: { pathname: String(id), query: { tab: 'mails' } },
            element: <MailsTab user={student?.user} />,
        },
        {
            label: 'Notes',
            href: { pathname: String(id), query: { tab: 'notes' } },
            element: <NotesTab user={student?.user} />,
        },
        {
            label: 'All Communications',
            href: {
                pathname: String(id),
                query: { tab: 'all-communications' },
            },
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
                            <div>{element}</div>
                        </div>
                    )
                }}
            </TabNavigation>
        </div>
    )
}
