import { ReactElement, useEffect } from 'react'

import { useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { Button, Card, Typography } from '@components'
import { CreateAppointmentContainer } from '@partials'

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
