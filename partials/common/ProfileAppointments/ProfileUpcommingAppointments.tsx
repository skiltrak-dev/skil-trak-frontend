import { LoadingAnimation, NoData, Typography } from '@components'
import { CommonApi } from '@queries'
import React from 'react'
import { ProfileAppointmentsCard } from './ProfileAppointmentsCard'
import { Appointment } from '@types'
import { AppointmentTypeEnum } from './appointment.enum'

export const ProfileUpcommingAppointments = ({
    userId,
    isEntered,
    fullWidth,
    short,
}: {
    userId?: number
    fullWidth?: boolean | undefined
    isEntered: boolean
    short?: boolean
}) => {
    const futureAppointments = CommonApi.Appointments.useBookedAppointments(
        {
            userId,
            status: 'future',
        },
        {
            skip: !isEntered,
            refetchOnMountOrArgChange: 300,
        }
    )
    return (
        <div>
            <Typography variant="label">Upcoming</Typography>
            {futureAppointments.isError ? (
                <NoData text="There is Some technical issue" isError />
            ) : null}
            <div className="flex flex-col gap-y-3 mt-2">
                {futureAppointments.isLoading ? (
                    <div className="flex flex-col items-center justify-center h-60">
                        <LoadingAnimation size={60} />
                        <Typography variant="label">
                            Appointments Loading...
                        </Typography>
                    </div>
                ) : futureAppointments?.data &&
                  futureAppointments?.data?.length > 0 ? (
                    <div
                        className={`grid grid-cols-1 ${
                            fullWidth ? 'lg:grid-cols-2' : ''
                        }  gap-2.5`}
                    >
                        {futureAppointments?.data?.map(
                            (appointment: Appointment) => (
                                <ProfileAppointmentsCard
                                    type={AppointmentTypeEnum.Upcoming}
                                    key={appointment?.id}
                                    appointment={appointment}
                                    upcomming
                                    short={short}
                                />
                            )
                        )}
                    </div>
                ) : (
                    futureAppointments.isSuccess && (
                        <NoData
                            simple={short}
                            text="There is no upcomming appointments"
                        />
                    )
                )}
            </div>
        </div>
    )
}
