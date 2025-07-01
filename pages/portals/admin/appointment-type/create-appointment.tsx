import { ReactElement, useEffect } from 'react'

import { useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { CreateAppointmentContainer } from '@partials'
import { NextPageWithLayout } from '@types'

const CreateAppointment: NextPageWithLayout = () => {
    const navBar = useNavbar()

    useEffect(() => {
        navBar.setTitle('Create Appointment')

        return () => {
            navBar.setTitle('')
        }
    }, [])

    return (
        <div className="p-4">
            <CreateAppointmentContainer />
        </div>
    )
}

CreateAppointment.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default CreateAppointment
