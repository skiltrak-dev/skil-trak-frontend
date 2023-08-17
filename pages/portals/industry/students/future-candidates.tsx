import { FutureCandidatesContainer } from '@components/sections'
import { IndustryLayout } from '@layouts'
import { IndustryStudentsLayout } from '@partials/industry'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const FutureCandidates: NextPageWithLayout = () => {
    const router = useRouter()
    const { query } = router

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
