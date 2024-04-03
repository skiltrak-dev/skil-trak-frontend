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

export const CancelledAppointments = ({
    isEntered,
    userId,
}: {
    userId: number
    isEntered: boolean
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
            <Typography variant="label" semibold>
                Cancelled Appointments
            </Typography>
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
                    cancelledAppointments?.data?.map(
                        (appointment: Appointment) => (
                            <AppointmentCard
                                type={'Cancelled'}
                                key={appointment?.id}
                                appointment={appointment}
                            />
                        )
                    )
                ) : (
                    cancelledAppointments.isSuccess && (
                        <NoData text="There is no cancelled appointments" />
                    )
                )}
            </div>
        </div>
    )
}
