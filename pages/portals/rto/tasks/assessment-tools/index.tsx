import { ReactElement } from 'react'
// Layouts
import { RtoLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'
// Components
import { AssessmentsTools, Typography } from '@components'
// React Icons
import { FaEdit } from 'react-icons/fa'
// Queries
import { useUpdateAssessmentToolArchiveMutation } from '@queries'


type Props = {}

const RtoAssessmentTools: NextPageWithLayout = (props: Props) => {
 const [archiveAssessmentTool, archiveAssessmentToolResult] = useUpdateAssessmentToolArchiveMutation()

    const actions = (id: any) => {
        console.log(id)
        return (
            <div className="flex gap-x-2 ">
                <a href={`${process.env.NEXT_PUBLIC_END_POINT}/rtos/course/content/${id}`} target="blank" rel="noreferrer">
                    <Typography variant="tableCell" color="text-blue-600">
                        Download
                    </Typography>
                </a>

                <div className='cursor-pointer' onClick={() => { archiveAssessmentTool(id)}}>
                    <Typography variant="tableCell" color="text-[#7081A0]">
                        Archive
                    </Typography>
                </div>
                <div onClick={() => { console.log("Edit") }}>
                    <FaEdit className="text-[#686DE0] cursor-pointer" />
                </div>
            </div>
        )
    }

    return (
        <>
            <AssessmentsTools role={'RTO'} actions={actions} />
        </>
    )
}
RtoAssessmentTools.getLayout = (page: ReactElement) => {
    return <RtoLayout title="Assessment Tools">{page}</RtoLayout>
}

export default RtoAssessmentTools
