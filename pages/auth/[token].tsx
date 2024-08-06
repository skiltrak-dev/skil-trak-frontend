import { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form, Formik } from 'formik'

import { AuthLayout } from '@layouts'
import { Animations } from '@animations'
import {
    Button,
    TextInput,
    Typography,
    BackButton,
    LottieAnimation,
    Card,
    ShowErrorNotifications,
    DisplayNotifications,
} from '@components'
import Link from 'next/link'
import Image from 'next/image'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthApi } from '@queries'

const ResetPassword: NextPage = () => {
    const router = useRouter()

    const [emailSent, setEmailSent] = useState(false)
    const [resetPassword, resetPasswordResult] = AuthApi.useResetPassword()
    const initialValues = {
        newPassword: '',
        confirmPassword: '',
    }

    const validationSchema = Yup.object({
        newPassword: Yup.string().required('Password is required!'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match!')
            .required('Confirm your password!'),
    })
    const methods = useForm({
        defaultValues: initialValues,
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = async (values: any) => {
        // send reset password email
        await resetPassword({
            body: {
                password: values.newPassword,
                confirmPassword: values.confirmPassword,
            },
            token: router.query.token,
        })
        setEmailSent(true)
        router.push('/auth/login')
    }

    const onBackToLogin = () => {
        router.push('/auth/login')
    }

    return (
        <>
            <ShowErrorNotifications result={resetPasswordResult} />
            <div className="flex justify-center items-center choose-portal-type-bg">
                <div className="mx-auto flex items-center justify-between">
                    <div className="flex flex-col flex-grow">
                        <div className="w-full mb-8 flex flex-col justify-center items-center">
                            <Link href={'/'}>
                                <Image
                                    src="/images/auth/skiltrak-logo.png"
                                    alt="logo"
                                    width={201}
                                    height={60}
                                />
                            </Link>
                            <BackButton />
                            <div className="mt-5">
                                <Typography
                                    variant={'h3'}
                                    color={'text-primaryNew'}
                                    center
                                >
                                    Reset Password
                                </Typography>
                            </div>
                        </div>

                        <Typography>
                            Please provide us with your new password.
                        </Typography>
                        <FormProvider {...methods}>
                            <form
                                className="mt-2"
                                onSubmit={methods.handleSubmit(onSubmit)}
                            >
                                <Card>
                                    <div className="">
                                        <TextInput
                                            label={'New Password'}
                                            name={'newPassword'}
                                            type={'password'}
                                            placeholder={
                                                'Your New Password Here...'
                                            }
                                            validationIcons
                                            required
                                        />

                                        <TextInput
                                            label={'Confirm Password'}
                                            name={'confirmPassword'}
                                            type={'password'}
                                            placeholder={
                                                'Confirm Your Password Here...'
                                            }
                                            validationIcons
                                            required
                                        />
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <Button
                                            submit
                                            disabled={
                                                resetPasswordResult.isLoading
                                            }
                                            loading={
                                                resetPasswordResult.isLoading
                                            }
                                            text={'Update Password'}
                                        />
                                    </div>
                                </Card>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
            <DisplayNotifications />
        </>
    )
}

export default ResetPassword
