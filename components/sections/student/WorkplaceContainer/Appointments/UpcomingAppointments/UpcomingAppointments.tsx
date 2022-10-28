import React from 'react'
import { UpcomingAppointmentCard } from '@components/sections'
import { Typography } from '@components/Typography'

// query
import { useGetStudentUpcomingAppointmentsQuery } from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'

type Props = {}

export const UpcomingAppointments = (props: Props) => {
    const studentAppointments = useGetStudentUpcomingAppointmentsQuery()
    const UpcomingAppointmentsData = [
        {
            date: 'Wednesday, October 19',
            time: '09:30 am - 10:00 am',
            totalMinutes: '~ 60 Min',
            address: '221b Baker St, VIC 3000',
            name: 'Saad Shah',
            imageUrl: '/images/card-images/video-icon.png',
            post: 'Video Conference',
        },
        {
            date: 'Wednesday, October 19',
            time: '09:30 am - 10:00 am',
            totalMinutes: '~ 60 Min',
            address: '221b Baker St, VIC 3000',
            name: 'Salman Khan',
            imageUrl: '/images/card-images/phone-icon.png',
            post: 'Phone Consultation',
        },
    ]
    return (
        <>
            <div className="pb-1">
                <Typography variant={'label'} color={'text-black'}>
                    Your Upcoming Appointments
                </Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentAppointments.isLoading ? (
                    <LoadingAnimation />
                ) : (
                    studentAppointments?.data?.map(
                        (upcomingAppointment: any, index: number) => {
                            return (
                                <UpcomingAppointmentCard
                                    key={index}
                                    date={upcomingAppointment.date}
                                    time={upcomingAppointment.time}
                                    totalMinutes={
                                        upcomingAppointment.totalMinutes
                                    }
                                    address={upcomingAppointment.address}
                                    name={upcomingAppointment.name}
                                    imageUrl={
                                        '/images/card-images/video-icon.png'
                                    }
                                    post={upcomingAppointment.post}
                                />
                            )
                        }
                    )
                )}
            </div>
        </>
    )
}
