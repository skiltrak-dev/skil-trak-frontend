import { ReactElement } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import {
    ESignatures,
} from '@components/sections/student/AssessmentsContainer'

type Props = {}

const AssessmentEvidence: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <ESignatures />
        </>
    )
}
AssessmentEvidence.getLayout = (page: ReactElement) => {
    return <StudentLayout title="E-Sign">{page}</StudentLayout>
}

export default AssessmentEvidence
