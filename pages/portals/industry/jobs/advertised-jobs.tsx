import { IndustryLayout } from '@layouts'
import { AdvertisedJobsContainer } from '@partials/industry'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

const AdvertisedJobs: NextPageWithLayout = () => {
    return (
        <div>
            <AdvertisedJobsContainer />
        </div>
    )
}

AdvertisedJobs.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default AdvertisedJobs
