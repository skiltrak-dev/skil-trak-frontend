import { StudentSubAdmin, TabNavigation, TabProps } from '@components'
import { Detail } from '@partials/sub-admin/assessmentEvidence'

import {
    AllCommunicationTab,
    AppointmentTab,
    MailsTab,
    NotesTab,
} from '@partials/common'
import { OverViewTab } from './OverviewTab'
import { RequiredDocs } from './RequiredDocs'
import { Schedule } from './Schedule'
import { StudentTickets } from './StudentTickets'
import { WorkplaceTab } from './WorkplaceTab'
export const DetailTabs = ({
    id,
    student,
}: {
    id: number | string | string[] | undefined
    student: StudentSubAdmin
}) => {
    const tabs: TabProps[] = [
        {
            label: 'Overview',
            href: {
                pathname: `/portals/sub-admin/students/${String(
                    id
                )}/old-detail`,
                query: { tab: 'overview' },
            },
            element: <OverViewTab student={student} />,
        },
        {
            label: 'Submissions',
            href: {
                pathname: `/portals/sub-admin/students/${String(
                    id
                )}/old-detail`,
                query: { tab: 'submissions' },
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
            label: 'Industry Checks',
            href: {
                pathname: `/portals/sub-admin/students/${String(
                    id
                )}/old-detail`,
                query: { tab: 'industry-checks' },
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
            label: 'Schedule',
            href: {
                pathname: `/portals/sub-admin/students/${String(
                    id
                )}/old-detail`,
                query: { tab: 'schedule' },
            },
            element: <Schedule studentId={student?.id} user={student?.user} />,
        },
        {
            label: 'Workplace',
            href: {
                pathname: `/portals/sub-admin/students/${String(
                    id
                )}/old-detail`,
                query: { tab: 'workplace' },
            },
            element: <WorkplaceTab studentId={student?.id} />,
        },
        {
            label: 'Student Ticket',
            href: {
                pathname: `/portals/sub-admin/students/${String(
                    id
                )}/old-detail`,
                query: { tab: 'studenttickets' },
            },
            element: <StudentTickets student={student} />,
        },
        {
            label: 'Appointments',
            href: {
                pathname: `/portals/sub-admin/students/${String(
                    id
                )}/old-detail`,
                query: { tab: 'appointments' },
            },
            element: <AppointmentTab userId={student?.user?.id} />,
        },
        {
            label: 'Mails',
            href: {
                pathname: `/portals/sub-admin/students/${String(
                    id
                )}/old-detail`,
                query: { tab: 'mails' },
            },
            element: <MailsTab user={student?.user} />,
        },
        {
            label: 'Notes',
            href: {
                pathname: `/portals/sub-admin/students/${String(
                    id
                )}/old-detail`,
                query: { tab: 'notes' },
            },
            element: <NotesTab user={student?.user} />,
        },
        {
            label: 'All Communications',
            href: {
                pathname: `/portals/sub-admin/students/${String(
                    id
                )}/old-detail`,
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
