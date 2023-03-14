import { useRouter } from 'next/router'

import { ReactElement, useEffect, useState } from 'react'

import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { BigCalendar, Button, Card, PageTitle } from '@components'

import { useContextBar } from '@hooks'
import { PastAppointments, UpcomingAppointments } from '@partials/common'
import { CommonCB } from '@partials/rto/contextBar'
import { CommonApi } from '@queries'
import moment from 'moment'

type Props = {}

const Appointments: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    const contextBar = useContextBar()

    useEffect(() => {
        contextBar.setContent(<CommonCB />)
        contextBar.show(false)
    }, [])

    const [mount, setMount] = useState(false)
    useEffect(() => {
        if (!mount) {
            setMount(true)
        }
    }, [])

    // query
    const futureAppointments = CommonApi.Appointments.useBookedAppointments({
        status: undefined,
    })
    const events = futureAppointments?.data?.map((appointment: any) => {
        const startTime = new Date(appointment?.date)
        const endTime = new Date(appointment?.date)
        const startHours = Number(
            moment(appointment?.startTime, 'hh:mm:ss').format('HH')
        )
        const startMinutes = Number(
            moment(appointment?.startTime, 'hh:mm:ss').format('mm')
        )
        const endHours = Number(
            moment(appointment?.endTime, 'hh:mm:ss').format('HH')
        )
        const endMinutes = Number(
            moment(appointment?.endTime, 'hh:mm:ss').format('mm')
        )
        startTime.setHours(startHours, startMinutes)
        endTime.setHours(endHours, endMinutes)

        const appointmentUser =
            appointment['appointmentFor'] || appointment['appointmentBy']

        const getPriority = () => {
            if (appointmentUser) {
                switch (appointmentUser['role']) {
                    case 'student':
                        return 'high'
                    case 'rto':
                        return 'medium'
                    case 'industry':
                        return 'low'
                    default:
                        return 'high'
                }
            }

            return 'high'
        }

        return {
            allDay: false,
            start: startTime,
            end: endTime,
            title: appointment?.type?.title,
            priority: getPriority(),
            subTitle:
                appointment.appointmentFor?.name ||
                appointment.appointmentBy?.name,
            appointment,
        }
    })

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <PageTitle title="Appointments" backTitle="Tasks" />

                <div className="flex items-center gap-x-2">
                    <Button
                        variant={'info'}
                        text={'Create Appointments'}
                        onClick={() => {
                            router.push(
                                '/portals/sub-admin/tasks/appointments/create-appointment'
                            )
                        }}
                    />
                    <Button
                        variant={'dark'}
                        text={'Set Schedule'}
                        onClick={() => {
                            router.push(
                                '/portals/sub-admin/tasks/appointments/set-schedule'
                            )
                        }}
                    />
                    <Button
                        variant={'action'}
                        text={'Set Unavailability'}
                        onClick={() => {
                            router.push(
                                '/portals/sub-admin/tasks/appointments/set-unavailability'
                            )
                        }}
                    />
                </div>
            </div>

            <div className="mb-4">
                <Card>
                    {mount && (
                        <BigCalendar
                            events={events}
                            loading={futureAppointments.isLoading}
                        />
                    )}
                </Card>
            </div>

            <UpcomingAppointments />
            <PastAppointments />
        </div>
    )
}
Appointments.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default Appointments
