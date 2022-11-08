import { ReactElement } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { TabsView } from '@components/sections/rto'

type Props = {}

const Rejected: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <TabsView />
            Rejected
        </>
    )
}
Rejected.getLayout = (page: ReactElement) => {
    return <RtoLayout title="Students">{page}</RtoLayout>
}

export default Rejected
