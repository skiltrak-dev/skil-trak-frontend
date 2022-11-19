import React from 'react'
import { useRouter } from 'next/router'

// components
import { Card, BackButton } from 'components'

// query
import { useGetIndustryStudentProfileQuery } from '@queries'
import { LoadingAnimation, EmptyData } from '@components'
import { StudentProfileData } from './components'

export const StudentProfile = () => {
  const pathname = useRouter()
  const { id } = pathname.query
  const { data, isLoading } = useGetIndustryStudentProfileQuery(id)

  return (
    <div>
      <BackButton text={'Back To Students'} />
      <Card>
        {!isLoading ? (
          data ? (
            <StudentProfileData data={data} />
          ) : (
            <EmptyData />
          )
        ) : (
          <LoadingAnimation />
        )}
      </Card>
    </div>
  )
}
