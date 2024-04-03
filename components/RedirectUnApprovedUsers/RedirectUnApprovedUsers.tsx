import { UserStatus } from '@types'
import { AuthUtils, getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

export const RedirectUnApprovedUsers = ({
    children,
    getRoutePath,
    redirectUrls,
}: {
    children: ReactNode
    getRoutePath: string
    redirectUrls: string[]
}) => {
    const [approved, setApproved] = useState(false)

    const router = useRouter()

    const token = AuthUtils.token()
    const status = getUserCredentials()?.status

    useEffect(() => {
        if (
            token &&
            redirectUrls.includes(router.pathname) &&
            status !== UserStatus.Approved
        ) {
            router.push(getRoutePath)
            setApproved(false)
        } else {
            setApproved(true)
        }
    }, [router])
    return approved ? <> {children} </> : null
}
