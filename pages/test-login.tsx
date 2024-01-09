import { Button, TextInput } from '@components'
import { AuthLayout } from '@layouts'
import { LoginCredentials } from '@types'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSession, signIn, signOut } from 'next-auth/react'

const TestLogin = () => {
    const methods = useForm<LoginCredentials>({
        mode: 'all',
    })

    const onSubmit = (data: LoginCredentials) => {
        console.log({ data })
    }
    return (
        <AuthLayout type="log-in">
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="">
                        <TextInput
                            label={'Email'}
                            name={'email'}
                            type={'email'}
                            placeholder={'Your Email Here...'}
                            validationIcons
                            required
                        />

                        <TextInput
                            label={'Password'}
                            name={'password'}
                            type={'password'}
                            placeholder={'Your Password Here...'}
                            validationIcons
                            required
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <Button
                            submit
                            // disabled={!(isValid && dirty)}
                            // loading={result.isLoading}
                            // disabled={result.isLoading}
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </AuthLayout>
    )
}

export default TestLogin
