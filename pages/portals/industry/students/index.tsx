import { IndustryStudents } from '@components/sections'
import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'


const Students: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router

  return (
    <div>
      <IndustryStudents />
    </div>
  )
}

Students.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default Students
