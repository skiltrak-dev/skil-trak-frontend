import { AuthUtils } from '@utils'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

export const RedirectRestrictedUsers = ({
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
    useEffect(() => {
        if (token && redirectUrls.includes(router.pathname)) {
            router.push(getRoutePath)
            setApproved(false)
        } else {
            setApproved(true)
        }
    }, [router, redirectUrls])
    return approved ? <> {children} </> : null
}
