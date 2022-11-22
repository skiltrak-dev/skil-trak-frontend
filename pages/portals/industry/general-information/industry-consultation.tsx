import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { IndustryConsultationContainer } from '@components/sections'

const IndustryConsultation: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router

  return (
    <div>
      <IndustryConsultationContainer />
    </div>
  )
}

IndustryConsultation.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default IndustryConsultation
