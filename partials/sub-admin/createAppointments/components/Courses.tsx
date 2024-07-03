// query
import { CommonApi } from '@queries'

// query
import { Select, SelectOption } from '@components'
import { Course, OptionType } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import { useEffect } from 'react'

export const Courses = ({
    setSelectedCourse,
    selectedCourse,
    rto,
}: {
    rto?: number | null
    setSelectedCourse: (value: number) => void
    selectedCourse: number | null
}) => {
    const courses = CommonApi.Courses.getCoursesByRto(Number(rto))
    const courseOptions = courses?.isSuccess
        ? courses?.data?.map((course: Course) => ({
              item: course,
              value: course?.id,
              label: course?.title,
          }))
        : []

    useEffect(() => {
        if (courseOptions && courseOptions?.length > 0 && !selectedCourse) {
            setSelectedCourse(courseOptions?.[0]?.value)
        }
    }, [courseOptions])

    return (
        <div className="max-w-md">
            <Select
                name={'course'}
                required
                options={courseOptions}
                value={courseOptions?.find(
                    (course: SelectOption) => course?.value === selectedCourse
                )}
                label={'Select Course'}
                loading={courses?.isLoading || courses?.isFetching}
                disabled={courses?.isLoading || courses?.isFetching}
                onlyValue
                onChange={(e: OptionType) => {
                    setSelectedCourse(Number(e))
                }}
                components={{
                    Option: CourseSelectOption,
                }}
                formatOptionLabel={formatOptionLabel}
            />
        </div>
    )
}
