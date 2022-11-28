import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// hooks
import { useContextBar } from '@hooks'
//components
import {
    LoadingAnimation,
    TabNavigation,
    TabProps,
    EmptyData,
    TechnicalError,
} from '@components'
import { IndustryProfile } from '@components/IndustryProfile'
import { MailsTab } from '@components/sections/subAdmin/UsersContainer'
import {
    AppointmentProfile,
    IndustryProfileOverview,
    Notes,
} from '@components/sections'
// icons
// import { FaEdit } from 'react-icons/fa'
// queries
import { useGetSubAdminIndustriesProfileQuery } from '@queries'

type Props = {}

const IndustriesProfile: NextPageWithLayout = (props: Props) => {
    const { setContent } = useContextBar()
    const pathname = useRouter()
    const { id } = pathname.query

    const { data, isLoading, isError } = useGetSubAdminIndustriesProfileQuery(
        String(id),
        { skip: !id }
    )

    useEffect(() => {
        setContent(
            <>
                <IndustryProfile data={data} />
            </>
        )
    }, [data, setContent])

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
            badge: { text: '99', color: 'text-error-500' },
            element: <div>Students</div>,
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
            element: <div>schedule</div>,
        },
        {
            label: 'Mails',
            href: { pathname: String(id), query: { tab: 'mails' } },
            element: <MailsTab industry={data} />,
        },
        {
            label: 'Notes',
            href: { pathname: String(id), query: { tab: 'notes' } },
            element: <Notes id={data?.user?.id} />,
        },
    ]

    return (
        <>
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
                !isError && <EmptyData />
            )}
        </>
    )
}
IndustriesProfile.getLayout = (page: ReactElement) => {
    return <SubAdminLayout title="Industries Profile">{page}</SubAdminLayout>
}

export default IndustriesProfile
