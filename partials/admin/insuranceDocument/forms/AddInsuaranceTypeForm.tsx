import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Button, TextInput } from '@components'

export const AddInsuaranceTypeForm = ({
    result,
    onSubmit,
}: {
    result: any
    onSubmit: (values: any) => void
}) => {
    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
    })

    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    return (
        <div>
            {' '}
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <TextInput name="title" placeholder="Add Ttile here..." />
                    <div className="flex justify-end">
                        <Button
                            submit
                            text="Add Type"
                            loading={result?.isLoading}
                            disabled={result?.isLoading}
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
