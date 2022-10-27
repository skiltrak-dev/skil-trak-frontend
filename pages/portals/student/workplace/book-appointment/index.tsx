import { ReactElement } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { AppointmentType, Form, TimeSlots } from '@components/sections'

type Props = {}

const BookAppointment: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <Form />
            <AppointmentType />
            <TimeSlots />
        </>
    )
}
BookAppointment.getLayout = (page: ReactElement) => {
    return <StudentLayout title="Workplace">{page}</StudentLayout>
}

export default BookAppointment
