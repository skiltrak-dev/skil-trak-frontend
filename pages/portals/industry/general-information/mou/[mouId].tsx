import { ReactElement } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { IndustryMOUDetail } from '@components/sections'

const MOUDetails: NextPageWithLayout = () => {
  return (
    <div>
      <IndustryMOUDetail />
    </div>
  )
}

MOUDetails.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default MOUDetails
