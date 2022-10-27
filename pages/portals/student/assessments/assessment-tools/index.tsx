import { ReactElement } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { AssessmentsTools } from '@components/sections/student/AssessmentsContainer/AssessmentsTools/AssessmentsTools'

type Props = {}

const AssessmentTools: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <AssessmentsTools />
        </>
    )
}
AssessmentTools.getLayout = (page: ReactElement) => {
    return <StudentLayout title="Assessment">{page}</StudentLayout>
}

export default AssessmentTools
