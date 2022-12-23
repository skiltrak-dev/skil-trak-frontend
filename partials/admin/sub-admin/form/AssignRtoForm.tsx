import { Button, Select, TextArea, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminApi } from '@queries'
import { Course, Rto, Sector, SubAdmin } from '@types'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface FormProps {
    onSubmit: any
    edit?: boolean
    result: any
    initialValues?: Course
}

export const AssignRtoForm = ({
    result,
    onSubmit,
    edit,
    initialValues,
}: FormProps) => {
    const rtos = AdminApi.Rtos.useApprovedList()

    const validationSchema = yup.object({})

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
                <div className={'flex flex-col gap-y-2'}>
                    <Typography variant={'muted'} color={'text-gray-400'}>
                        Select RTO
                    </Typography>

                    <Select
                        name={'rto'}
                        label={'RTOs'}
                        options={
                            rtos.isLoading
                                ? []
                                : rtos.data?.map((s: Rto) => ({
                                      label: s.user.name,
                                      value: s.id,
                                  }))
                        }
                        loading={rtos.isLoading}
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
