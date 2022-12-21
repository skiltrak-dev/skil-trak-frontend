import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

import { Typography, Button } from '@components'
import { useRouter } from 'next/router'
import { UpcomingAppointments, PastAppointments } from '@partials/industry'

const Appointments: NextPageWithLayout = () => {
    const router = useRouter()
    return (
        <div>
            <div className="flex items-center justify-between">
                <Typography>Rto Appointments</Typography>
                <Button
                    text={'Create Appointment'}
                    variant={'info'}
                    onClick={() => {
                        router.push(
                            '/portals/industry/students/appointments/book-appointments'
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
    return <IndustryLayout>{page}</IndustryLayout>
}

export default Appointments
