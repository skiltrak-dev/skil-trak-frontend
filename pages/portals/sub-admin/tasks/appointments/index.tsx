import { useRouter } from 'next/router'

import { ReactElement } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

type Props = {}

const Appointments: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    return <>Appointments</>
}
Appointments.getLayout = (page: ReactElement) => {
    return <StudentLayout title="Create Appointment">{page}</StudentLayout>
}

export default Appointments
