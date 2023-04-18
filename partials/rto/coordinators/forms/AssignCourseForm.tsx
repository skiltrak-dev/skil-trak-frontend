import { Button, Select, TextArea, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminApi, RtoApi } from '@queries'
import { Course, Sector } from '@types'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface FormProps {
    onSubmit: any
    edit?: boolean
    initialValues?: Course
    result: any
}

export const AssignCourseForm = ({
    onSubmit,
    edit,
    initialValues,
    result,
}: FormProps) => {
    const validationSchema = yup.object({})

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'all',
    })

    const rto = RtoApi.Rto.useProfile()

    const coursesOptions =
        rto?.data?.courses && rto?.data?.courses?.length > 0
            ? rto?.data?.courses?.map((course: Course) => ({
                  label: course?.title,
                  value: course?.id,
              }))
            : []

    return (
        <FormProvider {...methods}>
            <form
                className="mt-2 w-full"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div className={'flex flex-col gap-y-2'}>
                    <Typography variant={'muted'} color={'text-gray-400'}>
                        Add Sectors &amp; Courses
                    </Typography>

                    <Select
                        name={'courses'}
                        label={'Courses'}
                        options={coursesOptions}
                        multi
                    />

                    <div className="flex">
                        <Button
                            submit
                            text="Assign"
                            loading={result.isLoading}
                            disabled={result.isLoading}
                        />
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
