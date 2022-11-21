import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { EmployeeScheduleTabs } from '@components/sections'

const Schedule: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router

  return (
    <div>
      <EmployeeScheduleTabs />
    </div>
  )
}

Schedule.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default Schedule
