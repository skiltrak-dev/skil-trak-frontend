import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const UpdateJob: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router

  return <div>UpdateJob</div>
}

UpdateJob.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default UpdateJob
