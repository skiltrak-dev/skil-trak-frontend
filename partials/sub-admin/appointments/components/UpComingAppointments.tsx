import React from 'react'

import {
    EmptyData,
    Typography,
    TechnicalError,
    UpcomingAppointmentCard,
    FutureAppointments,
} from '@components'

// query
import { useGetSubAdminAppointmentsQuery } from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'

export const UpcomingAppointments = ({ subAdminAppointments }: any) => {
    return (
        <>
            <div className="pb-1">
                <Typography variant={'label'} color={'text-black'}>
                    Your Upcoming Appointments
                </Typography>
            </div>
            {subAdminAppointments.isError && <TechnicalError />}
            {subAdminAppointments.isLoading ? (
                <LoadingAnimation />
            ) : subAdminAppointments?.data &&
              subAdminAppointments?.data?.length > 0 ? (
                <FutureAppointments appointments={subAdminAppointments?.data} />
            ) : (
                !subAdminAppointments.isError && (
                    <EmptyData
                        title={'No Recent Appointments'}
                        description={'No Recent Appointments'}
                    />
                )
            )}
        </>
    )
}
