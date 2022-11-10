import { ReactElement } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { TabsView } from '@components/sections/rto'

type Props = {}

const Approved: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <TabsView />
            Approved
        </>
    )
}
Approved.getLayout = (page: ReactElement) => {
    return <RtoLayout title="Students">{page}</RtoLayout>
}

export default Approved