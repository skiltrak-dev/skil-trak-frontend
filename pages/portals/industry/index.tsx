import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { CurrentStudnts } from '@components/sections'
import { TabNavigation, TabProps } from '@components/TabNavigation'

const IndustryDashboard: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router

  return <div>IndustryDashboard</div>
}

IndustryDashboard.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default IndustryDashboard
