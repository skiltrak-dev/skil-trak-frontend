import { ReactElement } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// components
import { Shifts } from '@partials/industry'

const AvailableShifts: NextPageWithLayout = () => {
    return (
        <div>
            <Shifts />
        </div>
    )
}

AvailableShifts.getLayout = (page: ReactElement) => {
    return (
        <IndustryLayout pageTitle={{ title: 'Available Shifts' }}>
            {page}
        </IndustryLayout>
    )
}

export default AvailableShifts
