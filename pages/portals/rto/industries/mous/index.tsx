import { ReactElement } from 'react'
// Layouts
import { RtoLayout } from '@layouts'
//Types
import { NextPageWithLayout } from '@types'
// components
// Link

// query
import { RtoMOUContainer } from '@components/sections'

const RtoMoUs: NextPageWithLayout = () => {
    return <RtoMOUContainer />
}
RtoMoUs.getLayout = (page: ReactElement) => {
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

export default RtoMoUs
