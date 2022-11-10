import { ReactElement } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { TabsView } from '@components/sections/rto'

type Props = {}

const Archived: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <TabsView />
            Archived
        </>
    )
}
Archived.getLayout = (page: ReactElement) => {
    return <RtoLayout title="Students">{page}</RtoLayout>
}

export default Archived
