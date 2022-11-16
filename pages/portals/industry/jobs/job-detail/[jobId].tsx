import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { JobDetailContainer } from '@components/sections/industry/JobsContainer'

const JobDetail: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router

  return (
    <div>
      <JobDetailContainer />
    </div>
  )
}

JobDetail.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default JobDetail
