import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { CurrentStudnts } from '@components/sections'
import { TabNavigation, TabProps } from '@components/TabNavigation'

const GeneralInformation: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router

  return <div>GeneralInformation</div>
}

GeneralInformation.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default GeneralInformation
