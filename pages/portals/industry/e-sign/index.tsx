import { ReactElement } from 'react'

import { ESignatures } from '@components/sections/student/AssessmentsContainer'
import { IndustryStudentsLayout } from '@partials/industry'
import { NextPageWithLayout } from '@types'
import { Typography } from '@components'

type Props = {}

const AssessmentEvidence: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <div className="py-5 px-10 text-center">
                <Typography variant={'label'} color="text-primaryNew" center>
                    We are pleased to present E-Sign Facility, which will
                    automate and simplify your documentation procedure. E-sign
                    simplifies approval processes, minimizes paperwork, and
                    guarantees smooth, effective document management
                    contributing to increased productivity and compliance.
                </Typography>
            </div>
            <ESignatures />
        </>
    )
}
AssessmentEvidence.getLayout = (page: ReactElement) => {
    return (
        <IndustryStudentsLayout pageTitle={{ title: 'E-Sign' }}>
            {page}
        </IndustryStudentsLayout>
    )
}

export default AssessmentEvidence
