import { ReactElement } from 'react'

import { SubAdminLayout } from '@layouts'
import { SubadminESign } from '@partials/sub-admin'
import { NextPageWithLayout } from '@types'

type Props = {}

const ESignnn: NextPageWithLayout = () => {
    return <SubadminESign />
}
ESignnn.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'E-Sign' }}>{page}</SubAdminLayout>
    )
}

export default ESignnn
