import { TabNavigation, TabProps } from '@components'
import { Detail } from '@partials/sub-admin/assessmentEvidence'

import { NotesTab } from '@partials/common'
import { OverViewTab } from './OverviewTab'
import { AssessmentsEvidence } from './AssessmentsEvidence'
import { QuestionsTab } from './QuestionsTab'
import { RequiredDocs } from './RequiredDocs'
export const DetailTabs = ({
    id,
    workplace,
}: {
    id: number | string | string[] | undefined
    workplace: any
}) => {
    const tabs: TabProps[] = [
        {
            label: 'Overview',
            href: { pathname: String(id), query: { tab: 'overview' } },
            element: <OverViewTab workplace={workplace} />,
        },
        {
            label: 'Submissions',
            href: {
                pathname: String(id),
                query: { tab: 'submissions' },
            },
            element: (
                <AssessmentsEvidence
                    studentId={workplace?.student?.id}
                    studentUserId={workplace?.student?.user?.id}
                    courses={workplace?.courses}
                />
            ),
        },
        {
            label: 'Industry Checks',
            href: { pathname: String(id), query: { tab: 'industry-checks' } },
            element: (
                <RequiredDocs
                    studentId={workplace?.student?.id}
                    studentUserId={workplace?.student?.user?.id}
                    courses={workplace?.courses}
                />
            ),
        },
        {
            label: 'Questions',
            href: { pathname: String(id), query: { tab: 'questions' } },
            element: <QuestionsTab workplace={workplace} />,
        },
        {
            label: 'Notes',
            href: { pathname: String(id), query: { tab: 'notes' } },
            element: <NotesTab user={workplace?.student?.user} />,
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
