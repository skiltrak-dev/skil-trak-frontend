import React from 'react'

// query
import { CommonApi } from '@queries'

// query
import { AdminApi } from '@queries'
import { Course, OptionType } from '@types'
import { Select, SelectOption } from '@components'

export const Courses = ({
    setSelectedCourse,
}: {
    setSelectedCourse: (value: number) => void
}) => {
    const { data, isSuccess } = CommonApi.Filter.useCourses()
    const courseOptions = isSuccess
        ? data?.map((course: Course) => ({
              label: course?.title,
              value: course?.id,
          }))
        : []
    return (
        <div className="max-w-md">
            <Select
                name={'course'}
                required
                options={courseOptions}
                label={'Select Course'}
                onlyValue
                onChange={(e: OptionType) => {
                    setSelectedCourse(Number(e))
                }}
            />
        </div>
    )
}
