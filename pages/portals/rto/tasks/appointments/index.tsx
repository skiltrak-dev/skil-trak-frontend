import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { Button, Typography } from '@components'
import { PastAppointments, UpcomingAppointments } from '@partials/common'
import { useJoyRide } from '@hooks'

type Props = {}

const RtoAppointments: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    const joyride = useJoyRide()
    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 2 })
            }, 1200)
        }
    }, [])
    return (
        <>
            <div className="flex items-center justify-between">
                <Typography>Rto Appointments</Typography>
                <div id="create-appointment">
                    <Button
                        text={'Book Appointment'}
                        variant={'info'}
                        onClick={() => {
                            router.push(
                                '/portals/rto/tasks/appointments/create-appointments'
                            )
                        }}
                    />
                </div>
            </div>

            {/* TODO Not getting the appointments */}
            <UpcomingAppointments />
            <PastAppointments />
        </>
    )
}
RtoAppointments.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout
            pageTitle={{
                title: 'Appointments',
            }}
        >
            {page}
        </RtoLayout>
    )
}

export default RtoAppointments
