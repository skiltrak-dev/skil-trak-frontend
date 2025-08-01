import { LoadingAnimation, NoData, Typography } from '@components'
import { CommonApi } from '@queries'
import { Appointment } from '@types'
import moment from 'moment'
import { AppointmentTypeEnum } from './appointment.enum'
import { ProfileAppointmentsCard } from './ProfileAppointmentsCard'
import { ProfileUpcomingAppointmentCard } from './ProfileUpcomingAppointmentCard'

export const ProfilePastAppointments = ({
    userId,
    fullWidth,
    isEntered,
    short,
}: {
    fullWidth?: boolean | undefined
    userId?: number
    isEntered: boolean
    short?: boolean
}) => {
    const pastAppointments = CommonApi.Appointments.useBookedAppointments(
        {
            userId,
            status: 'past',
        },
        {
            skip: !isEntered,
        }
    )

    return (
        <div className="h-auto flex flex-col gap-2">
            <Typography variant="label">Past</Typography>

            <div className="flex flex-col gap-y-3">
                {pastAppointments.isError ? (
                    <NoData text="There is Some technical issue" isError />
                ) : null}
                {pastAppointments.isLoading ? (
                    <div className="flex flex-col items-center justify-center h-60">
                        <LoadingAnimation size={60} />
                        <Typography variant="label">
                            Appointments Loading...
                        </Typography>
                    </div>
                ) : pastAppointments?.data?.data &&
                  pastAppointments?.data?.data?.length > 0 ? (
                    <div
                        className={`grid grid-cols-1 ${
                            fullWidth ? 'lg:grid-cols-2' : ''
                        }  gap-2.5`}
                    >
                        {pastAppointments?.data?.data?.map(
                            (appointment: Appointment) =>
                                appointment?.isSuccessfull === null &&
                                moment(appointment?.date).isSameOrAfter(
                                    '2025-08-01',
                                    'day'
                                ) ? (
                                    <ProfileUpcomingAppointmentCard
                                        type={AppointmentTypeEnum.Upcoming}
                                        key={appointment?.id}
                                        appointment={appointment}
                                        upcomming
                                        short={short}
                                    />
                                ) : (
                                    <ProfileAppointmentsCard
                                        type={AppointmentTypeEnum.Past}
                                        key={appointment?.id}
                                        appointment={appointment}
                                        short={short}
                                    />
                                )
                        )}
                    </div>
                ) : (
                    pastAppointments.isSuccess && (
                        <NoData
                            simple={short}
                            text="There is no past appointments"
                        />
                    )
                )}
            </div>
        </div>
    )
}
