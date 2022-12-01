import React from 'react'

import {
    EmptyData,
    Typography,
    TechnicalError,
    UpcomingAppointmentCard,
} from '@components'

// query
import { useGetIndustryAppointmentsQuery } from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'

export const UpcomingAppointments = () => {
    const industryAppointments = useGetIndustryAppointmentsQuery({
        status: 'future',
    })

    return (
        <>
            <div className="pb-1">
                <Typography variant={'label'} color={'text-black'}>
                    Your Upcoming Appointments
                </Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {industryAppointments.isError && <TechnicalError />}
                {industryAppointments.isLoading ? (
                    <LoadingAnimation />
                ) : industryAppointments?.data &&
                  industryAppointments?.data?.length ? (
                    industryAppointments?.data?.map(
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
                ) : (
                    !industryAppointments.isError && (
                        <EmptyData
                            title={'No Recent Appointments'}
                            description={'No Recent Appointments'}
                        />
                    )
                )}
            </div>
        </>
    )
}
