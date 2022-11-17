import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { UnitRequirementsContainer } from '@components/sections'

const UnitRequirements: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router

  return (
    <div>
      <UnitRequirementsContainer />
    </div>
  )
}

UnitRequirements.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default UnitRequirements
