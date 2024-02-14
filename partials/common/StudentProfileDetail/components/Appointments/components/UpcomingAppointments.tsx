import React from 'react'
import { AppointmentCard } from '../Card'
import { CommonApi } from '@queries'
import { Appointment } from '@types'
import { LoadingAnimation, Typography } from '@components'

export const UpcomingAppointments = ({ userId }: { userId: number }) => {
    const futureAppointments = CommonApi.Appointments.useBookedAppointments({
        userId,
        status: 'future',
    })
    return (
        <div className="h-[350px] custom-scrollbar overflow-auto">
            <div className="flex flex-col gap-y-3">
                {futureAppointments.isLoading ? (
                    <div className="flex flex-col items-center justify-center h-60">
                        <LoadingAnimation size={60} />
                        <Typography variant="label">
                            Appointments Loading...
                        </Typography>
                    </div>
                ) : (
                    futureAppointments?.data?.map(
                        (appointment: Appointment) => (
                            <AppointmentCard
                                type={'Upcoming'}
                                key={appointment?.id}
                                appointment={appointment}
                            />
                        )
                    )
                )}
            </div>
        </div>
    )
}
