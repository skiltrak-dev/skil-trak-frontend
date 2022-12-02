import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// components
import { Typography, Button, TextInput, Select } from '@components'
import { UploadFile } from '../compnents'

// hoc
import { FileUpload } from '@hoc'

// query
import {
    useGetRTOCoursesQuery,
    useCreateRtoAssessmentToolsMutation,
} from '@queries'

export const AddAssessmentToolCB = () => {
    const [coursesOptions, setCoursesOptions] = useState<any | null>([])
    const [fileData, setFileData] = useState<any | null>([])

    const rtoCourses = useGetRTOCoursesQuery()
    const [create, createResult] = useCreateRtoAssessmentToolsMutation()

    useEffect(() => {
        if (rtoCourses?.data && rtoCourses.isSuccess) {
            const options = rtoCourses?.data?.data?.map((course: any) => ({
                label: course.title,
                value: course.id,
            }))
            setCoursesOptions(options)
        }
    }, [rtoCourses?.data?.data, rtoCourses.isSuccess])
    const methods = useForm({
        mode: 'all',
    })

    const onSubmit = async (values: any) => {
        delete values.file
        const formData = new FormData()
        formData.append('file', fileData)

        Object.keys(values).map((key) => {
            formData.append(key, values[key])
        })
        await create(formData)
    }
    return (
        <div>
            <Typography variant={'small'} color={'text-gray-500'}>
                Add Assessment To:
            </Typography>
            <Typography variant={'label'}>Job Tranining Institute</Typography>
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="">
                        <Select
                            name="course"
                            label="Course(s)"
                            placeholder="Select Your Choice"
                            options={coursesOptions}
                            loading={rtoCourses.isLoading}
                            disabled={rtoCourses.isLoading}
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
                            onChange={(docs: any) => {
                                console.log(docs)
                                setFileData(docs)
                                // console.log('Saad', docs)
                                // const formData = new FormData()
                                // docs.forEach((doc: any) => {
                                //     formData.append('assessmentEvidence', doc)
                                // })
                                // uploadDocs({
                                //     id: folder?.id,
                                //     body: formData,
                                // })
                            }}
                            name={'file'}
                            component={UploadFile}
                            // acceptTypes={getDocType()}
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <Button
                            submit
                            disabled={createResult.isLoading}
                            loading={createResult.isLoading}
                        >
                            Add Assessment
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
