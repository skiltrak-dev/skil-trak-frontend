import { TabNavigation, TabProps } from '@components'
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
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'
import { Student } from '@types'

export const DetailTabs = ({
    id,
    student,
}: {
    student: Student
    id: number | string | string[] | undefined
}) => {
    const role = getUserCredentials()?.role
    const url =
        role === UserRoles.ADMIN
            ? String(id)
            : `/portals/sub-admin/students/${String(id)}/old-detail`

    const tabs: TabProps[] = [
        {
            label: 'Overview',
            href: {
                pathname: url,
                query: { tab: 'overview' },
            },
            element: <OverViewTab student={student} />,
        },
        {
            label: 'Submissions',
            href: {
                pathname: url,
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
                pathname: url,
                query: { tab: 'industry-checks' },
            },
            element: (
                <RequiredDocs
                    studentId={student?.id}
                    studentUserId={student?.user?.id}
                    industry={student?.industries?.[0]}
                />
            ),
        },
        {
            label: 'Schedule',
            href: {
                pathname: url,
                query: { tab: 'schedule' },
            },
            element: <Schedule studentId={student?.id} user={student?.user} />,
        },
        {
            label: 'Workplace',
            href: {
                pathname: url,
                query: { tab: 'workplace' },
            },
            element: <WorkplaceTab studentId={student?.id} />,
        },
        {
            label: 'Student Ticket',
            href: {
                pathname: url,
                query: { tab: 'studenttickets' },
            },
            element: <StudentTickets student={student} />,
        },
        {
            label: 'Appointments',
            href: {
                pathname: url,
                query: { tab: 'appointments' },
            },
            element: <AppointmentTab userId={student?.user?.id} />,
        },
        {
            label: 'Mails',
            href: {
                pathname: url,
                query: { tab: 'mails' },
            },
            element: <MailsTab user={student?.user} />,
        },
        {
            label: 'Notes',
            href: {
                pathname: url,
                query: { tab: 'notes' },
            },
            element: <NotesTab user={student?.user} />,
        },
        {
            label: 'All Communications',
            href: {
                pathname: url,
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
