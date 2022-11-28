import { ReactElement } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { IndustryMOUDetail } from '@partials/industry'

const MOUDetails: NextPageWithLayout = () => {
    return (
        <div>
            <IndustryMOUDetail />
        </div>
    )
}

MOUDetails.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default MOUDetails
