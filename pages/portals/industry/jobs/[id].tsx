import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { JobDetailContainer } from '@partials/industry'

const Detail: NextPageWithLayout = () => {
    const router = useRouter()
    const { query } = router

    return (
        <div>
            <JobDetailContainer />
        </div>
    )
}

Detail.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default Detail
