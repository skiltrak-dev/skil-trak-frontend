import React from 'react'
import { UpcomingAppointmentCard } from '@components/sections'
import { Typography } from '@components/Typography'

type Props = {}

export const UpcomingAppointments = (props: Props) => {
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
            <div className="flex gap-x-4">
                {UpcomingAppointmentsData.map((data, index) => {
                    return (
                        <UpcomingAppointmentCard
                            key={index}
                            date={data.date}
                            time={data.time}
                            totalMinutes={data.totalMinutes}
                            name={data.name}
                            imageUrl={data.imageUrl}
                            post={data.post}
                        />
                    )
                })}
            </div>
        </>
    )
}
