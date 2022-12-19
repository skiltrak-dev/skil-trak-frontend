import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

// hooks
import { useContextBar } from '@hooks'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

//components
import {
    IndustryProfile,
    RtoProfileSidebar,
    LoadingAnimation,
    ReactTable,
    TabNavigation,
    TabProps,
    Typography,
    TechnicalError,
    EmptyData,
} from '@components'
import { Notes } from '@components/sections/subAdmin'

import { FigureCard } from '@components/sections/subAdmin'
import { SubAdminProfileTabsView } from '@components/sections/subAdmin'
import {
    RtoProfileOverview,
    AppointmentProfile,
} from '@components/sections/subAdmin/UsersContainer'
// icons
import { FaEdit } from 'react-icons/fa'
// queries
import {
    useGetSubAdminRTODetailQuery,
    useUpdateAssessmentToolArchiveMutation,
} from '@queries'
import { AssessmentTools } from '@components/sections/subAdmin/UsersContainer/SubAdminRtosContainer/SubAdminRtosProfile/AssessmentTools'
import { MailsTab } from '@components/sections/subAdmin/UsersContainer/SubAdminRtosContainer/SubAdminRtosProfile/components/MailsTab'
import { AllCommunicationTab } from '@partials/sub-admin/students/tabs/detail/AllCommunicationTab'

type Props = {}

const RtoProfile: NextPageWithLayout = (props: Props) => {
    const { setContent } = useContextBar()
    useEffect(() => {
        setContent(
            <>
                <RtoProfileSidebar />
            </>
        )
    }, [setContent])
    const pathname = useRouter()
    const { id } = pathname.query

    // query
    const rtoDetail = useGetSubAdminRTODetailQuery(String(id), {
        skip: !id,
    })

    const [archiveAssessmentTool, archiveAssessmentToolResult] =
        useUpdateAssessmentToolArchiveMutation()
    const actions = (id: any) => {
        return (
            <div className="flex gap-x-2 ">
                <a
                    href={`${process.env.NEXT_PUBLIC_END_POINT}/rtos/course/content/${id}`}
                    target="blank"
                    rel="noreferrer"
                >
                    <Typography variant="tableCell" color="text-blue-600">
                        Download
                    </Typography>
                </a>

                <div
                    className="cursor-pointer"
                    onClick={() => {
                        archiveAssessmentTool(id)
                    }}
                >
                    <Typography variant="tableCell" color="text-[#7081A0]">
                        Archive
                    </Typography>
                </div>
                <div onClick={() => {}}>
                    <FaEdit className="text-[#686DE0] cursor-pointer" />
                </div>
            </div>
        )
    }
    const tabs: TabProps[] = [
        {
            label: 'Overview',
            href: { pathname: String(id), query: { tab: 'overview' } },
            badge: { text: '05', color: 'text-blue-500' },
            element: (
                <RtoProfileOverview
                    rtoId={id}
                    userId={rtoDetail?.data?.user?.id}
                />
            ),
        },
        {
            label: 'Assessments',
            href: {
                pathname: String(id),
                query: { tab: 'assessments' },
            },
            badge: { text: '99+', color: 'text-error-500' },
            element: (
                <AssessmentTools
                    id={id}
                    courses={rtoDetail?.data?.courses}
                    role={'RTO'}
                    actions={actions}
                />
            ),
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
            label: 'Mails',
            href: { pathname: String(id), query: { tab: 'mails' } },
            element: <MailsTab rto={rtoDetail?.data} />,
        },
        {
            label: 'Notes',
            href: { pathname: String(id), query: { tab: 'notes' } },
            element: <Notes id={rtoDetail?.data?.user?.id} />,
        },
        {
            label: 'All Communications',
            href: {
                pathname: String(id),
                query: { tab: 'all-communications' },
            },
            element: <AllCommunicationTab student={rtoDetail?.data} />,
        },
    ]

    return (
        <>
            {rtoDetail.isError && <TechnicalError />}
            {rtoDetail?.isLoading ? (
                <LoadingAnimation />
            ) : rtoDetail?.data ? (
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
            ) : (
                !rtoDetail.isError && <EmptyData />
            )}
        </>
    )
}
RtoProfile.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'RTO Profile' }}>
            {page}
        </SubAdminLayout>
    )
}

export default RtoProfile
