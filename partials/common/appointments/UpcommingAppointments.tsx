import {
    EmptyData,
    FutureAppointments,
    LoadingAnimation,
    NoData,
    Typography,
} from '@components'
import { CommonApi } from '@queries'
import React from 'react'

export const UpcommingAppointments = () => {
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
                        title={'No Recent Appointments'}
                        description={'No Recent Appointments'}
                    />
                )
            )}
        </>
    )
}
