import { UserRoles } from '@constants'
import { CommonApi } from '@queries'
import { getUserCredentials } from '@utils'
import React, { useEffect, useState } from 'react'

export const useCoursesOptions = () => {
    const [coursesResponse, setCoursesResponse] = useState<any>(null)

    const role = getUserCredentials()?.role
    const adminCoursesResponse = CommonApi.Courses.useCoursesList(undefined, {
        skip: role !== UserRoles.ADMIN,
    })
    const subadminCoursesResponse = CommonApi.Courses.subadminCoursesList(
        undefined,
        {
            skip: role !== UserRoles.SUBADMIN,
        }
    )

    useEffect(() => {
        if (role === UserRoles.ADMIN) {
            setCoursesResponse(adminCoursesResponse)
        }
    }, [adminCoursesResponse])

    useEffect(() => {
        if (role === UserRoles.SUBADMIN) {
            setCoursesResponse(subadminCoursesResponse)
        }
    }, [subadminCoursesResponse])

    const coursesOptions = coursesResponse?.data?.length
        ? coursesResponse?.data?.map((course: any) => ({
              label: course?.title,
              value: course?.id,
          }))
        : []

    return { coursesOptions, coursesResponse }
}
