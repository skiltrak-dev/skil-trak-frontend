import { ReactElement } from 'react'

import { ESignatures } from '@components/sections/student/AssessmentsContainer'
import { IndustryStudentsLayout } from '@partials/industry'
import { NextPageWithLayout } from '@types'

type Props = {}

const AssessmentEvidence: NextPageWithLayout = (props: Props) => {
    return <ESignatures />
}
AssessmentEvidence.getLayout = (page: ReactElement) => {
    return (
        <IndustryStudentsLayout pageTitle={{ title: 'E-Sign' }}>
            {page}
        </IndustryStudentsLayout>
    )
}

export default AssessmentEvidence
