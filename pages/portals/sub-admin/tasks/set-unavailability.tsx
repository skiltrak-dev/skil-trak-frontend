import { ReactElement } from 'react'

import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { SetUnavailabilityContainer } from '@partials'

// query
import { useGetSubAdminWorkplacesQuery } from '@queries'

// components
import {
    Button,
    LoadingAnimation,
    TechnicalError,
    EmptyData,
} from '@components'

type Props = {}

const SetUnavailability: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <SetUnavailabilityContainer />
        </>
    )
}
SetUnavailability.getLayout = (page: ReactElement) => {
    return <SubAdminLayout title="Set Un Availability">{page}</SubAdminLayout>
}

export default SetUnavailability
