import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { MyTasksContainer } from '@components/sections/industry/MyTasks'

const Tasks: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router

  return (
    <div>
      <MyTasksContainer />
    </div>
  )
}

Tasks.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default Tasks
