// query
import { CommonApi } from '@queries'

// query
import { Select } from '@components'
import { Course, OptionType } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'

export const Courses = ({
    setSelectedCourse,
    rto,
}: {
    rto?: number | null
    setSelectedCourse: (value: number) => void
}) => {
    const courses = CommonApi.Courses.getCoursesByRto(Number(rto))
    const courseOptions = courses?.isSuccess
        ? courses?.data?.map((course: Course) => ({
              item: course,
              value: course?.id,
              label: course?.title,
          }))
        : []
    return (
        <div className="max-w-md">
            <Select
                name={'course'}
                required
                options={courseOptions}
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
