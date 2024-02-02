import { Typography } from '@components/Typography'
import { ActionButton } from '@components/buttons'
import { Card } from '@components/cards'
import { Select } from '@components/inputs'
import { useNotification } from '@hooks'
import { IndustryApi } from '@queries'
import { Course } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import React, { useState } from 'react'

export const CreateVolunteerRequest = ({
    result,
    onVolunteer,
}: {
    result: any
    onVolunteer: (course: number) => void
}) => {
    const [selectedCourse, setSelectedCourse] = useState<any>(null)

    const { notification } = useNotification()

    const getCourses = IndustryApi.Courses.useGetIndustryCoursesQuery(null)

    const coursesOptions = getCourses?.data?.map((course: Course) => ({
        item: course,
        value: course?.id,
        label: course?.title,
    }))
    return (
        <Card>
            <Typography variant={'label'} semibold>
                Create a Volunteer Requests
            </Typography>

            <div className="flex flex-col my-2.5">
                <Select
                    label={'Select Courses'}
                    name={'courseId'}
                    options={coursesOptions}
                    placeholder={'Select Courses...'}
                    onlyValue
                    required
                    onChange={(e: any) => {
                        setSelectedCourse(e)
                    }}
                    loading={getCourses.isLoading}
                    disabled={getCourses.isLoading}
                    components={{
                        Option: CourseSelectOption,
                    }}
                    formatOptionLabel={formatOptionLabel}
                />

                <div className="w-full mt-6 flex gap-x-2">
                    <ActionButton
                        variant={'dark'}
                        onClick={() => {
                            if (selectedCourse) {
                                onVolunteer(selectedCourse)
                            } else {
                                notification.warning({
                                    title: 'Course is required',
                                    description: 'Please select a course',
                                })
                            }
                        }}
                        loading={result.isLoading}
                        disabled={result.isLoading}
                    >
                        Submit Request
                    </ActionButton>
                </div>
            </div>
        </Card>
    )
}
