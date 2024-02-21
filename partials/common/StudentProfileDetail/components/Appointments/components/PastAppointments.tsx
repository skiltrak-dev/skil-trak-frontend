import { CommonApi } from '@queries'
import { Appointment } from '@types'
import React from 'react'
import { AppointmentCard } from '../Card'
import { EmptyData, LoadingAnimation, Typography } from '@components'

export const PastAppointments = ({ userId }: { userId: number }) => {
    const pastAppointments = CommonApi.Appointments.useBookedAppointments({
        userId,
        status: 'past',
    })
    return (
        <div className="h-[350px] custom-scrollbar overflow-auto">
            <div className="flex flex-col gap-y-3">
                {pastAppointments.isLoading ? (
                    <div className="flex flex-col items-center justify-center h-60">
                        <LoadingAnimation size={60} />
                        <Typography variant="label">
                            Appointments Loading...
                        </Typography>
                    </div>
                ) : pastAppointments?.data &&
                  pastAppointments?.data?.length > 0 ? (
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
                        <EmptyData
                            imageUrl={
                                '/images/icons/placement-progress/appointment.png'
                            }
                            title="No Past Appointment Found"
                            description="No Past Appointment Found"
                            height="40vh"
                        />
                    )
                )}
            </div>
        </div>
    )
}
