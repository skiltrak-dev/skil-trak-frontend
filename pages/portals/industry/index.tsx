import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { IndustryDashboardContainer } from '@components/sections/industry/Dashboard'
import { useContextBar } from '@hooks'

const IndustryDashboard: NextPageWithLayout = () => {
  const contextBar = useContextBar()
  const router = useRouter()

  useEffect(() => {
    contextBar.show(false)
  }, [])

  return (
    <div>
      <IndustryDashboardContainer />
    </div>
  )
}

IndustryDashboard.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default IndustryDashboard
