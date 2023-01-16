import {
    Button,
    ContentEditor,
    Select,
    TextArea,
    TextInput,
    Typography,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminApi } from '@queries'
import { Course, Sector } from '@types'
import { isBrowser } from '@utils'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface CourseFormProps {
    onSubmit: any
    edit?: boolean
    initialValues?: Course
    requirementFile?: any
    setRequirementFile: Function
}

export const CourseForm = ({
    edit,
    onSubmit,
    initialValues,
    requirementFile,
    setRequirementFile,
}: CourseFormProps) => {
    const { data, isLoading } = AdminApi.Sectors.useListQuery({})

    const validationSchema = yup.object({
        title: yup.string().required('Title is required'),
        code: yup.string().required('Code is Required'),
        hours: yup.number().required('Hours are required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'all',
    })

    return (
        <FormProvider {...methods}>
            <form
                className="mt-2 w-full"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div className="">
                    <div className="mb-4">
                        <div className="mb-2">
                            <Typography
                                variant={'muted'}
                                color={'text-gray-400'}
                            >
                                Sector Selection
                            </Typography>
                        </div>

                        <div>
                            <Select
                                name="sector"
                                label={'Course Sector'}
                                options={data?.data.map((sector) => ({
                                    label: sector.name,
                                    value: sector.id,
                                }))}
                                loading={isLoading}
                            />
                        </div>
                    </div>

                    <div className="mb-2">
                        <Typography variant={'muted'} color={'text-gray-400'}>
                            Course Info
                        </Typography>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8">
                        <TextInput
                            label={'Code'}
                            name={'code'}
                            placeholder={'Course Code...'}
                            required
                            validationIcons
                        />

                        <TextInput
                            label={'Title'}
                            name={'title'}
                            placeholder={'Course Title...'}
                            required
                            validationIcons
                        />

                        <TextInput
                            label={'Hours'}
                            name={'hours'}
                            placeholder={'Course Hours...'}
                            required
                            validationIcons
                        />
                    </div>

                    <div>
                        {isBrowser() && <ContentEditor
                            label="Requirement"
                            content={requirementFile}
                            setContent={setRequirementFile}
                        />}
                    </div>

                    <div className="grid grid-cols-1 gap-x-8">
                        <TextArea
                            label={'Description'}
                            name={'description'}
                            placeholder={'Course Description...'}
                            required
                            validationIcons
                        />
                    </div>

                    <div>
                        <Button
                            submit
                            // disabled={!(isValid && dirty)}
                            // loading={loginResult.isLoading}
                        >
                            {edit ? 'Update Course' : 'Add Course'}
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
