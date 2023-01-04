import React from 'react'

import {
    Typography,
    EmptyData,
    UpcomingAppointmentCard,
    FutureAppointments,
} from '@components'

// query
import { useGetStudentAppointmentsQuery } from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'

type Props = {}

export const UpcomingAppointments = (props: Props) => {
    const studentAppointments = useGetStudentAppointmentsQuery({
        status: 'future',
    })
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
            {studentAppointments.isLoading ? (
                <LoadingAnimation />
            ) : studentAppointments?.data &&
              studentAppointments?.data?.length ? (
                <FutureAppointments appointments={studentAppointments?.data} />
            ) : (
                <EmptyData
                    title={'No Recent Appointments'}
                    description={'No Recent Appointments'}
                />
            )}
        </>
    )
}
