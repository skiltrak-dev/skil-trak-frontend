import { TabNavigation, TabProps } from '@components'
import { Detail } from '@partials/sub-admin/assessmentEvidence'

import { NotesTab } from '@partials/common'
import { OverViewTab } from './OverviewTab'
import { AssessmentsEvidence } from './AssessmentsEvidence'
import { QuestionsTab } from './QuestionsTab'
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
            label: 'Assessments',
            href: {
                pathname: String(id),
                query: { tab: 'assessments' },
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
            label: 'Required Docs',
            href: { pathname: String(id), query: { tab: 'notes' } },
            element: '',
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
