import { AppointmentCard } from './AppointmentCard'
import type { Appointment } from './types'

interface AppointmentsListProps {
    appointments: Appointment[]
    onAppointmentClick: (appointment: Appointment) => void
}

export function AppointmentsList({
    appointments,
    onAppointmentClick,
}: AppointmentsListProps) {
    return (
        <div className="p-4">
            <div className="space-y-3">
                {appointments.map((appointment) => (
                    <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        onClick={() => onAppointmentClick(appointment)}
                    />
                ))}
            </div>
        </div>
    )
}
