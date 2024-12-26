import { Button, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { Sector } from '@types'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface SectorFormProps {
    onSubmit: any
    edit?: boolean
    initialValues?: any
}

export const WorkplaceTypeForm = ({
    onSubmit,
    edit,
    initialValues,
}: SectorFormProps) => {
    const validationSchema = yup.object({
        code: yup.string().required('Sector Code is Required'),
        name: yup.string().required('Sector Name is required'),
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
                <div className="mb-8">
                    <div className="mb-3 pb-2 border-b">
                        <Typography variant={'muted'} color={'text-gray-400'}>
                            Workplace Type Details
                        </Typography>
                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-2">
                        <TextInput
                            label={'Name'}
                            name={'name'}
                            placeholder={'Workplace Type...'}
                            required
                            validationIcons
                        />
                    </div>

                    <div>
                        <Button
                            submit
                            // disabled={!(isValid && dirty)}
                            // loading={loginResult.isLoading}
                            {...(edit ? { outline: true } : {})}
                        >
                            {edit
                                ? 'Update Workplace Type'
                                : 'Add Workplace Type'}
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
