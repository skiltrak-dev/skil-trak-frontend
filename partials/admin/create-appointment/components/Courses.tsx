import React from 'react'

// query
import { AdminApi } from '@queries'
import { Course } from '@types'
import { Select, SelectOption } from '@components'
import { CourseSelectOption, formatOptionLabel } from '@utils'

export const Courses = ({
    setSelectedCourse,
}: {
    setSelectedCourse: (value: number) => void
}) => {
    const { data, isSuccess } = AdminApi.Courses.useListQuery({
        limit: 100,
        skip: 0,
        search: '',
    })
    const courseOptions = isSuccess
        ? data?.data?.map((course: Course) => ({
              label: course?.title,
              value: course?.id,
              item: course,
          }))
        : []
    return (
        <div className="max-w-md">
            <Select
                name={'course'}
                options={courseOptions}
                label={'Select Course'}
                onlyValue
                onChange={(e: any) => {
                    setSelectedCourse(Number(e))
                }}
                components={{ Option: CourseSelectOption }}
                formatOptionLabel={formatOptionLabel}
            />
        </div>
    )
}
