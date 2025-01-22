import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// components
import {
    Typography,
    Button,
    TextInput,
    Select,
    ShowErrorNotifications,
} from '@components'
import { UploadFile } from '../components'
// hoc
import { FileUpload } from '@hoc'

// query
import {
    useGetSubAdminRTOCoursesQuery,
    useCreateRtoSubAdminAssessmentToolsMutation,
    useUpdateRtoSubAdminAssessmentToolsMutation,
} from '@queries'
import { useRouter } from 'next/router'
import { useContextBar, useNotification } from '@hooks'
type Props = {
    edit?: boolean
    assessment?: any
}
export const AddAssessmentToolCB = ({ edit, assessment }: Props) => {
    const [fileData, setFileData] = useState<any | null>(null)
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

    const { notification } = useNotification()
    const contextBar = useContextBar()

    useEffect(() => {
        if (assessment?.course) {
            setSelectedCourse(assessment?.course?.id)
        }
    }, [assessment])

    const router = useRouter()
    const rtoId = router.query.id
    const rtoCourses = useGetSubAdminRTOCoursesQuery(Number(rtoId), {
        skip: !rtoId,
    })
    const [create, createResult] = useCreateRtoSubAdminAssessmentToolsMutation()
    const [update, updateResult] = useUpdateRtoSubAdminAssessmentToolsMutation()

    useEffect(() => {
        if (createResult.isSuccess) {
            notification.success({
                title: 'Assessment Tool Created',
                description: 'Assessment Tool Created Successfully',
            })
            contextBar.setTitle(null)
        }
    }, [createResult])

    useEffect(() => {
        if (updateResult.isSuccess) {
            notification.info({
                title: 'Assessment Tool Updated',
                description: 'Assessment Tool Updated Successfully',
            })
            contextBar.setTitle(null)
        }
    }, [updateResult])

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
        const course = values?.course?.id || values?.course
        const formData = new FormData()
        if (edit) {
            delete values.course
            delete values.id
            formData.append('course', course)
        }
        fileData && formData.append('file', fileData)
        Object.keys(values).map((key) => {
            formData.append(key, values[key])
        })
        edit
            ? await update({ body: formData, assessment: assessment?.id })
            : await create({ body: formData, id: String(rtoId) })
    }

    return (
        <div>
            <ShowErrorNotifications result={createResult} />
            <ShowErrorNotifications result={updateResult} />
            {/* <Typography variant={'small'} color={'text-gray-500'}>
                Add Assessment
            </Typography> */}
            {/* <Typography variant={'label'}>Job Tranining Institute</Typography> */}
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
                            value={coursesOptions?.find(
                                (c: any) => c?.value === Number(selectedCourse)
                            )}
                            loading={rtoCourses.isLoading}
                            disabled={rtoCourses.isLoading}
                            onChange={(e: number) => setSelectedCourse(e)}
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
                        <Button
                            submit
                            variant={edit ? 'info' : 'primary'}
                            disabled={
                                edit
                                    ? updateResult.isLoading
                                    : createResult.isLoading
                            }
                            loading={
                                edit
                                    ? updateResult.isLoading
                                    : createResult.isLoading
                            }
                        >
                            {edit ? 'Update' : 'Add'} Assessment
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
