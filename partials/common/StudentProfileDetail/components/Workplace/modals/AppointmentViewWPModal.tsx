import { GlobalModal, Typography } from '@components'
import { AppointmentTypeEnum } from '@partials/common/ProfileAppointments/appointment.enum'
import { ProfileUpcomingAppointmentCard } from '@partials/common/ProfileAppointments/ProfileUpcomingAppointmentCard'
import { Appointment } from '@types'
import { MdCancel } from 'react-icons/md'

export const AppointmentViewWPModal = ({
    onCancel,
    appointment,
}: {
    onCancel: () => void
    appointment: Appointment
}) => {
    return (
        <GlobalModal>
            <div className="max-w-4xl px-5 py-3 relative flex flex-col gap-y-2 ">
                <div className="flex justify-between items-center">
                    <Typography bold>Current Appointment</Typography>
                    <MdCancel
                        onClick={onCancel}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                </div>
                <ProfileUpcomingAppointmentCard
                    upcomming
                    appointment={appointment}
                    type={AppointmentTypeEnum.Upcoming}
                />
            </div>
        </GlobalModal>
    )
}
