import { Student } from '@types'
import {
    AppointmentHeader,
    AppointmentsCount,
    CompletedAppointments,
    UpcomingAppointments,
} from './components'

export const Appointments = ({ student }: { student: Student }) => {
    return (
        <div className="space-y-3">
            {/* Stats Overview */}
            <AppointmentsCount studentId={student?.id} />

            {/* Header */}
            <AppointmentHeader />

            {/* Upcoming Appointments */}
            <UpcomingAppointments studentUserId={student?.user?.id} />

            {/* Completed Appointments */}
            <CompletedAppointments studentUserId={student?.user?.id} />
        </div>
    )
}
