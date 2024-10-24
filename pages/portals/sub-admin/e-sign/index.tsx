import { ReactElement } from 'react'

import { ESignatures } from '@components/sections/student/AssessmentsContainer'
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { SubadminESign } from '@partials/sub-admin'

type Props = {}

const ESignnn: NextPageWithLayout = (props: Props) => {
    return <SubadminESign />
}
ESignnn.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'E-Sign' }}>{page}</SubAdminLayout>
    )
}

export default ESignnn
