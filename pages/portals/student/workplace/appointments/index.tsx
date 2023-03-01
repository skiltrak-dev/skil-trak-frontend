import { useRouter } from 'next/router'

import { ReactElement, useEffect } from 'react'
import { UpcomingAppointments, PastAppointments } from '@partials/common'
// import { UpcomingAppointments } from '@components/sections'
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
            <div className="flex flex-col md:flex-row gap-y-1.5 justify-between md:items-end mb-4">
                <PageTitle title="Appointments" backTitle="Workplace" />
                <div id="book-appointment" className="flex-shrink-0 ml-auto">
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
            <UpcomingAppointments />
            <PastAppointments />
        </>
    )
}
Appointments.getLayout = (page: ReactElement) => {
    return <StudentLayout>{page}</StudentLayout>
}

export default Appointments
