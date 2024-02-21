import { CommonApi } from '@queries'
import { Appointment } from '@types'
import React from 'react'
import { AppointmentCard } from '../Card'
import { EmptyData, LoadingAnimation, Typography } from '@components'

export const CancelledAppointments = ({ userId }: { userId: number }) => {
    const cancelledAppointments = CommonApi.Appointments.useBookedAppointments({
        userId,
        status: 'past',
    })
    return (
        <div className="h-[350px] custom-scrollbar overflow-auto">
            <div className="flex flex-col gap-y-3">
                {cancelledAppointments.isLoading ? (
                    <div className="flex flex-col items-center justify-center h-60">
                        <LoadingAnimation size={60} />
                        <Typography variant="label">
                            Appointments Loading...
                        </Typography>
                    </div>
                ) : cancelledAppointments?.data &&
                  cancelledAppointments?.data?.length > 0 ? (
                    cancelledAppointments?.data?.data?.map(
                        (appointment: Appointment) => (
                            <AppointmentCard
                                type={'Past'}
                                key={appointment?.id}
                                appointment={appointment}
                            />
                        )
                    )
                ) : (
                    cancelledAppointments.isSuccess && (
                        <EmptyData
                            imageUrl={
                                '/images/icons/placement-progress/appointment.png'
                            }
                            title="No Cancelled Appointment Found"
                            description="No Cancelled Appointment Found"
                            height="40vh"
                        />
                    )
                )}
            </div>
        </div>
    )
}
