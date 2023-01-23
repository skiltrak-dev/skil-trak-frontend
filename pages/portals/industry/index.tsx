import { ReactElement } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { IndustryDashboardContainer } from '@components/sections/industry/Dashboard'

const IndustryDashboard: NextPageWithLayout = () => {
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
