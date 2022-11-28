import { IndustryLayout } from '@layouts'
import { BrowseCandidatesContainer } from '@partials/industry'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'


const BrowseCandidates: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router

  return (
    <div>
      <BrowseCandidatesContainer />
    </div>
  )
}

BrowseCandidates.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default BrowseCandidates
