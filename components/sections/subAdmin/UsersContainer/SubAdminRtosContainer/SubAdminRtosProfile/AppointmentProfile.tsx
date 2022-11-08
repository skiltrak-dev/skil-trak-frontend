import {
    PastAppointments,
    UpcomingAppointments,
} from '@components/sections/student'
import React from 'react'

type Props = {}

export const AppointmentProfile = (props: Props) => {
    return (
        <div>
            <UpcomingAppointments />
            <PastAppointments />
        </div>
    )
}
