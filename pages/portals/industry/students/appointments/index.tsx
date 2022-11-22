import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

import { IndustryAppointments } from '@components/sections'

const Appointments: NextPageWithLayout = () => {
  return (
    <div>
      <IndustryAppointments />
    </div>
  )
}

Appointments.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default Appointments
