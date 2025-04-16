import { CommonApi } from '@queries'
import { Appointment } from '@types'
import React from 'react'
import { AppointmentCard } from '../Card'
import {
    EmptyData,
    LoadingAnimation,
    NoData,
    TechnicalError,
    Typography,
} from '@components'

export const PastAppointments = ({
    userId,
    isEntered,
}: {
    userId: number
    isEntered: boolean
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
            <Typography variant="label" semibold>
                Past Appointments
            </Typography>
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
                ) : pastAppointments?.data &&
                  pastAppointments?.data?.data?.length > 0 ? (
                    pastAppointments?.data?.data?.map(
                        (appointment: Appointment) => (
                            <AppointmentCard
                                type={'Past'}
                                key={appointment?.id}
                                appointment={appointment}
                            />
                        )
                    )
                ) : (
                    pastAppointments.isSuccess && (
                        <NoData text="There is no past appointments" />
                    )
                )}
            </div>
        </div>
    )
}
