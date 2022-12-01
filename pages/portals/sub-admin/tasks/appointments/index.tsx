import { useRouter } from 'next/router'

import { ReactElement, useEffect } from 'react'

import { StudentLayout, SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'


import { Typography, Button, BigCalendar, Card, PageTitle } from '@components'

import {
    PastAppointments,
    UpcomingAppointments,
} from '@components/sections/subAdmin'


import { useContextBar } from '@hooks'
import { CommonCB } from '@partials/rto/contextBar'


type Props = {}

const Appointments: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    const contextBar = useContextBar()

    useEffect(() => {
        contextBar.setContent(<CommonCB />)
        contextBar.show(false)
    }, [])

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
                    <BigCalendar />
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
