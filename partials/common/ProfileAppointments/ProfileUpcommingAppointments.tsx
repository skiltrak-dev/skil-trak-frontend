import { LoadingAnimation, NoData, Typography } from '@components'
import { CommonApi } from '@queries'
import React from 'react'
import { ProfileAppointmentsCard } from './ProfileAppointmentsCard'
import { Appointment } from '@types'

export const ProfileUpcommingAppointments = ({
    userId,
}: {
    userId: number
}) => {
    const futureAppointments = CommonApi.Appointments.useBookedAppointments(
        {
            userId,
            status: 'future',
        }
        // {
        //     skip: !isEntered,
        // }
    )
    return (
        <div>
            <Typography variant="label">Upcoming</Typography>
            {futureAppointments.isError ? (
                <NoData text="There is Some technical issue" />
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
                        {futureAppointments?.data?.map(
                            (appointment: Appointment) => (
                                <ProfileAppointmentsCard
                                    type={'Upcoming'}
                                    key={appointment?.id}
                                    appointment={appointment}
                                />
                            )
                        )}
                    </div>
                ) : (
                    futureAppointments.isSuccess && (
                        <NoData text="There is no upcomming appointments" />
                    )
                )}
            </div>
        </div>
    )
}
