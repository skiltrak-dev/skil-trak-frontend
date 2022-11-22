import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { MemorendumOU } from '@components/sections'

const MOUDetail: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router

  return <div>{/* <MemorendumOU /> */}</div>
}

MOUDetail.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default MOUDetail
