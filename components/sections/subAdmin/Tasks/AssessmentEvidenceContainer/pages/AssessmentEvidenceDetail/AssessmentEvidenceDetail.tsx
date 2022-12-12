import { useRouter } from 'next/router'

//components
import { LoadingAnimation, TechnicalError, EmptyData } from '@components'
// queries
import { useGetAssessmentEvidenceDetailQuery } from '@queries'

import { AssessmentEvidenceDetailData } from './components'

type Props = {
    courseId: any
}

export const AssesmentEvidenceDetail = ({ courseId }: Props) => {
    const getAssessmentDetails = useGetAssessmentEvidenceDetailQuery(
        String(courseId),
        {
            skip: !courseId,
        }
    )

    return (
        <>
            {getAssessmentDetails?.isError && <TechnicalError />}
            {getAssessmentDetails?.isLoading ? (
                <LoadingAnimation />
            ) : getAssessmentDetails?.data &&
              getAssessmentDetails?.data?.length ? (
                <AssessmentEvidenceDetailData
                    data={getAssessmentDetails?.data}
                />
            ) : (
                !getAssessmentDetails?.isError && (
                    <EmptyData
                        imageUrl="/images/icons/common/assessments.png"
                        title="No Assessment Submissions"
                        description="This student has not submitted any evidence yet"
                        height='40vh'
                    />
                )
            )}
        </>
    )
}
