import { ReactElement } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { AssessmentsTools } from '@components'
import { Typography } from '@components'
import { FaEdit } from 'react-icons/fa'

type Props = {}

const AssessmentTools: NextPageWithLayout = (props: Props) => {
    const actions = () => {
        return (
            <div className="flex gap-x-2 ">
                <Typography variant="tableCell" color="text-blue-600">
                    Download
                </Typography>
            </div>
        )
    }
    return (
        <>
            <AssessmentsTools role={'Student'} actions={actions} />
        </>
    )
}
AssessmentTools.getLayout = (page: ReactElement) => {
    return <StudentLayout title="Assessment Tools">{page}</StudentLayout>
}

export default AssessmentTools
