import { ReactElement } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import {
    AssessmentsEvidence,
} from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence'

type Props = {}

const AssessmentEvidence: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <AssessmentsEvidence />
        </>
    )
}
AssessmentEvidence.getLayout = (page: ReactElement) => {
    return <StudentLayout title="Assessment Evidence">{page}</StudentLayout>
}

export default AssessmentEvidence
