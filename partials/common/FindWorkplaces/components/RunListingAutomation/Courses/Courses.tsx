import { SelectOption, Typography } from '@components'
import { CommonApi } from '@queries'
import { Course } from '@types'
import { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { CourseItem } from './CourseItem'

export const Courses = ({ selectedSector }: { selectedSector: number }) => {
    const courses = CommonApi.Courses.getCoursesBySector(selectedSector, {
        skip: !selectedSector,
    })

    const formContext = useFormContext()

    const coursesOptions = useMemo(
        () =>
            courses.data?.map((course: Course) => ({
                label: course?.title,
                value: course?.id,
            })),
        [courses.data, courses.isSuccess]
    )

    useEffect(() => {
        if (coursesOptions && coursesOptions?.length > 0) {
            formContext.setValue(
                'courses',
                coursesOptions?.map((c: SelectOption) => c?.value)
            )
        }
    }, [coursesOptions])

    const selectedCourses = formContext.watch('courses')

    const toggleCourse = (course: number) => {
        const updatedCourses = selectedCourses.includes(course)
            ? selectedCourses.filter((c: number) => c !== course)
            : [...selectedCourses, course]

        formContext.setValue('courses', updatedCourses)
    }

    if (!coursesOptions?.length) {
        return <></>
    }
    return (
        <div className="w-full flex flex-col space-y-1">
            <div className="flex items-center justify-between">
                <Typography variant="label">Available Courses</Typography>
                <Typography variant="xs" color="text-gray-500">
                    {selectedCourses?.length || 0} of {coursesOptions?.length}{' '}
                    selected
                </Typography>
            </div>
            <div className="w-full bg-gray-50 p-2 rounded-lg border border-gray-200 max-h-20 overflow-y-auto">
                <div className="grid grid-cols-1 gap-1">
                    {coursesOptions?.map((course: SelectOption) => (
                        <CourseItem
                            key={Number(course.value)}
                            course={course}
                            isSelected={selectedCourses?.includes(
                                course?.value
                            )}
                            onToggle={toggleCourse}
                        />
                    ))}
                </div>
            </div>
            <Typography variant="xs" color="text-gray-500">
                Click to select/unselect. All pre-selected.
            </Typography>
        </div>
    )
}
