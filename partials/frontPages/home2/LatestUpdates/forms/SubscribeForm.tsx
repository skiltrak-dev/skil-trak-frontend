import { Button, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const SubscribeForm = ({
    onSubmit,
    result,
}: {
    result: any
    onSubmit: () => void
}) => {
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid Email')
            .required('Email is required!'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })
    return (
        <div>
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="relative">
                        <TextInput
                            name={'email'}
                            type={'email'}
                            placeholder={'Your Email Here...'}
                            required
                            showError={false}
                        />
                        <div className="absolute top-0.5 right-1">
                            <Button
                                submit
                                // disabled={!(isValid && dirty)}
                                // loading={result.isLoading}
                                // disabled={result.isLoading}
                            >
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
