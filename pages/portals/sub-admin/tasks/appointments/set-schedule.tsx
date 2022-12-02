import { ReactElement } from 'react'

import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { SetScheduleContainer } from '@partials'

// components
import {
    Button,
    LoadingAnimation,
    TechnicalError,
    EmptyData,
} from '@components'

type Props = {}

const SetSchedule: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <SetScheduleContainer />
        </>
    )
}
SetSchedule.getLayout = (page: ReactElement) => {
    return <SubAdminLayout pageTitle={{
        title: 'Set Scheduled',
        navigateBack: true,
        backTitle: 'Back',
    }}>{page}</SubAdminLayout>
}

export default SetSchedule
