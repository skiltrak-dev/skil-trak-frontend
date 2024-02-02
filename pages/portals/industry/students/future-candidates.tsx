import { FutureCandidatesContainer } from '@components/sections'
import { IndustryLayout } from '@layouts'
import { IndustryStudentsLayout } from '@partials/industry'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

const FutureCandidates: NextPageWithLayout = () => {
    const router = useRouter()
    const { query } = router

    useEffect(() => {
        router.back()
    }, [])

    return (
        <div>
            <FutureCandidatesContainer />
        </div>
    )
}

FutureCandidates.getLayout = (page: ReactElement) => {
    return <IndustryStudentsLayout>{page}</IndustryStudentsLayout>
}

export default FutureCandidates
