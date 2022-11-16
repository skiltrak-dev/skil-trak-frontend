import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const BookAppointment: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router

  return <div>BookAppointment</div>
}

BookAppointment.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default BookAppointment
