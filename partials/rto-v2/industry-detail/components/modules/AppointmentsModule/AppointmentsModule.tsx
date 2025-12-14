import { useState } from 'react'
import { Card } from '@components'
import {
    AppointmentsHeader,
    AppointmentsList,
    type ViewType,
    type StatusFilter,
} from './components'
import { CommonApi } from '@queries'
import { useAppSelector } from '@redux/hooks'
import { ScheduleAppointmentModal } from '@partials/rto-v2/appointments'
import { UserRoles } from '@constants'
import { AppointmentViewModal } from '@components/Appointment/AppointmentModal/AppointmentViewModal'
import moment from 'moment'

export function AppointmentsModule() {
    const [showNewAppointment, setShowNewAppointment] = useState(false)
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<
        number | null
    >(null)

    const industryDetail = useAppSelector(
        (state) => state.industry.industryDetail
    )

    // Fetch Appointments
    const { data: appointmentsData, isLoading } =
        CommonApi.Appointments.useBookedAppointments(
            {
                userId: industryDetail?.user?.id,
                // status: 'all', // Fetch all and filter locally or relies on API
            },
            {
                skip: !industryDetail?.user?.id,
                refetchOnMountOrArgChange: true,
            }
        )

    // Map API data to Local Component Data
    const mappedAppointments =
        appointmentsData?.map((apt: any) => ({
            id: apt.id,
            title: apt?.type?.title || 'Appointment',
            date: moment(apt.date).format('MMMM DD, YYYY'),
            time: `${moment(apt.startTime, 'HH:mm:ss').format(
                'hh:mm A'
            )} - ${moment(apt.endTime, 'HH:mm:ss').format('hh:mm A')}`,
            type: (apt?.type?.title?.toLowerCase().replace(' ', '-') ||
                'meeting') as any, // unsafe cast but works for UI mapping usually
            status:
                moment(apt.date).isBefore(moment(), 'day') || apt.isSuccessfull
                    ? 'completed'
                    : 'upcoming',
            location: 'Online', // Default or get from address
            attendees: [
                apt.appointmentBy?.name,
                apt.appointmentFor?.name,
            ].filter(Boolean),
            description: apt.note || 'No description provided',
            color: apt?.type?.color || '#044866',
            attachments: 0, // API doesn't seem to return attachment count in list?
        })) || []

    const upcomingCount =
        mappedAppointments.filter((a: any) => a.status === 'upcoming').length ||
        0

    return (
        <div className="space-y-4">
            {/* Appointments Section */}
            <Card className="overflow-hidden shadow-md">
                {/* Header */}
                <AppointmentsHeader
                    onNewAppointment={() => setShowNewAppointment(true)}
                />

                {/* Controls - (Optional, keeping commented out as per original) */}
                {/* <AppointmentsControls ... /> */}

                {/* Appointments List */}
                {isLoading ? (
                    <div className="p-8 text-center text-slate-500">
                        Loading appointments...
                    </div>
                ) : (
                    <AppointmentsList
                        appointments={mappedAppointments}
                        onAppointmentClick={(apt) =>
                            setSelectedAppointmentId(apt.id)
                        }
                    />
                )}
            </Card>

            {/* New Appointment Modal */}
            <ScheduleAppointmentModal
                scheduleOpen={showNewAppointment}
                setScheduleOpen={setShowNewAppointment}
                defaultSelectedParicipantType={UserRoles.INDUSTRY}
                defaultSelectedUser={industryDetail?.user}
            />

            {/* Appointment Details Modal */}
            {selectedAppointmentId && (
                <AppointmentViewModal
                    id={selectedAppointmentId}
                    onCancel={() => setSelectedAppointmentId(null)}
                    upcomming={true} // Passed as prop but logic handles inside
                />
            )}
        </div>
    )
}
