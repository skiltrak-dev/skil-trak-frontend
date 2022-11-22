import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { PlacementWorkflowContainer } from '@components/sections'

const PlacementWorkflow: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router

  return (
    <div>
      <PlacementWorkflowContainer />
    </div>
  )
}

PlacementWorkflow.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default PlacementWorkflow
