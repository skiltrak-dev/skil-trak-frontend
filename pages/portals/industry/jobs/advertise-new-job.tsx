import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { AdvertiseNewJobContainer } from '@components/sections/industry/JobsContainer'

const AdvertisesNewJob: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router

  return (
    <div>
      <AdvertiseNewJobContainer />
    </div>
  )
}

AdvertisesNewJob.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default AdvertisesNewJob
