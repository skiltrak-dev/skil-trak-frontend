import { useEffect, useState } from 'react'

import Link from 'next/link'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import * as Yup from 'yup'

import {
    Button,
    Checkbox,
    TextInput,
    Typography,
    AccountStatus,
    LottieAnimation,
    LoginForm,
} from '@components'

import { AuthApi } from '@queries'
import { AuthUtils } from '@utils'
import { AuthLayout } from '@layouts'
import { Animations } from '@animations'
import { LoginCredentials, StatusType } from '@types'
import { FormProvider } from 'react-hook-form'

const Login: NextPage = () => {
    const router = useRouter()

    const [login, loginResult] = AuthApi.useLogin()

    // const [checkStatus, checkStatusResult] = AuthApi.useStatusCheck()

    const [requested, setRequested] = useState(false)
    const [rejected, setRejected] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const initialValues: LoginCredentials = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid Email')
            .required('Email is required!'),
        password: Yup.string().required('Password is required'),
    })

    const nextDestination = (role: string) => {
        switch (role) {
            case 'admin':
                router.push('/portals/admin')
                break
            case 'industry':
                router.push('/portals/industry')
                break
            case 'rto':
                router.push('/portals/rto')
                break
            case 'student':
                router.push('/portals/student')
                break
            case 'subadmin':
                router.push('/portals/sub-admin')
                break
        }
    }

    const onLogin = (status: StatusType) => {
        const role = AuthUtils.getUserCredentials().role
        switch (status) {
            case 'pending':
                setRequested(true)
                break
            case 'approved':
                nextDestination(role)
                break
            case 'rejected':
                setRejected(true)
                break
        }
    }

    // useEffect(() => {
    //     if (AuthUtils.isAuthenticated()) {
    //         checkStatus({})
    //     }
    // }, [])

    useEffect(() => {
        if (loginResult.isSuccess) {
            if (loginResult.data) {
                AuthUtils.setToken(loginResult.data.access_token)
                onLogin(loginResult.data.status)
            }
        }
    }, [loginResult.isSuccess])

    // useEffect(() => {
    //     if (checkStatusResult.isSuccess) {
    //         onLogin(checkStatusResult.data.status)
    //     }
    // }, [checkStatusResult])

    const onSubmit = async (values: LoginCredentials) => {
        await login(values)
    }

    return (
        <AuthLayout type="log-in">
            {requested && <AccountStatus status={'pending'} />}
            {rejected && <AccountStatus status={'rejected'} />}

            {!requested && !rejected && (
                // <div className="w-4/5 mx-auto flex items-center justify-between">
                <div className="w-full sm:w-4/5 mx-auto flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex flex-col items-center flex-grow">
                        <div className="w-full mb-8">
                            <Typography variant={'h3'}>
                                Login To Your Account
                            </Typography>
                        </div>

                        {loginResult.isError && (
                            <p className="text-sm text-error w-full border border-error px-2 py-1 rounded shadow text-center">
                                Invalid Email or Password
                            </p>
                        )}

                        <LoginForm
                            onSubmit={onSubmit}
                            loginResult={loginResult}
                        />

                        <div className="mt-16">
                            <Typography variant="muted">
                                Don&apos;t have account?{' '}
                                <Link href="/auth/signup">
                                    <a className="text-link">
                                        Please Create Account
                                    </a>
                                </Link>
                            </Typography>
                        </div>
                    </div>

                    <div className="hidden sm:block h-48 w-px bg-gray-300 mx-8"></div>

                    <div className="">
                        <LottieAnimation
                            height={550}
                            width={450}
                            animation={Animations.Auth.Login.Simple}
                        />
                    </div>
                </div>
            )}
        </AuthLayout>
    )
}

export default Login
