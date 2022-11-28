import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { TasksContainer } from '@partials/industry'

const Tasks: NextPageWithLayout = () => {
    const router = useRouter()
    const { query } = router

    return (
        <div>
            <TasksContainer />
        </div>
    )
}

Tasks.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default Tasks
