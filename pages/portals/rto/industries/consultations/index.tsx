import { ReactElement } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

type Props = {}

const RtoConsultations: NextPageWithLayout = (props: Props) => {
    return <>Rto Consultations</>
}
RtoConsultations.getLayout = (page: ReactElement) => {
    return <RtoLayout title="Consultations">{page}</RtoLayout>
}

export default RtoConsultations
