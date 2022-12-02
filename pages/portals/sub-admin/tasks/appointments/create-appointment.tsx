import { useRouter } from 'next/router'

import { ReactElement } from 'react'

import { StudentLayout, SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { CreateAppointments } from '@partials/sub-admin'

type Props = {}

const CreateAppointment: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    return (
        <>
            <CreateAppointments />
        </>
    )
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
