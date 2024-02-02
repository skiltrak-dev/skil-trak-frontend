import { Typography } from '@components/Typography'
import { ActionButton } from '@components/buttons'
import { Card } from '@components/cards'
import { Select, TextArea } from '@components/inputs'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { IndustryApi } from '@queries'
import { Course } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const CreateVolunteerRequest = ({
    result,
    onSubmit,
}: {
    result: any
    onSubmit: (values: any) => void
}) => {
    const [selectedCourse, setSelectedCourse] = useState<any>(null)

    const { notification } = useNotification()

    const getCourses = IndustryApi.Courses.useGetIndustryCoursesQuery(null)

    const validationSchema = Yup.object({
        course: Yup.number().required('Course is required!'),
        requirement: Yup.string().required('Note is required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const coursesOptions = getCourses?.data?.map((course: Course) => ({
        item: course,
        value: course?.id,
        label: course?.title,
    }))
    return (
        <Card>
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col my-2.5">
                        <Select
                            label={'Select Courses'}
                            name={'course'}
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

                        <TextArea
                            required
                            rows={6}
                            name="requirement"
                            label={'Add Requirements'}
                            placeholder={'Add Requirements'}
                        />

                        <div className="w-full mt-6 flex justify-end gap-x-2">
                            <ActionButton
                                variant={'dark'}
                                // onClick={() => {
                                //     if (selectedCourse) {
                                //         onVolunteer(selectedCourse)
                                //     } else {
                                //         notification.warning({
                                //             title: 'Course is required',
                                //             description:
                                //                 'Please select a course',
                                //         })
                                //     }
                                // }}
                                submit
                                loading={result.isLoading}
                                disabled={result.isLoading}
                            >
                                Submit Request
                            </ActionButton>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Card>
    )
}
