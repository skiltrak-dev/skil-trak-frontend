import React from 'react'
import { PastAppointmentCard } from '@components/sections/student/components/Card/PastAppointmentCard'
import { Typography } from '@components/Typography'
import { Switch } from '@components/inputs'

// query
import { useGetStudentPastAppointmentsQuery } from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'

type Props = {}

export const PastAppointments = (props: Props) => {
    const pastAppointments = useGetStudentPastAppointmentsQuery()
    const pastAppointmentsData = [
        {
            date: 'Wednesday, October 19',
            time: '09:30 am - 10:00 am',
            totalMinutes: '~ 60 Min',
            address: '221b Baker St, VIC 3000',
            name: 'Saad Shah',
            imageUrl: '/images/card-images/video-image.png',
            post: 'Video Conference',
            status: 'Completed',
        },
        {
            date: 'Wednesday, October 19',
            time: '09:30 am - 10:00 am',
            totalMinutes: '~ 60 Min',
            address: '221b Baker St, VIC 3000',
            name: 'Salman Khan',
            imageUrl: '/images/card-images/phone-image.png',
            post: 'Phone Consultation',
            status: 'Completed',
        },
        {
            date: 'Wednesday, October 19',
            time: '09:30 am - 10:00 am',
            totalMinutes: '~ 60 Min',
            address: '221b Baker St, VIC 3000',
            name: 'Qandeel Khan',
            imageUrl: '/images/card-images/box-image.png',
            post: 'Workplace Visit',
            status: 'Cancelled',
        },
    ]
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
                ) : (
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
                )}
            </div>
        </div>
    )
}
