// query
import { CommonApi } from '@queries'

// query
import { Select } from '@components'
import { Course, OptionType } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'

export const Courses = ({
    setSelectedCourse,
}: {
    setSelectedCourse: (value: number) => void
}) => {
    const { data, isSuccess } = CommonApi.Filter.useCourses()
    const courseOptions = isSuccess
        ? data?.map((course: Course) => ({
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
