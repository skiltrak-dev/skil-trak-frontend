import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// hooks
import { useContextBar, useNavbar } from '@hooks'
//components
import {
    LoadingAnimation,
    TabNavigation,
    TabProps,
    EmptyData,
    TechnicalError,
    PageTitle,
    Button,
    BigCalendar,
    Card,
    CalendarEvent,
} from '@components'
import { IndustryProfile } from '@components/IndustryProfile'
import {
    AppointmentProfile,
    IndustryProfileOverview,
    MailsTab,
} from '@components/sections/subAdmin/UsersContainer'

// icons
// import { FaEdit } from 'react-icons/fa'
// queries
import {
    useGetSubAdminIndustriesProfileQuery,
    useGetSubAdminIndustryStudentsQuery,
} from '@queries'
import { AllCommunicationTab, NotesTab } from '@partials/common'
import { Students } from '@partials/sub-admin/indestries'

type Props = {}

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

const IndustriesProfile: NextPageWithLayout = (props: Props) => {
    const { setContent, show } = useContextBar()
    const pathname = useRouter()
    const { id } = pathname.query

    const navBar = useNavbar()

    const { data, isLoading, isError, isSuccess } =
        useGetSubAdminIndustriesProfileQuery(Number(id), { skip: !id })
    const studentList = useGetSubAdminIndustryStudentsQuery(String(id), {
        skip: !id,
    })
    const studentCount = studentList?.data?.data.length

    useEffect(() => {
        navBar.setSubTitle(data?.user?.name)
    }, [data])

    useEffect(() => {
        if (isSuccess && data) {
            setContent(
                <>
                    <IndustryProfile data={data} />
                </>
            )
            show(false)
        }
    }, [data, isSuccess, setContent])

    const tabs: TabProps[] = [
        {
            label: 'Overview',
            href: { pathname: String(id), query: { tab: 'overview' } },
            badge: { text: '05', color: 'text-blue-500' },
            element: <IndustryProfileOverview industryProfile={data} />,
        },
        {
            label: 'Students',
            href: { pathname: String(id), query: { tab: 'students' } },
            badge: { text: studentCount, color: 'text-error-500' },
            element: <Students data={studentList.data} />,
        },
        {
            label: 'Appointments',
            href: {
                pathname: String(id),
                query: { tab: 'appointments' },
            },
            element: <AppointmentProfile />,
        },
        {
            label: 'Schedule',
            href: { pathname: String(id), query: { tab: 'schedule' } },
            element: (
                <Card>
                    <BigCalendar events={events} />
                </Card>
            ),
        },
        {
            label: 'Mails',
            href: { pathname: String(id), query: { tab: 'mails' } },
            element: <MailsTab industry={data} />,
        },
        {
            label: 'Notes',
            href: { pathname: String(id), query: { tab: 'notes' } },
            element: <NotesTab user={data?.user} />,
        },
        {
            label: 'All Communication',
            href: { pathname: String(id), query: { tab: 'all-communication' } },
            element: <AllCommunicationTab user={data?.user} />,
        },
    ]

    return (
        <>
            <div className="flex justify-between items-end mb-4">
                <PageTitle title="Industry Profile" backTitle="Industry" />
                <div className="flex items-center gap-x-2">
                    <Button
                        text="Book Appointment"
                        variant="info"
                        onClick={() => {
                            pathname.push({
                                pathname:
                                    '/portals/sub-admin/tasks/appointments/create-appointment',
                                query: { industry: data?.user?.id },
                            })
                        }}
                        disabled={!isSuccess}
                    />
                    <Button text="More" variant="action" />
                </div>
            </div>
            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation />
            ) : data ? (
                <TabNavigation tabs={tabs}>
                    {({ header, element }: any) => {
                        return (
                            <div>
                                <div>{header}</div>
                                <div className="mt-3">{element}</div>
                            </div>
                        )
                    }}
                </TabNavigation>
            ) : (
                !isError && (
                    <EmptyData
                        title={'No Industry were found'}
                        description={'No Industry Detail were found'}
                    />
                )
            )}
        </>
    )
}
IndustriesProfile.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default IndustriesProfile
