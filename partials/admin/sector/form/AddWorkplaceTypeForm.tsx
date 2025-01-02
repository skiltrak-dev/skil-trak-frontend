import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Select, Typography } from '@components'
import { AdminApi } from '@queries'

export const AddWorkplaceTypeForm = ({
    result,
    onSubmit,
}: {
    result: any
    onSubmit: (values: any) => void
}) => {
    const wpTypes = AdminApi.WpTypes.wpTypes(undefined)

    const validationSchema = yup.object({})

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const wpTypesOptions = wpTypes.data?.data.map((wpType) => ({
        label: wpType?.name,
        value: wpType?.id,
    }))

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
                        name={'wpTypes'}
                        label={'Workplace Types'}
                        options={wpTypesOptions}
                        loading={wpTypes.isLoading}
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
