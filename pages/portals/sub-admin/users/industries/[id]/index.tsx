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
    BackButton,
} from '@components'
import { IndustryProfile } from '@components/IndustryProfile'
import {
    AppointmentProfile,
    IndustryProfileOverview,
} from '@components/sections/subAdmin/UsersContainer'

// icons
// import { FaEdit } from 'react-icons/fa'
// queries
import {
    useGetSubAdminIndustriesProfileQuery,
    useGetSubAdminIndustryStudentsQuery,
    SubAdminApi,
} from '@queries'
import {
    AllCommunicationTab,
    AppointmentTab,
    MailsTab,
    NotesTab,
    Supervisor,
} from '@partials/common'
import { Students } from '@partials/sub-admin/indestries'
import { getLink } from '@utils'
import { FigureCard } from '@components/sections/subAdmin'

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
    const { setContent, show, hide } = useContextBar()
    const pathname = useRouter()
    const { id } = pathname.query

    const navBar = useNavbar()

    const { data, isLoading, isError, isSuccess } =
        useGetSubAdminIndustriesProfileQuery(Number(id), {
            skip: !id,
            refetchOnMountOrArgChange: true,
        })
    const industryStatsCount = SubAdminApi.Industry.useStatusticsCount(
        Number(data?.user?.id),
        { skip: !data?.user?.id }
    )
    const studentList = useGetSubAdminIndustryStudentsQuery(String(id), {
        skip: !id,
    })
    const studentCount = studentList?.data?.data.length

    useEffect(() => {
        navBar.setSubTitle(data?.user?.name)
    }, [data])

    useEffect(() => {
        if (isSuccess && data) {
            setContent(<IndustryProfile data={data} />)
            show(false)
        }
        return () => {
            setContent(null)
            hide()
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
            label: 'Supervisors',
            href: { query: { tab: 'supervisors', id } },
            element: <Supervisor industry={data} />,
        },
        {
            label: 'Students',
            href: { pathname: String(id), query: { tab: 'students' } },
            badge: { text: studentCount, color: 'text-error-500' },
            element: <Students data={studentList.data} />,
        },
        {
            label: 'Appointments',
            href: { pathname: String(id), query: { tab: 'appointments' } },
            element: <AppointmentTab userId={data?.user?.id} />,
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
            element: <MailsTab user={data?.user} />,
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
                <div>
                    <BackButton
                        text={'Industry'}
                        link={`${
                            getLink('subadmin-industries') ||
                            'portals/sub-admin/users/industries?tab=all'
                        }`}
                    />
                    <PageTitle title="Industry Profile" />
                </div>
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
                                <div className="flex">
                                    <FigureCard
                                        imageUrl="/images/icons/students.png"
                                        count={Number(
                                            industryStatsCount?.data?.count
                                        )}
                                        title={'Current Students'}
                                    />
                                </div>
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
