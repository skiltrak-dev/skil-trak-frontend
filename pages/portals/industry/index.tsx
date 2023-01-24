import { ReactElement, useEffect, useState } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { IndustryDashboardContainer } from '@components/sections/industry/Dashboard'
import { ActionAlert, Typography, Modal } from '@components'

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
