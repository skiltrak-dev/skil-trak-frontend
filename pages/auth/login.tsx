import { ReactElement, useEffect, useState } from 'react'

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
import { LoginCredentials, StatusType, UserStatus } from '@types'
import { AuthUtils, isBrowser } from '@utils'
import { UserRoles } from '@constants'
import { LoginErrorAfterHoursModal } from '@modals'

const Login: NextPage = () => {
    const router = useRouter()

    const [login, loginResult] = AuthApi.useLogin()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const [requested, setRequested] = useState(false)
    const [rejected, setRejected] = useState(false)
    const [archived, setArchived] = useState(false)
    const [blocked, setBlocked] = useState(false)
    const [rememberLogin, setRememberLogin] = useState<boolean>(false)
    const [autoLogoutUrl, setAutoLogoutUrl] = useState<{
        url: URL | null
        role: string | null | undefined
    }>({
        url: null,
        role: '',
    })

    const chkRoleAndUrl = (role: string) =>
        autoLogoutUrl.url && autoLogoutUrl.role === role

    const nextDestination = (role: string) => {
        switch (role) {
            case UserRoles.ADMIN:
                chkRoleAndUrl(role)
                    ? router.push(autoLogoutUrl.url as URL)
                    : router.push('/portals/admin')
                break
            case UserRoles.INDUSTRY:
                chkRoleAndUrl(role)
                    ? router.push(autoLogoutUrl.url as URL)
                    : router.push('/portals/industry')
                break
            case UserRoles.RTO:
                chkRoleAndUrl(role)
                    ? router.push(autoLogoutUrl.url as URL)
                    : router.push('/portals/rto')
                break
            case UserRoles.STUDENT:
                chkRoleAndUrl(role)
                    ? router.push(autoLogoutUrl.url as URL)
                    : router.push('/portals/student')
                break
            case UserRoles.SUBADMIN:
                chkRoleAndUrl(role)
                    ? router.push(autoLogoutUrl.url as URL)
                    : router.push('/portals/sub-admin')
                break
        }
    }

    const onLogin = (status: StatusType, role: UserRoles) => {
        switch (status) {
            case UserStatus.Pending:
                setRequested(true)
                break
            case UserStatus.Archived:
                nextDestination(role)
                break
            case UserStatus.Blocked:
                setBlocked(true)
                break
            case UserStatus.Rejected:
                setRejected(true)
                break
            case UserStatus.Approved:
                nextDestination(role)
                break
        }
    }
    useEffect(() => {
        if (loginResult.isSuccess) {
            if (loginResult.data) {
                if (rememberLogin) {
                    AuthUtils.setToken(loginResult.data.access_token)
                    AuthUtils.setRefreshToken(loginResult.data.refreshToken)
                    if (isBrowser()) {
                        localStorage.setItem('rememberMe', 'true')
                    }
                } else {
                    AuthUtils.setTokenToSession(loginResult.data.access_token)
                    AuthUtils.setRefreshTokenToSessionStorage(
                        loginResult.data.refreshToken
                    )
                }

                onLogin(loginResult.data.status, loginResult.data?.role)
            }
        }
    }, [loginResult.isSuccess])

    const onSubmit = async (values: LoginCredentials) => {
        if (isBrowser()) {
            const autoLogoutUrl = localStorage.getItem('autoLogoutPath')
            const role = autoLogoutUrl?.split('/')[2]
            setAutoLogoutUrl({
                url: localStorage.getItem('autoLogoutPath') as any,
                role: role === 'sub-admin' ? UserRoles.SUBADMIN : role,
            })
        }

        AuthUtils.logout()
        setRememberLogin(values?.remember as boolean)
        await login(values).then((res: any) => {
            if (res?.error?.data?.error === 'ahle') {
                setModal(
                    <LoginErrorAfterHoursModal
                        onCancel={() => {
                            setModal(null)
                        }}
                        error={res?.error?.data}
                    />
                )
            }
        })
    }

    return (
        <AuthLayout type="log-in">
            {modal}
            {requested && <AccountStatus status={UserStatus.Pending} />}
            {rejected && <AccountStatus status={UserStatus.Rejected} />}
            {archived && <AccountStatus status={UserStatus.Archived} />}
            {blocked && <AccountStatus status={UserStatus.Blocked} />}

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
