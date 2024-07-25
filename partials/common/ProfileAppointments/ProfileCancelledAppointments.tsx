import { LoadingAnimation, NoData, Typography } from '@components'
import { CommonApi } from '@queries'
import { Appointment } from '@types'
import { ProfileAppointmentsCard } from './ProfileAppointmentsCard'
import { AppointmentTypeEnum } from './appointment.enum'

export const ProfileCancelledAppointments = ({
    isEntered,
    userId,
    fullWidth,
    short,
}: {
    fullWidth?: boolean | undefined
    userId?: number
    isEntered: boolean
    short?: boolean
}) => {
    const cancelledAppointments = CommonApi.Appointments.useBookedAppointments(
        {
            userId,
            status: 'cancelled',
        },
        {
            skip: !isEntered,
        }
    )
    return (
        <div className="h-auto flex flex-col gap-2">
            <Typography variant="label">Cancelled</Typography>
            <div className="flex flex-col gap-y-3">
                {cancelledAppointments.isError ? (
                    <NoData text="There is Some technical issue" />
                ) : null}
                {cancelledAppointments.isLoading ? (
                    <div className="flex flex-col items-center justify-center h-60">
                        <LoadingAnimation size={60} />
                        <Typography variant="label">
                            Appointments Loading...
                        </Typography>
                    </div>
                ) : cancelledAppointments?.data &&
                  cancelledAppointments?.data?.length > 0 ? (
                    <div
                        className={`grid grid-cols-1 ${
                            fullWidth ? 'lg:grid-cols-2' : ''
                        }  gap-2.5`}
                    >
                        {cancelledAppointments?.data?.map(
                            (appointment: Appointment) => (
                                <ProfileAppointmentsCard
                                    type={AppointmentTypeEnum.Cancelled}
                                    key={appointment?.id}
                                    appointment={appointment}
                                    short={short}
                                />
                            )
                        )}
                    </div>
                ) : (
                    cancelledAppointments.isSuccess && (
                        <NoData
                            simple={short}
                            text="There is no cancelled appointments"
                        />
                    )
                )}
            </div>
        </div>
    )
}
