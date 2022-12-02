import { ReactElement } from 'react'
import { useRouter } from 'next/router'

//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

//components
import { LoadingAnimation } from '@components'
// queries
import { useGetAssessmentEvidenceDetailQuery } from '@queries'

// import { AssesmentEvidenceDetail } from '@components/sections'
import { AssessmentEvidenceDetailData } from '@components/sections/subAdmin/Tasks/AssessmentEvidenceContainer/pages/AssessmentEvidenceDetail/components'

type Props = {}

const AssessmentEvidenceDetails: NextPageWithLayout = (props: Props) => {
  const pathname = useRouter()
  const courseId = pathname.query.courseId

  return (
    <>
      <AssessmentEvidenceDetailData courseId={courseId} />
    </>
  )
}
AssessmentEvidenceDetails.getLayout = (page: ReactElement) => {
  return (
    <SubAdminLayout pageTitle={{
      title: 'Assessment Evidence Detail',
      navigateBack: true,
      backTitle: 'Back',
    }}>{page}</SubAdminLayout>
  )
}

export default AssessmentEvidenceDetails
