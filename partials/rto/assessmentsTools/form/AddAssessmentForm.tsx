import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// components
import { Typography, Button, TextInput, Select, UploadFile } from '@components'
// hoc
import { FileUpload } from '@hoc'

// query
import {
    useGetSubAdminRTOCoursesQuery,
    useCreateRtoAssessmentToolsMutation,
    useUpdateRtoSubAdminAssessmentToolsMutation,
} from '@queries'
import { useRouter } from 'next/router'
import { useContextBar, useNotification } from '@hooks'
type Props = {
    edit?: boolean
    assessment?: any
    courses: any
}
export const AddAssessmentForm = ({ edit, assessment, courses }: Props) => {
    const [coursesOptions, setCoursesOptions] = useState<any | null>([])
    const [fileData, setFileData] = useState<any | null>([])

    const { notification } = useNotification()
    const contextBar = useContextBar()

    const [create, createResult] = useCreateRtoAssessmentToolsMutation()
    const [update, updateResult] = useUpdateRtoSubAdminAssessmentToolsMutation()
    useEffect(() => {
        if (courses?.data && courses.isSuccess) {
            const options = courses?.data?.map((course: any) => ({
                label: course.title,
                value: course.id,
            }))
            setCoursesOptions(options)
        }
    }, [courses])

    useEffect(() => {
        if (createResult.isSuccess) {
            notification.success({
                title: 'Assessment Added',
                description: 'Assessment Added Successfully',
            })
            contextBar.setContent(null)
            contextBar.hide()
        }
    }, [createResult])

    const methods = useForm({
        mode: 'all',
        defaultValues: assessment,
    })

    const onSubmit = async (values: any) => {
        const formData = new FormData()
        formData.append('course', values?.course)
        formData.append('title', values?.title)
        formData.append('file', fileData)
        create(formData)
    }
    
    return (
        <div>
            {/* <Typography variant={'small'} color={'text-gray-500'}>
                Add Assessment
            </Typography> */}
            {/* <Typography variant={'label'}>Job Training Institute</Typography> */}
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="">
                        {/* TODO Course is not getting in rto portal */}
                        <Select
                            name="course"
                            label="Course(s)"
                            placeholder="Select Your Choice"
                            options={coursesOptions}
                            loading={courses.isLoading}
                            disabled={courses.isLoading}
                            onlyValue
                        />
                        <TextInput
                            label={'Title'}
                            name={'title'}
                            placeholder={'Your Title Here...'}
                            validationIcons
                            required
                        />
                        <FileUpload
                            name={'file'}
                            component={UploadFile}
                            onChange={(e: any) => {
                                setFileData(e)
                            }}
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        {edit ? (
                            <Button
                                submit
                                disabled={createResult.isLoading}
                                loading={createResult.isLoading}
                            >
                                Update Assessment
                            </Button>
                        ) : (
                            <Button
                                submit
                                disabled={createResult.isLoading}
                                loading={createResult.isLoading}
                            >
                                Add Assessment
                            </Button>
                        )}
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
