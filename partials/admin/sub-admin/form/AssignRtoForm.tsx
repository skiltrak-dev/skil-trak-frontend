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
    assignedRtos: any
}

export const AssignRtoForm = ({
    result,
    onSubmit,
    edit,
    initialValues,
    assignedRtos,
}: FormProps) => {
    const rtos = AdminApi.Rtos.useApprovedList()

    const validationSchema = yup.object({})

    console.log('assignedRtosassignedRtos', assignedRtos)

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'all',
    })

    const assignedRtoIds = assignedRtos?.map((rto: Rto) => rto.id)

    const rtoOptions = rtos.data
        ?.filter((rto: Rto) => !assignedRtoIds?.includes(rto?.id))
        ?.map((s: Rto) => ({
            label: s.user.name,
            value: s.id,
        }))

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
                        options={rtos.isLoading ? [] : rtoOptions}
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
