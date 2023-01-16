import { useEffect, useState } from 'react'

import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
    AccountStatus,
    LoginForm,
    LottieAnimation,
    Typography,
} from '@components'

import { Animations } from '@animations'
import { AuthLayout } from '@layouts'
import { AuthApi } from '@queries'
import { LoginCredentials, StatusType } from '@types'
import { AuthUtils } from '@utils'

const Login: NextPage = () => {
    const router = useRouter()

    const [login, loginResult] = AuthApi.useLogin()

    const [requested, setRequested] = useState(false)
    const [rejected, setRejected] = useState(false)
    const [archived, setArchived] = useState(false)
    const [blocked, setBlocked] = useState(false)

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
            case 'archived':
                setArchived(true)
                break
            case 'blocked':
                setBlocked(true)
                break
            case 'rejected':
                setRejected(true)
                break
            case 'approved':
                nextDestination(role)
                break
        }
    }

    useEffect(() => {
        if (loginResult.isSuccess) {
            if (loginResult.data) {
                AuthUtils.setToken(loginResult.data.access_token)
                onLogin(loginResult.data.status)
            }
        }
    }, [loginResult.isSuccess])

    const onSubmit = async (values: LoginCredentials) => {
        await login(values)
    }

    return (
        <AuthLayout type="log-in">
            {requested && <AccountStatus status={'pending'} />}
            {rejected && <AccountStatus status={'rejected'} />}
            {archived && <AccountStatus status={'archived'} />}
            {blocked && <AccountStatus status={'blocked'} />}

            {!requested && !rejected && !archived && !blocked && (
                // <div className="w-4/5 mx-auto flex items-center justify-between">
                <div className="w-full md:w-4/5 mx-auto flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex flex-col items-center flex-grow mt-8 w-full px-4">
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

                        <LoginForm onSubmit={onSubmit} result={loginResult} />

                        {!loginResult.isLoading || !loginResult.isSuccess ? (
                            <div className="mt-16">
                                <Typography variant="muted">
                                    Don&apos;t have account?{' '}
                                    <Link legacyBehavior href="/auth/signup">
                                        <a className="text-link">
                                            Please Create Account
                                        </a>
                                    </Link>
                                </Typography>
                            </div>
                        ) : null}
                    </div>

                    <div className="hidden md:block h-48 w-px bg-gray-300 mx-8"></div>

                    <div className="hidden md:block">
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
