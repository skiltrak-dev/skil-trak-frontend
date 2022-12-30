import React from 'react'

import {
    Typography,
    EmptyData,
    UpcomingAppointmentCard,
    FutureAppointments,
} from '@components'

// query
import { useGetRTOAppointmentsQuery } from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'

type Props = {}

export const UpcomingAppointments = (props: Props) => {
    const rtoAppointments = useGetRTOAppointmentsQuery({ status: 'future' })

    return (
        <>
            <div className="pb-1">
                <Typography variant={'label'} color={'text-black'}>
                    Your Upcoming Appointments
                </Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rtoAppointments.isLoading ? (
                    <LoadingAnimation />
                ) : rtoAppointments?.data && rtoAppointments?.data?.length ? (
                    <FutureAppointments appointments={rtoAppointments?.data} />
                ) : (
                    <EmptyData
                        title={'No Recent Appointments'}
                        description={'No Recent Appointments'}
                    />
                )}
            </div>
        </>
    )
}
