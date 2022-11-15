import { AdvertisedJobs } from '@components/sections/industry/JobsContainer'
import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

const AdvertisesJobs: NextPageWithLayout = () => {
  return (
    <div>
      <AdvertisedJobs />
    </div>
  )
}

AdvertisesJobs.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default AdvertisesJobs
