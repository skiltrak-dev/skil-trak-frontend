import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement, useEffect } from 'react'

import { Typography, Button } from '@components'
import { useRouter } from 'next/router'
import { UpcomingAppointments, PastAppointments } from '@partials/common'
import { useJoyRide } from '@hooks'
import { IndustryStudentsLayout } from '@partials/industry'

const Appointments: NextPageWithLayout = () => {
    const router = useRouter()

    // ADD STUDENT JOY RIDE - START
    const joyride = useJoyRide()
    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 2 })
            }, 1200)
        }
    }, [])
    // ADD STUDENT JOY RIDE - END
    return (
        <div>
            <div className="flex items-center justify-between">
                <div id="create-appointment">
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
            </div>
            <UpcomingAppointments />
            <PastAppointments />
        </div>
    )
}

Appointments.getLayout = (page: ReactElement) => {
    return <IndustryStudentsLayout>{page}</IndustryStudentsLayout>
}

export default Appointments
