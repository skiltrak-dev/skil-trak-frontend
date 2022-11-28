import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { MoUContainer } from '@partials/industry'

const MOU: NextPageWithLayout = () => {
    const router = useRouter()
    const { query } = router

    return (
        <div>
            <MoUContainer />
        </div>
    )
}

MOU.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default MOU
