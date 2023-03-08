import { useEffect } from 'react'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { AuthLayout } from '@layouts'

const Login: NextPage = () => {
    const router = useRouter()
    useEffect(() => {
        router.push('/auth/login')
    }, [router])

    return (
        <AuthLayout type="log-in">
            <div></div>
        </AuthLayout>
    )
}

export default Login
