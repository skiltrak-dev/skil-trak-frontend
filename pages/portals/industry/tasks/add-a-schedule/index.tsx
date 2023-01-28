import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { AddScheduleContainer } from '@partials/industry'

// components
import { RedirectUser } from '@components'

const AddSchedule: NextPageWithLayout = () => {
    const router = useRouter()
    const { query } = router

    return (
        <div>
            <AddScheduleContainer />
        </div>
    )
}

AddSchedule.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default AddSchedule
