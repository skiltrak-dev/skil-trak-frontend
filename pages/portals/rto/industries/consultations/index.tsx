import { ReactElement } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

type Props = {}

const RtoConsultations: NextPageWithLayout = (props: Props) => {
    return <>Rto Consultations</>
}
RtoConsultations.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout
            pageTitle={{
                title: 'Consultations',
                navigateBack: false,
                backTitle: 'Consultations',
            }}
        >
            {page}
        </RtoLayout>
    )
}

export default RtoConsultations
