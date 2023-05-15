import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// components
import { Typography, Button, TextInput, Select } from '@components'
import { UploadFile } from '../components/UploadFile'
// hoc
import { FileUpload } from '@hoc'

// query
import {
    useGetSubAdminRTOCoursesQuery,
    useCreateRtoSubAdminAssessmentToolsMutation,
    useUpdateRtoSubAdminAssessmentToolsMutation,
} from '@queries'
import { useRouter } from 'next/router'
type Props = {
    edit?: boolean
    assessment?: any
}
export const AddAssessmentToolCB = ({ edit, assessment }: Props) => {
    const [fileData, setFileData] = useState<any | null>([])

    const router = useRouter()
    const rtoId = router.query.id
    const rtoCourses = useGetSubAdminRTOCoursesQuery(String(rtoId))
    const [create, createResult] = useCreateRtoSubAdminAssessmentToolsMutation()
    const [update, updateResult] = useUpdateRtoSubAdminAssessmentToolsMutation()

    const coursesOptions = rtoCourses?.data?.map((course: any) => ({
        label: course.title,
        value: course.id,
    }))

    const methods = useForm({
        mode: 'all',
        defaultValues: assessment,
    })

    const onSubmit = async (values: any) => {
        delete values.file
        const formData = new FormData()
        formData.append('file', fileData)
        Object.keys(values).map((key) => {
            formData.append(key, values[key])
        })
        ;(await edit)
            ? update({ body: values.title, assessment: assessment?.id })
            : create({ body: formData, id: String(rtoId) })
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
                        {/* TODO Course is not getting in rto portal */}
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
                                setFileData(docs)
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
