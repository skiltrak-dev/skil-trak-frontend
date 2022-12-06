import { ReactElement } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

type Props = {}

const RtoESigns: NextPageWithLayout = (props: Props) => {
    return <>Rto ESigns</>
}
RtoESigns.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout
            pageTitle={{
                title: 'E-Signs',
            }}
        >
            {page}
        </RtoLayout>
    )
}

export default RtoESigns
