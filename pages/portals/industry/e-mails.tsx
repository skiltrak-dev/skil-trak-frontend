import { ReactElement } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { MailTab } from '@components/sections/industry/components'

const EMails: NextPageWithLayout = () => {
    return (
        <div>
            <MailTab />
        </div>
    )
}

EMails.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default EMails
