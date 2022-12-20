import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { CurrentStudnts } from '@components/sections'
import { TabNavigation, TabProps } from '@components/TabNavigation'
import { MailsTab } from '@components/sections/industry/components'

const EMails: NextPageWithLayout = () => {
    return (
        <div>
            <MailsTab />
        </div>
    )
}

EMails.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default EMails
