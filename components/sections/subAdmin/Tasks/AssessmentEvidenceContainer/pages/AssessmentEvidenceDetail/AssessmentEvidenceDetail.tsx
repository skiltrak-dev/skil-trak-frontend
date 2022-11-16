import { useRouter } from 'next/router'

//components
import { LoadingAnimation } from '@components'
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
      {getAssessmentDetails?.isError && 'Error'}
      {getAssessmentDetails?.isLoading ? (
        <LoadingAnimation />
      ) : getAssessmentDetails?.data && getAssessmentDetails?.data?.length ? (
        <AssessmentEvidenceDetailData data={getAssessmentDetails?.data} />
      ) : (
        !getAssessmentDetails?.isError && 'Empty'
      )}
    </>
  )
}
