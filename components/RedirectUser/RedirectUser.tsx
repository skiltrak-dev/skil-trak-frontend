import React, { useEffect } from 'react'
import { AuthUtils } from '@utils'
import { useRouter } from 'next/router'

export const RedirectUser = ({ link }: { link: string }) => {
    const status = AuthUtils.getUserCredentials()?.status
    const token = AuthUtils.getToken()

    const router = useRouter()
    useEffect(() => {
        if (token && status !== 'approved') {
            router?.push(link)
        }
    }, [router, token])

    return null
}
