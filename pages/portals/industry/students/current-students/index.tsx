import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import { NextPageWithLayout } from '@types'

import { Approved, IndustryStudentsLayout } from '@partials/industry'

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
    return <IndustryStudentsLayout>{page}</IndustryStudentsLayout>
}

export default CurrentStudents
