import React from 'react'
import { Typography, EmptyData, PastAppointmentCard } from '@components'
import { Switch } from '@components/inputs'

// query
import { useGetStudentAppointmentsQuery } from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'
import { Appointment } from '@types'

type Props = {}

export const PastAppointments = (props: Props) => {
    const pastAppointments = useGetStudentAppointmentsQuery({
        status: 'past',
    })

    return (
        <div className="mt-6">
            <div className="pb-1 flex items-center justify-between">
                <Typography variant={'label'} color={'text-black'}>
                    Past Appointments
                </Typography>
                <Switch name="Cancelled Appointments" />
            </div>
            <div>
                {pastAppointments.isLoading ? (
                    <LoadingAnimation />
                ) : pastAppointments?.data && pastAppointments?.data?.length ? (
                    pastAppointments?.data?.map(
                        (pastAppointment: Appointment, index: number) => {
                            return (
                                <PastAppointmentCard
                                    key={index}
                                    appointment={pastAppointment}
                                />
                            )
                        }
                    )
                ) : (
                    <EmptyData
                        title={'No Past Appointments'}
                        imageUrl={'/images/icons/appointments.png'}
                        description={'No Past Appointments were found'}
                        height={'30vh'}
                    />
                )}
            </div>
        </div>
    )
}
