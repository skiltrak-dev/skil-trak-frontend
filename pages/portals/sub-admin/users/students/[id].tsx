import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

//components
import {
    // AssessmentsTools,
    ReactTable,
    TabNavigation,
    TabProps,
    Typography,
    IndustryProfile,
    TechnicalError,
    LoadingAnimation,
    EmptyData,
    SubAdminStudentProfile,
} from '@components'

import {
    MailsTab,
    StudentsProfileOverview,
} from '@components/sections/subAdmin/StudentsContainer'
// icons
import { FaEdit } from 'react-icons/fa'
// queries
import {
    useGetSubAdminStudentDetailQuery,
    useUpdateAssessmentToolArchiveMutation,
} from '@queries'

import { useContextBar } from '@hooks'

import { Notes } from '@components/sections/subAdmin'
import { Detail } from '@partials/sub-admin'

type Props = {}

const StudentsProfile: NextPageWithLayout = (props: Props) => {
    const contextBar = useContextBar()
    const router = useRouter()
    const { id } = router.query

    const { data, isLoading, isError, isSuccess } =
        useGetSubAdminStudentDetailQuery(String(id), {
            skip: !id,
        })

    useEffect(() => {
        if (isSuccess) {
            contextBar.setContent(<SubAdminStudentProfile student={data} />)
            contextBar.show(false)
        }
    }, [data])

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
            element: <StudentsProfileOverview subAdminStudentDetail={data} />,
        },
        {
            label: 'Assessments',
            href: {
                pathname: String(id),
                query: { tab: 'assessments' },
            },
            element: (
                <div className="my-5">
                    <Detail
                        studentId={data?.id}
                        studentUserId={data?.user?.id}
                    />
                </div>
            ),
        },
        {
            label: 'Mails',
            href: { pathname: String(id), query: { tab: 'mails' } },
            element: <MailsTab student={data} />,
        },
        {
            label: 'Notes',
            href: { pathname: String(id), query: { tab: 'notes' } },
            element: <Notes id={data?.user?.id} />,
        },
        {
            label: 'All Communications',
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
                                <div>{element}</div>
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
StudentsProfile.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout
            pageTitle={{ title: 'Student Profile', backTitle: 'Students' }}
        >
            {page}
        </SubAdminLayout>
    )
}

export default StudentsProfile
