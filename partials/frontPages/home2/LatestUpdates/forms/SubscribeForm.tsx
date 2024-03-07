import { Button, TextInput } from '@components'
import { InputErrorMessage } from '@components/inputs/components'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const SubscribeForm = ({
    onSubmit,
    result,
}: {
    result: any
    onSubmit: (values: any) => void
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
                        <input
                            className="w-full rounded-md bg-white h-[46px] px-4"
                            placeholder="Your Email Here..."
                            {...methods.register('email')}
                        />

                        <div className="absolute z-20 top-1/2 -translate-y-1/2 right-1">
                            <Button
                                submit
                                loading={result.isLoading}
                                disabled={result.isLoading}
                            >
                                Subscribe
                            </Button>
                        </div>
                    </div>
                    <InputErrorMessage name={'email'} />
                </form>
            </FormProvider>
        </div>
    )
}
