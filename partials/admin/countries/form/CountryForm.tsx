import { Button, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { Sector } from '@types'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface CountryFormProps {
    onSubmit: any
    edit?: boolean
    initialValues?: Sector
}

export const CountryForm = ({
    onSubmit,
    edit,
    initialValues,
}: CountryFormProps) => {
    const validationSchema = yup.object({
        code: yup.string().required('Country Code is Required'),
        name: yup.string().required('Country Name is required'),
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
                            Country Details
                        </Typography>
                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-2">
                        <TextInput
                            label={'Code'}
                            name={'code'}
                            placeholder={'Country Code...'}
                            required
                            validationIcons
                        />

                        <TextInput
                            label={'Name'}
                            name={'name'}
                            placeholder={'Country Name...'}
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
                            {edit ? 'Update Country' : 'Add Country'}
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
