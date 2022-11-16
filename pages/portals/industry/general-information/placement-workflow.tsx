import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { CurrentStudnts } from '@components/sections'
import { TabNavigation, TabProps } from '@components/TabNavigation'

const PlacementWorkflow: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router

  return <div>PlacementWorkflow</div>
}

PlacementWorkflow.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default PlacementWorkflow
