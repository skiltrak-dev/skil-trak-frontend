import { ReactElement } from 'react'

import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// components
import {
    Button,
    LoadingAnimation,
    TechnicalError,
    EmptyData,
} from '@components'
import { SetScheduleContainer } from '@partials/sub-admin'

type Props = {}

const SetSchedule: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <SetScheduleContainer />
        </>
    )
}
SetSchedule.getLayout = (page: ReactElement) => {
    return <SubAdminLayout pageTitle="Set Scheduled">{page}</SubAdminLayout>
}

export default SetSchedule
