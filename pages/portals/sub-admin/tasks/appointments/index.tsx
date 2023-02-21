import { useRouter } from 'next/router'

import { ReactElement, useEffect } from 'react'

import { StudentLayout, SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import {
    Typography,
    Button,
    BigCalendar,
    Card,
    PageTitle,
    CalendarEvent,
} from '@components'

import { useContextBar } from '@hooks'
import { CommonCB } from '@partials/rto/contextBar'
import { CommonApi } from '@queries'
import { UpcommingAppointments, PastAppointments } from '@partials/common'
import moment from 'moment'

type Props = {}

const Appointments: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    const contextBar = useContextBar()

    useEffect(() => {
        contextBar.setContent(<CommonCB />)
        contextBar.show(false)
    }, [])

    // query
    const futureAppointments = CommonApi.Appointments.useBookedAppointments({
        status: 'future',
    })

    const events = futureAppointments?.data?.map((appointment: any) => {
        const startTime = new Date(appointment?.date)
        const endTime = new Date(appointment?.date)
        const startHours = Number(
            moment(appointment?.startTime, 'hh:mm:ss').format('hh')
        )
        const startMinutes = Number(
            moment(appointment?.startTime, 'hh:mm:ss').format('mm')
        )
        const endHours = Number(
            moment(appointment?.endTime, 'hh:mm:ss').format('hh')
        )
        const endMinutes = Number(
            moment(appointment?.endTime, 'hh:mm:ss').format('mm')
        )
        startTime.setHours(startHours, startMinutes)
        endTime.setHours(endHours, endMinutes)

        return {
            allDay: false,
            start: startTime,
            end: endTime,
            title: 'Appointment',
            priority: 'high',
            subTitle: 'Go For It',
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
                    <BigCalendar events={events} />
                </Card>
            </div>

            <UpcommingAppointments />
            <PastAppointments />
        </div>
    )
}
Appointments.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default Appointments
