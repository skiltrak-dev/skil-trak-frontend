import React from 'react'
import { AppointmentCard } from '../Card'
import { CommonApi } from '@queries'
import { Appointment } from '@types'
import {
    EmptyData,
    LoadingAnimation,
    NoData,
    TechnicalError,
    Typography,
} from '@components'

export const UpcomingAppointments = ({ userId }: { userId: number }) => {
    const futureAppointments = CommonApi.Appointments.useBookedAppointments({
        userId,
        status: 'future',
    })
    return (
        <div className="h-auto flex flex-col gap-2">
            <Typography variant="label" semibold>
                Upcoming Appointments
            </Typography>
            {futureAppointments.isError ? (
                <NoData text="There is Some technical issue" />
            ) : null}
            <div className="flex flex-col gap-y-3">
                {futureAppointments.isLoading ? (
                    <div className="flex flex-col items-center justify-center h-60">
                        <LoadingAnimation size={60} />
                        <Typography variant="label">
                            Appointments Loading...
                        </Typography>
                    </div>
                ) : futureAppointments?.data &&
                  futureAppointments?.data?.length > 0 ? (
                    futureAppointments?.data?.map(
                        (appointment: Appointment) => (
                            <AppointmentCard
                                type={'Upcoming'}
                                key={appointment?.id}
                                appointment={appointment}
                            />
                        )
                    )
                ) : (
                    futureAppointments.isSuccess && (
                        <NoData text="There is no upcomming appointments" />
                    )
                )}
            </div>
        </div>
    )
}
