import { ReactElement } from 'react'

import { ESignatures } from '@components/sections/student/AssessmentsContainer'
import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

type Props = {}

const AssessmentEvidence: NextPageWithLayout = (props: Props) => {
    return <ESignatures />
}
AssessmentEvidence.getLayout = (page: ReactElement) => {
    return <RtoLayout pageTitle={{ title: 'E-Sign' }}>{page}</RtoLayout>
}

export default AssessmentEvidence
