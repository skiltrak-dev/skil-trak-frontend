import { ReactElement } from 'react'

import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import { useGetSubAdminWorkplacesQuery } from '@queries'

// components
import {
    Button,
    LoadingAnimation,
    TechnicalError,
    EmptyData,
} from '@components'
import { SetUnavailabilityContainer } from '@partials/sub-admin'

type Props = {}

const SetUnavailability: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <SetUnavailabilityContainer />
        </>
    )
}
SetUnavailability.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout
            pageTitle={{
                title: 'Set Unavailability',
                backTitle: 'Back',
                navigateBack: true,
            }}
        >
            {page}
        </SubAdminLayout>
    )
}

export default SetUnavailability
