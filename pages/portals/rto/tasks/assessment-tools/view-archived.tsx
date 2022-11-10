import { ReactElement } from 'react'

// Layouts
import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
// components
import { Typography } from '@components'
import { ArchivedView } from '@components/sections'
// React Icons
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
// Queries
import { useUpdateAssessmentToolArchiveMutation } from '@queries'

// queries

type Props = {}

const ViewArchived: NextPageWithLayout = (props: Props) => {
    const [archiveAssessmentTool, archiveAssessmentToolResult] = useUpdateAssessmentToolArchiveMutation()

    const actions = (id: any) => {
        return (
            <div className="flex gap-x-2 ">
                <a href={`${process.env.NEXT_PUBLIC_END_POINT}/portals/rtos/course/content/${id}`} target="blank" rel="noreferrer">
                    <Typography variant="tableCell" color="text-blue-600">
                        Download
                    </Typography>
                </a>
                <div className='cursor-pointer' onClick={() => { archiveAssessmentTool(id) }}>
                    <Typography variant="tableCell" color="text-[#7081A0]">
                        Unarchive
                    </Typography>
                </div>
                <div onClick={() => { console.log("Edit") }}>
                    <FaEdit className="text-[#686DE0] cursor-pointer" />
                </div>
                <div onClick={() => { console.log("Deleted") }}>
                    <MdDelete className="text-red-400 cursor-pointer" />
                </div>
            </div>
        )
    }
    return (
        <>
            <ArchivedView role={'RTO'} actions={actions} />
        </>
    )
}
ViewArchived.getLayout = (page: ReactElement) => {
    return <RtoLayout title="Assessment Tools">{page}</RtoLayout>
}

export default ViewArchived