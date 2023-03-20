import {
    EmptyData,
    FutureAppointments,
    LoadingAnimation,
    NoData,
    Typography,
} from '@components'
import { AppointmentViewModal } from '@components/Appointment/AppointmentModal'
import { CommonApi } from '@queries'
import React, { useState } from 'react'

export const UpcomingAppointments = () => {
    const futureAppointments = CommonApi.Appointments.useBookedAppointments({
        status: 'future',
    })

    const [modal, setModal] = useState<any>(null)
    const onAppointmentClicked = (appointment: any) => {
        setModal(
            <AppointmentViewModal
                id={appointment?.id}
                onCancel={() => setModal(null)}
            />
        )
    }
    return (
        <>
            {modal && modal}
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
                <FutureAppointments
                    appointments={futureAppointments?.data}
                    onAppointmentClicked={onAppointmentClicked}
                />
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
