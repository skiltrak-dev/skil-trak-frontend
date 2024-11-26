import React from 'react'
import { SubAdminApi, useGetStudentProfileDetailQuery } from '@queries'
import { Course } from '@types'
import {
    CourseSelectOption,
    formatOptionLabel,
    getUserCredentials,
} from '@utils'
import { Select } from '@components'
import { useRouter } from 'next/router'
import { UserRoles } from '@constants'

export const UpdatedIndustryCourse = ({
    setselectedCourse,
}: {
    setselectedCourse: (e: number) => void
}) => {
    const router = useRouter()
    const role = getUserCredentials()?.role

    const { data, isLoading } = useGetStudentProfileDetailQuery(undefined, {
        skip: role !== UserRoles.STUDENT,
    })
    const courses = SubAdminApi.Student.useCourses(Number(router.query?.id), {
        skip: !router.query?.id || role !== UserRoles.SUBADMIN,
        refetchOnMountOrArgChange: true,
    })

    const coursesData =
        role === UserRoles.STUDENT ? data?.courses : courses?.data

    const courseOptions =
        coursesData && coursesData?.length > 0
            ? coursesData?.map((course: Course) => ({
                  item: course,
                  value: course?.id,
                  label: course?.title,
              }))
            : []
    return (
        <Select
            label={'Select Course'}
            name={'course'}
            required
            options={courseOptions}
            placeholder={'Select Course...'}
            loading={isLoading}
            onChange={(e: any) => {
                setselectedCourse(e?.value)
            }}
            components={{
                Option: CourseSelectOption,
            }}
            menuPlacement="top"
            formatOptionLabel={formatOptionLabel}
            showError={false}
        />
    )
}
