import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

import { IndustryBookAppointment } from '@components/sections'

const BookAppointment: NextPageWithLayout = () => {
  return (
    <div>
      <IndustryBookAppointment />
    </div>
  )
}

BookAppointment.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default BookAppointment
