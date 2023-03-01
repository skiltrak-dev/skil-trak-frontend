import {
    EmptyData,
    FutureAppointments,
    LoadingAnimation,
    NoData,
    Typography,
} from '@components'
import { CommonApi } from '@queries'
import React from 'react'

export const UpcomingAppointments = () => {
    const futureAppointments = CommonApi.Appointments.useBookedAppointments({
        status: 'future',
    })
    return (
        <>
            <div className="pb-1">
                <Typography variant={'label'} color={'text-black'}>
                    Your Upcoming Appointments
                </Typography>
            </div>
            {futureAppointments.isError && (
                <NoData text={'Some Network issue, Try Reload'} />
            )}
            {futureAppointments.isLoading ? (
                <LoadingAnimation size={90} />
            ) : futureAppointments?.data && futureAppointments?.data?.length ? (
                <FutureAppointments appointments={futureAppointments?.data} />
            ) : (
                !futureAppointments.isError && (
                    <EmptyData
                        imageUrl="/images/icons/appointment.png"
                        title={'No Upcomming Appointments'}
                        description={'No Upcomming Appointments'}
                        height="30vh"
                    />
                )
            )}
        </>
    )
}
