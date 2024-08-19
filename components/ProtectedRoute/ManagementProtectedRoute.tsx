import { useEffect, useState } from 'react'
import { UserRoles } from '@constants'
import { SubAdminApi } from '@queries'
import { AuthUtils } from '@utils'
import { useRouter } from 'next/router'

export const ManagementProtectedRoute = ({
    children,
}: {
    children: JSX.Element
}) => {
    const [authorized, setAuthorized] = useState(false)
    const router = useRouter()
    const role = AuthUtils.getUserCredentials()?.role
    const authenticated = AuthUtils.isAuthenticated()
    const pathname = router.pathname
    const assessRole = pathname ? pathname?.split('/')[2] : ''
    const updatedRoute =
        assessRole === 'management'
            ? role === UserRoles.MANAGER
                ? UserRoles.MANAGER
                : role === UserRoles.MARKETING
                ? UserRoles.MARKETING
                : assessRole
            : assessRole


    useEffect(() => {
        if (!authenticated) {
            setAuthorized(false)
            router.push('/auth/management-login')
        } else if (updatedRoute !== role) {
            setAuthorized(false)
            router.push('/404')
        } else {
            setAuthorized(true)
        }
    }, [router, updatedRoute, role])

    return authorized ? children : null
}
