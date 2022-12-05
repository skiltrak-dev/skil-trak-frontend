import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import Link from 'next/link'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { TabsView } from '@components/sections/rto'
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

import { AssessmentsEvidence } from '@components/sections/student/AssessmentsContainer'

// hooks
import { useContextBar } from '@hooks'
import { AssesmentEvidenceDetail } from '@components/sections/subAdmin/Tasks'
import { Notes } from '@components/sections/subAdmin'

type Props = {}

const StudentsProfile: NextPageWithLayout = (props: Props) => {
    const { setContent } = useContextBar()
    const pathname = useRouter()
    const { id } = pathname.query

    const { data, isLoading, isError } = useGetSubAdminStudentDetailQuery(
        String(id),
        {
            skip: !id,
        }
    )
    
    useEffect(() => {
        setContent(
            <>
                <SubAdminStudentProfile data={data} />
            </>
        )
    }, [setContent, data])

    const [archiveAssessmentTool, archiveAssessmentToolResult] =
        useUpdateAssessmentToolArchiveMutation()
    const actions = (id: any) => {
        // console.log(id)
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
                <div
                    onClick={() => {
                        // console.log('Edit')
                    }}
                >
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
            element: <StudentsProfileOverview subAdminStudentDetail={data} />,
        },
        {
            label: 'Assessments',
            href: {
                pathname: String(id),
                query: { tab: 'assessments' },
            },
            badge: {
                text: data?.assessmentEvidence?.length,
                color: 'text-error-500',
            },
            element: (
                <AssesmentEvidenceDetail courseId={data?.courses[0]?.id} />
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
    return <SubAdminLayout pageTitle={{title:"Student Profile"}}>{page}</SubAdminLayout>
}

export default StudentsProfile
