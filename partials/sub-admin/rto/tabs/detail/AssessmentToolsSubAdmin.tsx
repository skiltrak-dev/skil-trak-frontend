import { useRouter } from 'next/router'
import { useState } from 'react'

// hooks
import { useContextBar } from '@hooks'
//Layouts

//components
import { Typography } from '@components'

// icons
import { FaEdit } from 'react-icons/fa'
// queries
import {
    useGetSubAdminRTODetailQuery,
    useUpdateSubAdminAssessmentToolArchiveMutation,
} from '@queries'
import Link from 'next/link'
import { AddAssessmentToolCB } from '../../contextBar'
import { AssessmentTools } from './AssessmentTools'
import { ArchivedAssessmentTool } from './ArchivedAssessmentTool'
type Props = {}

export const AssessmentToolsSubAdmin = (props: Props) => {
    const [assessmentView, setAssessmentView] = useState<string>('assessments')
    const contextBar = useContextBar()
    const pathname = useRouter()
    const { id } = pathname.query

    // query
    const rtoDetail = useGetSubAdminRTODetailQuery(String(id), {
        skip: !id,
    })

    // const [archiveAssessmentTool, archiveAssessmentToolResult] =
    //   useUpdateSubAdminAssessmentToolArchiveMutation()
    const [archiveAssessmentTool, archiveAssessmentToolResult] =
        useUpdateSubAdminAssessmentToolArchiveMutation()

    const onAddAssessment = (tool: any) => {
        contextBar.setTitle('Update Assessment')
        contextBar.setContent(
            <AddAssessmentToolCB assessment={tool} edit={true} />
        )
        contextBar.show()
    }
    const actions = (tool: any) => {
        return (
            <div className="flex gap-x-2 ">
                <Link
                    className="cursor-pointer"
                    href={`${
                        process.env.NEXT_PUBLIC_END_POINT
                    }/shared/assessment-tool/download/${Number(tool?.id)}`}
                    download
                    referrerPolicy="no-referrer"
                    target="_blank"
                >
                    <Typography variant="tableCell" color="text-blue-600">
                        Download
                    </Typography>
                </Link>

                <div
                    className="cursor-pointer"
                    onClick={() => {
                        archiveAssessmentTool(tool?.id)
                    }}
                >
                    <Typography variant="tableCell" color="text-[#7081A0]">
                        Archive
                    </Typography>
                </div>
                <div
                    onClick={() => {
                        onAddAssessment(tool)
                    }}
                >
                    <FaEdit className="text-[#686DE0] cursor-pointer" />
                </div>
            </div>
        )
    }

    return (
        <>
            {assessmentView === 'assessments' ? (
                <AssessmentTools
                    // id={id}
                    rto={rtoDetail?.data}
                    courses={rtoDetail?.data?.courses}
                    role={'RTO'}
                    actions={actions}
                    setAssessmentView={setAssessmentView}
                />
            ) : (
                <ArchivedAssessmentTool
                    role={'RTO'}
                    setAssessmentView={setAssessmentView}
                />
            )}
        </>
    )
}
