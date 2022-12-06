import { ReactElement } from 'react'
// Layouts
import { RtoLayout } from '@layouts'
//Types
import { NextPageWithLayout } from '@types'

// components
import { RTOMOUDetail } from '@components/sections'

const MouDetail: NextPageWithLayout = () => {
    return (
        <>
            <RTOMOUDetail />
        </>
    )
}
MouDetail.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout
            pageTitle={{
                title: 'MoUs',
            }}
        >
            {page}
        </RtoLayout>
    )
}

export default MouDetail
