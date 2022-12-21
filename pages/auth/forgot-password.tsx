import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { Form, Formik } from 'formik'
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

const ForgotPassword: NextPage = () => {
    const router = useRouter()

    const [emailSent, setEmailSent] = useState(false)

    const initialValues = {
        email: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid Email')
            .required('Email is required!'),
    })

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

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {({ dirty, isValid }) => {
                                    return (
                                        <Form className="mt-2 w-full">
                                            <div className="">
                                                <TextInput
                                                    label={'Email'}
                                                    name={'email'}
                                                    type={'email'}
                                                    placeholder={
                                                        'Your Email Here...'
                                                    }
                                                    validationIcons
                                                    required
                                                />
                                            </div>

                                            <div className="mt-4 flex items-center justify-between">
                                                <Button
                                                    submit
                                                    disabled={
                                                        !(isValid && dirty)
                                                    }
                                                    loading={false}
                                                    text={'Send Reset Email'}
                                                />
                                            </div>
                                        </Form>
                                    )
                                }}
                            </Formik>
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
