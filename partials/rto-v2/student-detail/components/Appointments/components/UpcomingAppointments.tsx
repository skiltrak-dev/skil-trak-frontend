import React from 'react'
import { CommonApi } from '@queries'
import { ApprontmentCard } from '../cards'
import { Card, LoadingAnimation, NoData } from '@components'
import { Appointment } from '@types'
import { Badge, Button } from '@components'
import { AppointmentCardSkeleton } from '../../../skeletonLoader'

export const UpcomingAppointments = ({
    studentUserId,
}: {
    studentUserId: number
}) => {
    const appointments = CommonApi.Appointments.useBookedAppointments(
        {
            userId: studentUserId,
            status: 'future',
        },
        {
            skip: !studentUserId,
            refetchOnMountOrArgChange: 300,
        }
    )

    return (
        <Card
            noPadding
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl p-4 hover:shadow-2xl transition-all"
        >
            <h4 className="text-slate-900 mb-2 flex items-center gap-2">
                <span>Upcoming Appointments</span>
                <Badge
                    className="bg-blue-100 text-blue-700"
                    text={appointments?.data?.length + ''}
                ></Badge>
            </h4>
            <div className="space-y-2.5">
                {appointments?.isError ? (
                    <NoData text="There is Some technical issue" isError />
                ) : null}
                {appointments?.isLoading ? (
                    <div className="space-y-2.5">
                        {[1, 2, 3].map((i) => (
                            <AppointmentCardSkeleton key={i} />
                        ))}
                    </div>
                ) : appointments?.data &&
                    appointments?.data?.length > 0 &&
                    appointments?.isSuccess ? (
                    appointments?.data?.map((appointment: Appointment) => (
                        <ApprontmentCard
                            key={appointment.id}
                            appointment={appointment}
                        />
                    ))
                ) : (
                    appointments?.isSuccess && (
                        <NoData text="There is no upcoming appointments" />
                    )
                )}
            </div>
        </Card>
    )
}
