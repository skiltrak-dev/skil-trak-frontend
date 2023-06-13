import {
    BigCalendar,
    CalendarEvent,
    Card,
    TabNavigation,
    TabProps,
} from '@components'

import { FigureCard } from '@components/sections/subAdmin'
import {
    AllCommunicationTab,
    AppointmentTab,
    MailsTab,
    NotesTab,
    Supervisor,
} from '@partials/common'
import { Industry } from '@types'
import { IndustryProfileOverview } from './IndustryProfileOverview'
import { Students } from './Students'
import { SubAdminApi, useGetSubAdminIndustryStudentsQuery } from '@queries'
export const DetailTabs = ({ industry }: { industry: Industry }) => {
    const studentList = useGetSubAdminIndustryStudentsQuery(
        String(industry?.id),
        {
            skip: !industry?.id,
        }
    )

    const industryStatsCount = SubAdminApi.Industry.useStatusticsCount(
        Number(industry?.user?.id),
        { skip: !industry?.user?.id }
    )

    const studentCount = studentList?.data?.data.length

    const events: CalendarEvent[] = [
        {
            allDay: false,
            start: new Date('2023-01-26T02:00:15.221Z'),
            end: new Date('2023-01-27T02:00:15.221Z'),
            title: 'Appointment',
            priority: 'high',
            subTitle: 'Go For It',
        },
        {
            allDay: false,
            end: new Date('2023-01-29T05:00:00.000Z'),
            start: new Date('2023-01-29T07:00:00.000Z'),
            title: 'test larger',
            priority: 'low',
        },
    ]
    const tabs: TabProps[] = [
        {
            label: 'Overview',
            href: {
                pathname: String(industry?.id),
                query: { tab: 'overview' },
            },
            badge: { text: '05', color: 'text-blue-500' },
            element: <IndustryProfileOverview industryProfile={industry} />,
        },
        {
            label: 'Supervisors',
            href: { query: { tab: 'supervisors', id: industry?.id } },
            element: <Supervisor industry={industry} />,
        },
        {
            label: 'Students',
            href: {
                pathname: String(industry?.id),
                query: { tab: 'students' },
            },
            badge: { text: studentCount, color: 'text-error-500' },
            element: <Students data={studentList.data} />,
        },
        {
            label: 'Appointments',
            href: {
                pathname: String(industry?.id),
                query: { tab: 'appointments' },
            },
            element: <AppointmentTab userId={industry?.user?.id} />,
        },
        {
            label: 'Schedule',
            href: {
                pathname: String(industry?.id),
                query: { tab: 'schedule' },
            },
            element: (
                <Card>
                    <BigCalendar events={events} />
                </Card>
            ),
        },
        {
            label: 'Mails',
            href: { pathname: String(industry?.id), query: { tab: 'mails' } },
            element: <MailsTab user={industry?.user} />,
        },
        {
            label: 'Notes',
            href: { pathname: String(industry?.id), query: { tab: 'notes' } },
            element: <NotesTab user={industry?.user} />,
        },
        {
            label: 'All Communication',
            href: {
                pathname: String(industry?.id),
                query: { tab: 'all-communication' },
            },
            element: <AllCommunicationTab user={industry?.user} />,
        },
    ]

    return (
        <div>
            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => {
                    return (
                        <div>
                            <div className="flex">
                                <FigureCard
                                    imageUrl="/images/icons/students.png"
                                    count={Number(
                                        industryStatsCount?.data?.count
                                    )}
                                    title={'Current Students'}
                                    link={`/portals/sub-admin/users/industries/${industry?.id}?tab=students`}
                                />
                            </div>
                            <div>{header}</div>
                            <div className="mt-3">{element}</div>
                        </div>
                    )
                }}
            </TabNavigation>
        </div>
    )
}
