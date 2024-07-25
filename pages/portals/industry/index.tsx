import { ReactElement } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { IndustryDashboardContainer } from '@components/sections'
import { IndustryUpdatedDashboard } from '@partials/industry'

const IndustryDashboard: NextPageWithLayout = () => {
    return <IndustryUpdatedDashboard />
    return (
        <div>
            <IndustryDashboardContainer />
        </div>
    )
}

IndustryDashboard.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default IndustryDashboard
