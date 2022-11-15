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

  return (
    <>
      <AssesmentEvidenceDetail courseId={courseId} />
    </>
  )
}
AssessmentEvidenceDetail.getLayout = (page: ReactElement) => {
  return (
    <SubAdminLayout title="Assessment Evidence Detail">{page}</SubAdminLayout>
  )
}

export default AssessmentEvidenceDetail
