import { Typography } from '@components'
import { useContextBar } from '@hooks'
import { AdminApi } from '@queries'
import Link from 'next/link'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { ArchivedAssessmentTool, AssessmentTool } from '../../components'
import { AddAssessmentToolCB } from '../../components/AddAssessmentToolCB'
export const AssessmentTools = ({ rto }: any) => {
    const [assessmentToolId, setAssessmentToolId] = useState<number | null>(
        null
    )

    const [assessmentView, setAssessmentView] = useState<string>('assessments')
    const contextBar = useContextBar()
    const [archiveAssessmentTool, archiveAssessmentToolResult] =
        AdminApi.Rtos.useArchiveAssessmentTools()
    const onAddAssessment = (tool: any) => {
        contextBar.setTitle('Add Assessment')
        contextBar.setContent(
            <AddAssessmentToolCB assessment={tool} edit={true} />
        )
        contextBar.show()
    }

    const actions = (assessment: any) => {
        return (
            <div className="flex gap-x-2 ">
                {/* <a href={assessment?.file} target="blank" rel="noreferrer"> */}
                <Link
                    className="cursor-pointer"
                    href={assessment?.file}
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
                        archiveAssessmentTool(assessment?.id)
                    }}
                >
                    <Typography variant="tableCell" color="text-[#7081A0]">
                        Archive
                    </Typography>
                </div>
                <div
                    onClick={() => {
                        onAddAssessment(assessment)
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
                <AssessmentTool
                    rto={rto}
                    setAssessmentView={setAssessmentView}
                    actions={actions}
                />
            ) : (
                <ArchivedAssessmentTool
                    rto={rto}
                    setAssessmentView={setAssessmentView}
                />
            )}
            {/* <TabNavigation tabs={tabs}>
                {({ element }: any) => {
                    return (
                        <div>
                            <div className="p-4">{element}</div>
                        </div>
                    )
                }}
            </TabNavigation> */}
        </>
    )
}
