import { useRouter } from 'next/router'

import { ReactElement, useEffect } from 'react'
import { UpcommingAppointments, PastAppointments } from '@partials/common'
import { UpcomingAppointments } from '@components/sections'
import { Button, PageTitle } from '@components'

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
            <div className="flex justify-between items-end mb-4">
                <PageTitle title="Appointments" backTitle="Workplace" />
                <div id="book-appointment">
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
            </div>
            <UpcommingAppointments />
            <PastAppointments />
        </>
    )
}
Appointments.getLayout = (page: ReactElement) => {
    return <StudentLayout>{page}</StudentLayout>
}

export default Appointments
