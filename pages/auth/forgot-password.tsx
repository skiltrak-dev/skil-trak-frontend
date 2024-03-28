import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import * as Yup from 'yup'

import { Animations } from '@animations'
import { AuthLayout } from '@layouts'

import {
    BackButton,
    Button,
    LottieAnimation,
    TextInput,
    Typography,
} from '@components'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const ForgotPassword: NextPage = () => {
    const router = useRouter()

    const [emailSent, setEmailSent] = useState(false)
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid Email')
            .required('Email is required!'),
    })
    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
        // defaultValues: { ...editValues, body: bodyData },
    })
    const initialValues = {
        email: '',
    }

    const onSubmit = async (values: any) => {
        // send reset password email
        setEmailSent(true)
    }

    const onBackToLogin = () => {
        router.push('/auth/login')
    }

    return (
        <AuthLayout type="log-in">
            <div className="h-[80vh] flex justify-center items-center">
                {!emailSent ? (
                    <div className="w-3/5 mx-auto flex items-center justify-between">
                        <div className="flex flex-col items-center flex-grow">
                            <div className="w-full mb-8">
                                <BackButton />
                                <Typography variant={'h3'}>
                                    Forgot Password?
                                </Typography>
                            </div>

                            <Typography>
                                Please enter your email, you use to login in our
                                system, so we can send you a password reset
                                link.
                            </Typography>

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
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <Button
                                            submit
                                            loading={false}
                                            text={'Send Password'}
                                        />
                                    </div>
                                </form>
                            </FormProvider>
                        </div>

                        <div className="h-48 w-px bg-gray-300 mx-8"></div>

                        <div>
                            <LottieAnimation
                                height={400}
                                width={350}
                                animation={Animations.Auth.Login.ForgotPassword}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center w-2/5">
                        <LottieAnimation
                            height={240}
                            width={180}
                            loop={false}
                            animation={Animations.Common.EmailSent}
                        />

                        <div className="mt-2">
                            <Typography variant="h3" center>
                                Password Reset Link Sent
                            </Typography>
                        </div>

                        <div className="mt-2">
                            <Typography center>
                                We have sent you the password reset link to
                                provided email that is <b>this@gmail.com</b>.
                                Please check your email for further
                                instructions.
                            </Typography>
                        </div>

                        <div className="mt-16">
                            <Button
                                variant="secondary"
                                outline
                                onClick={onBackToLogin}
                            >
                                Back To Login
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </AuthLayout>
    )
}

export default ForgotPassword
