import { ReactElement } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

type Props = {}

const RtoAppointments: NextPageWithLayout = (props: Props) => {
    return <>Rto Appointments</>
}
RtoAppointments.getLayout = (page: ReactElement) => {
    return <RtoLayout title="Appointments">{page}</RtoLayout>
}

export default RtoAppointments
