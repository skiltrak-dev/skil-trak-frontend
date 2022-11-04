import { ReactElement } from 'react'
import { PastAppointments, UpcomingAppointments } from '@components/sections'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'


type Props = {}

const Appointments: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <UpcomingAppointments />
            <PastAppointments />
        </>
    )
}
Appointments.getLayout = (page: ReactElement) => {
    return <StudentLayout title="Appointments">{page}</StudentLayout>
}

export default Appointments
