import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import {
    Typography,
    Button,
    LoadingAnimation,
    EmptyData,
    UpcomingAppointmentCard,
} from '@components'
import { UpcomingAppointments, PastAppointments } from '@partials/rto'
import { useGetRTOAppointmentsQuery } from '@queries'

type Props = {}

const RtoAppointments: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    const rtoAppointments = useGetRTOAppointmentsQuery({ status: 'future' })
    return (
        <>
            <div className="flex items-center justify-between">
                <Typography>Rto Appointments</Typography>
                <Button
                    text={'Create Appointment'}
                    variant={'info'}
                    onClick={() => {
                        router.push(
                            '/portals/rto/tasks/appointments/create-appointments'
                        )
                    }}
                />
            </div>
            <UpcomingAppointments />
            <PastAppointments />
        </>
    )
}
RtoAppointments.getLayout = (page: ReactElement) => {
    return <RtoLayout title="Appointments">{page}</RtoLayout>
}

export default RtoAppointments
