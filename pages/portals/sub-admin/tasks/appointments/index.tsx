import { useRouter } from 'next/router'

import { ReactElement } from 'react'

import { StudentLayout, SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { Typography, Button } from '@components'
import {
    PastAppointments,
    UpcomingAppointments,
} from '@components/sections/subAdmin'

type Props = {}

const Appointments: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    return (
        <div>
            <div className="flex justify-between items-center">
                <Typography>Appointments</Typography>
                <Button
                    variant={'info'}
                    text={'Create Appointments'}
                    onClick={() => {
                        router.push(
                            '//portals/sub-admin/tasks/appointments/create-appointment'
                        )
                    }}
                />
            </div>
            <UpcomingAppointments />
            <PastAppointments />
        </div>
    )
}
Appointments.getLayout = (page: ReactElement) => {
    return <SubAdminLayout title="Create Appointment">{page}</SubAdminLayout>
}

export default Appointments
