import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

// hooks
import { useContextBar, useNavbar } from '@hooks'
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
    PageTitle,
    Button,
} from '@components'

import { FigureCard } from '@components/sections/subAdmin'
import { SubAdminProfileTabsView } from '@components/sections/subAdmin'
import {
    RtoProfileOverview,
    AppointmentProfile,
} from '@components/sections/subAdmin/UsersContainer'
// icons
import { FaChevronDown, FaEdit, FaFileImport, FaUserGraduate } from 'react-icons/fa'
// queries
import {
    useGetSubAdminRTODetailQuery,
    useUpdateSubAdminAssessmentToolArchiveMutation,
} from '@queries'
import { AssessmentToolsSubAdmin } from '@components/sections/subAdmin/UsersContainer/SubAdminRtosContainer/SubAdminRtosProfile'
import { MailsTab } from '@components/sections/subAdmin/UsersContainer/SubAdminRtosContainer/SubAdminRtosProfile/components/MailsTab'
import { AllCommunicationTab, NotesTab } from '@partials/common'

type Props = {}

const RtoProfile: NextPageWithLayout = (props: Props) => {
    const pathname = useRouter()
    const { id } = pathname.query
    const { setContent } = useContextBar()
    const rtoDetail = useGetSubAdminRTODetailQuery(String(id), {
        skip: !id,
    })
    console.log(rtoDetail.data)
    const navBar = useNavbar()

    useEffect(() => {
        setContent(
            <>
                <RtoProfileSidebar data={rtoDetail} />
            </>
        )
    }, [setContent])

    useEffect(() => {
        navBar.setSubTitle(rtoDetail?.data?.user?.name)
    }, [rtoDetail])

    // query

    // const [archiveAssessmentTool, archiveAssessmentToolResult] =
    //     useUpdateAssessmentToolArchiveMutation()
    // const [archiveAssessmentTool, archiveAssessmentToolResult] =
    //     useUpdateSubAdminAssessmentToolArchiveMutation()
    // const actions = (id: any) => {
    //     return (
    //         <div className="flex gap-x-2 ">
    //             <a
    //                 href={`${process.env.NEXT_PUBLIC_END_POINT}/rtos/course/content/${id}`}
    //                 target="blank"
    //                 rel="noreferrer"
    //             >
    //                 <Typography variant="tableCell" color="text-blue-600">
    //                     Download
    //                 </Typography>
    //             </a>

    //             <div
    //                 className="cursor-pointer"
    //                 onClick={() => {
    //                     archiveAssessmentTool(id)
    //                 }}
    //             >
    //                 <Typography variant="tableCell" color="text-[#7081A0]">
    //                     Archive
    //                 </Typography>
    //             </div>
    //             <div onClick={() => { }}>
    //                 <FaEdit className="text-[#686DE0] cursor-pointer" />
    //             </div>
    //         </div>
    //     )
    // }
    const tabs: TabProps[] = [
        {
            label: 'Overview',
            href: { pathname: String(id), query: { tab: 'overview' } },
            badge: { text: '05', color: 'text-blue-500' },
            element: (
                <RtoProfileOverview
                    rtoDetail={rtoDetail?.data}
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
            badge: { text: '', color: 'text-error-500' },
            element: <AssessmentToolsSubAdmin />,
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
            element: <NotesTab user={rtoDetail?.data?.user} />,
        },
        {
            label: 'All Communications',
            href: {
                pathname: String(id),
                query: { tab: 'all-communications' },
            },
            element: <AllCommunicationTab user={rtoDetail?.data?.user} />,
        },
    ]
    const [showDropDown, setShowDropDown] = useState(false)
    return (
        <>
            <div className="flex justify-between items-end mb-4">
                <PageTitle title="RTO Profile" backTitle="RTO" />
                <div className="flex items-center gap-x-2">
                    <div className="flex items-center gap-x-3">
                        <div
                            className="relative"
                            onMouseEnter={() => setShowDropDown(true)}
                            onMouseLeave={() => setShowDropDown(false)}
                        >
                            <Button>
                                <span
                                    id="add-students"
                                    className="flex items-center gap-x-2"
                                >
                                    <span>Add Students</span>
                                    <FaChevronDown />
                                </span>
                            </Button>

                            {showDropDown ? (
                                <ul className="bg-white shadow-xl rounded-xl overflow-hidden absolute">
                                    <li>
                                        <button
                                            onClick={() => {
                                                pathname.push(
                                                    `${rtoDetail?.data?.user?.id}/student-list`
                                                )
                                            }}
                                            className="w-full flex items-center gap-x-2 text-sm px-2 py-2 hover:bg-gray-200"
                                        >
                                            <span className="text-gray-500">
                                                <FaFileImport />
                                            </span>
                                            <span className="whitespace-nowrap">
                                                {' '}
                                                Import Students
                                            </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                pathname.push(
                                                    `${rtoDetail.data.user.id}/add-individual-student`
                                                )
                                            }}
                                            className="w-full flex items-center gap-x-2 text-sm px-2 py-2 hover:bg-gray-200"
                                        >
                                            <span className="text-gray-500">
                                                <FaUserGraduate />
                                            </span>
                                            <span> Add Individual</span>
                                        </button>
                                    </li>
                                </ul>
                            ) : null}
                        </div>
                    </div>
                    <Button
                        text="Book Appointment"
                        variant="info"
                        onClick={() => {
                            pathname.push({
                                pathname:
                                    '/portals/sub-admin/tasks/appointments/create-appointment',
                                query: { student: rtoDetail?.data?.user?.id },
                            })
                        }}
                        disabled={!rtoDetail?.isSuccess}
                    />
                    <Button text="More" variant="action" />
                </div>
            </div>
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
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default RtoProfile
