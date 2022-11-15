import { useRouter } from 'next/router'

import { ReactElement } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { CreateAppointments } from '@components/sections'

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
    return <StudentLayout title="Create Appointment">{page}</StudentLayout>
}

export default CreateAppointment
