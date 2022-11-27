import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { JobsContainer } from '@partials/industry'


const Jobs: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router

  return (
    <div>
      <JobsContainer />
    </div>
  )
}

Jobs.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default Jobs
