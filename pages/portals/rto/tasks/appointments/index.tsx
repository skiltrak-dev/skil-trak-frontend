import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import {
    Button, Typography
} from '@components'
import { PastAppointments, UpcommingAppointments } from '@partials/common'

type Props = {}

const RtoAppointments: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    return (
        <>
            <div className="flex items-center justify-between">
                <Typography>Rto Appointments</Typography>
                <Button
                    text={'Create Appointment'}
                    variant={'info'}
                    onClick={() => {
                        router.push(
                            '/portals/rto/tasks/appointments/create-appointments'
                        )
                    }}
                />
            </div>

            {/* TODO Not getting the appointments */}
            <UpcommingAppointments />
            <PastAppointments />
        </>
    )
}
RtoAppointments.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout
            pageTitle={{
                title: 'Appointments',
            }}
        >
            {page}
        </RtoLayout>
    )
}

export default RtoAppointments
