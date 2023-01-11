import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { TasksContainer } from '@partials/industry'
import { RPLForm } from '@components/sections/industry/ApplyForRPL/forms/RPLForm/RPLForm'
const ApplyForRpl: NextPageWithLayout = () => {
    const router = useRouter()
    const { query } = router

    return (
        <div>
            <RPLForm />
        </div>
    )
}

ApplyForRpl.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default ApplyForRpl