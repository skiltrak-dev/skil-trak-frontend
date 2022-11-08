import { useRouter } from 'next/router'

import { ReactElement } from 'react'
import { PastAppointments, UpcomingAppointments } from '@components/sections'
import { Button } from '@components'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

type Props = {}

const Appointments: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    return (
        <>
            <div className="flex items-center justify-end">
                <Button
                    text={'Book Appointment'}
                    variant={'info'}
                    onClick={() => {
                        router.push('/student/workplace/book-appointment')
                    }}
                />
            </div>
            <UpcomingAppointments />
            <PastAppointments />
        </>
    )
}
Appointments.getLayout = (page: ReactElement) => {
    return <StudentLayout title="Appointments">{page}</StudentLayout>
}

export default Appointments
