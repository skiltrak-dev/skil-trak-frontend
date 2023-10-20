import { TabNavigation, TabProps } from '@components'

import { NotesTab } from '@partials/common'
import { OverViewTab } from './OverviewTab'
import { StudentSchedule } from './StudentSchedule'
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
        // {
        //     label: 'Submissions',
        //     href: {
        //         pathname: String(id),
        //         query: { tab: 'submissions' },
        //     },
        //     element: (
        //         <AssessmentsEvidence
        //             studentId={workplace?.student?.id}
        //             studentUserId={workplace?.student?.user?.id}
        //             courses={workplace?.courses}
        //         />
        //     ),
        // },
        // {
        //     label: 'Industry Checks',
        //     href: { pathname: String(id), query: { tab: 'industry-checks' } },
        //     element: (
        //         <RequiredDocs
        //             studentId={workplace?.student?.id}
        //             studentUserId={workplace?.student?.user?.id}
        //             courses={workplace?.courses}
        //         />
        //     ),
        // },
        // {
        //     label: 'Student Availability',
        //     href: {
        //         pathname: String(id),
        //         query: { tab: 'student-availability' },
        //     },
        //     element: <QuestionsTab workplace={workplace} />,
        // },
        {
            label: 'Notes',
            href: { pathname: String(id), query: { tab: 'notes' } },
            element: <NotesTab user={workplace?.student?.user} />,
        },
        {
            label: 'Schedule',
            href: { pathname: String(id), query: { tab: 'schedule' } },
            element: (
                <StudentSchedule
                    course={workplace?.courses?.[0]}
                    user={workplace?.student?.user}
                />
            ),
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
