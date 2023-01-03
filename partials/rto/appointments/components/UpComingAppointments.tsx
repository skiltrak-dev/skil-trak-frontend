import React from 'react'

import {
    Typography,
    EmptyData,
    UpcomingAppointmentCard,
    FutureAppointments,
    TechnicalError,
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
            {rtoAppointments.isError && <TechnicalError />}
            {rtoAppointments.isLoading ? (
                <LoadingAnimation />
            ) : rtoAppointments?.data && rtoAppointments?.data?.length ? (
                <FutureAppointments appointments={rtoAppointments?.data} />
            ) : (
                !rtoAppointments?.isError && (
                    <EmptyData
                        title={'No Recent Appointments'}
                        description={'No Recent Appointments'}
                    />
                )
            )}
        </>
    )
}
