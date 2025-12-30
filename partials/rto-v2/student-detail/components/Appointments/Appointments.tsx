import { Student } from '@types'
import {
    AppointmentHeader,
    AppointmentsCount,
    CompletedAppointments,
    UpcomingAppointments,
} from './components'

import { AppointmentsTabSkeleton } from '../../skeletonLoader'

export const Appointments = ({ student }: { student: Student }) => {
    if (!student) return <AppointmentsTabSkeleton />
    return (
        <div className="space-y-3">
            {/* Stats Overview */}
            <AppointmentsCount studentUserId={student?.user?.id} />

            {/* Header */}
            <AppointmentHeader />

            {/* Upcoming Appointments */}
            <UpcomingAppointments studentUserId={student?.user?.id} />

            {/* Completed Appointments */}
            <CompletedAppointments studentUserId={student?.user?.id} />
        </div>
    )
}
