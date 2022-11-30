import React from 'react'
import { PastAppointmentCard } from '@components/sections/student/components/Card/PastAppointmentCard'
import { Typography, EmptyData } from '@components'
import { Switch } from '@components/inputs'

// query
import { useGetStudentPastAppointmentsQuery } from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'

type Props = {}

export const PastAppointments = (props: Props) => {
    const pastAppointments = useGetStudentPastAppointmentsQuery()

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
                        (pastAppointment: any, index: number) => {
                            return (
                                <PastAppointmentCard
                                    key={index}
                                    time={pastAppointment.time}
                                    totalMinutes={pastAppointment.totalMinutes}
                                    name={pastAppointment.name}
                                    imageUrl={
                                        '/images/card-images/phone-image.png'
                                    }
                                    post={pastAppointment.post}
                                    status={pastAppointment.status}
                                    address={pastAppointment.address}
                                    date={pastAppointment.date}
                                />
                            )
                        }
                    )
                ) : (
                    <EmptyData
                        title={'No Past appointments'}
                        description={'No Past appointments'}
                    />
                )}
            </div>
        </div>
    )
}
