import React from 'react'
import { PastAppointments, UpcomingAppointments } from '../appointments'

export const AppointmentTab = ({ userId }: { userId: number }) => {
    return (
        <div>
            <UpcomingAppointments userId={userId} />
            <PastAppointments userId={userId} />
        </div>
    )
}
