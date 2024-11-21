import React from 'react'
import { useGetStudentProfileDetailQuery } from '@queries'
import { Course } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import { Select } from '@components'

export const UpdatedIndustryCourse = ({
    setselectedCourse,
}: {
    setselectedCourse: (e: number) => void
}) => {
    const { data, isLoading } = useGetStudentProfileDetailQuery()

    const courseOptions =
        data?.courses && data?.courses?.length > 0
            ? data?.courses?.map((course: Course) => ({
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
