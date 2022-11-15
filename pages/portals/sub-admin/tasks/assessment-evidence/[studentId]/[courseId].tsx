import { ReactElement } from 'react'
import { useRouter } from 'next/router'

//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

//components
import { LoadingAnimation } from '@components'
// queries
import { useGetAssessmentEvidenceDetailQuery } from '@queries'

import { AssesmentEvidenceDetail } from '@components/sections'

type Props = {}

const AssessmentEvidenceDetail: NextPageWithLayout = (props: Props) => {
    const pathname = useRouter()
    const courseId = pathname.query.courseId
    const getAssessmentDetails = useGetAssessmentEvidenceDetailQuery(
        String(courseId),
        {
            skip: !courseId,
        }
    )

    return (
        <>
            {getAssessmentDetails?.isError && 'Error'}
            {getAssessmentDetails?.isLoading ? (
                <LoadingAnimation />
            ) : getAssessmentDetails?.data &&
              getAssessmentDetails?.data?.length ? (
                <AssesmentEvidenceDetail data={getAssessmentDetails?.data} />
            ) : (
                !getAssessmentDetails?.isError && 'Empty'
            )}
        </>
    )
}
AssessmentEvidenceDetail.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout title="Assessment Evidence Detail">
            {page}
        </SubAdminLayout>
    )
}

export default AssessmentEvidenceDetail
