import { useRouter } from 'next/router'

import { ReactElement, useEffect } from 'react'
import { PastAppointments, UpcomingAppointments } from '@components/sections'
import { Button } from '@components'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useJoyRide } from '@hooks'

type Props = {}

const Appointments: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    // APPOINTMENTS JOY RIDE - END
    const joyride = useJoyRide()
    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 2 })
            }, 1200)
        }
    }, [])
    // APPOINTMENTS JOY RIDE - END
    return (
        <>
            <div
                id="book-appointment"
                className="flex items-center justify-end"
            >
                <Button
                    text={'Book Appointment'}
                    variant={'info'}
                    onClick={() => {
                        router.push(
                            '/portals/student/workplace/book-appointment'
                        )
                    }}
                />
            </div>
            <UpcomingAppointments />
            <PastAppointments />
        </>
    )
}
Appointments.getLayout = (page: ReactElement) => {
    return <StudentLayout title="Appointments">{page}</StudentLayout>
}

export default Appointments
