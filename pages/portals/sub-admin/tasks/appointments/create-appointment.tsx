import { ReactElement } from 'react'
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { CreateAppointments } from '@partials/sub-admin'

const CreateAppointment: NextPageWithLayout = () => {
    return <CreateAppointments />
}
CreateAppointment.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout
            pageTitle={{
                title: 'Create Appointment',
                backTitle: 'Appointments',
            }}
        >
            {page}
        </SubAdminLayout>
    )
}

export default CreateAppointment
