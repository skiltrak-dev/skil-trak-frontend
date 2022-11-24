import { ReactElement, useEffect } from 'react'

import { useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { AppointmentTypes } from '@partials/admin/appointment-type'

const AppointmentTypesList: NextPageWithLayout = () => {
  const navBar = useNavbar()

  useEffect(() => {
    navBar.setTitle('Appointment Types')
  }, [])

  return (
    <div className='p-6'>
      <AppointmentTypes />
    </div>
  )
}

AppointmentTypesList.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default AppointmentTypesList
