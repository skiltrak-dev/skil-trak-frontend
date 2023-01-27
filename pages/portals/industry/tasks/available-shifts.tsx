import { ReactElement } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// components
import { Shifts } from '@partials/industry'
import { RedirectUser } from '@components'

const AvailableShifts: NextPageWithLayout = () => {
    return (
        <div>
            {/* <RedirectUser link={'/portals/industry/tasks'} /> */}
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
