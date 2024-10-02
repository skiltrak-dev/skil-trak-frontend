import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import { NextPageWithLayout } from '@types'

import { IndustryLayout } from '@layouts'
import { Approved } from '@partials/industry'

const CurrentStudents: NextPageWithLayout = () => {
    const router = useRouter()
    const { query } = router

    useEffect(() => {
        if (!Object.keys(query).length) {
            router.push('./current-students?tab=pending')
        }
    }, [query])

    return (
        <div>
            <Approved />
        </div>
    )
}

CurrentStudents.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default CurrentStudents
