import { UserRoles } from '@constants'
import { AuthUtils } from '@utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const [authorized, setAuthorized] = useState(false)
    const router = useRouter()
    const role = AuthUtils.getUserCredentials()?.role
    const authenticated = AuthUtils.isAuthenticated()

    const pathename = router.pathname
    const assessRole = pathename ? pathename?.split('/')[2] : ''

    const updatedRoute =
        assessRole === 'sub-admin' ? UserRoles.SUBADMIN : assessRole

    useEffect(() => {
        if (!authenticated) {
            setAuthorized(false)
            router.push('/auth/login')
        } else if (updatedRoute !== role) {
            setAuthorized(false)
            router.push('/404')
        } else {
            setAuthorized(true)
        }
    }, [router, updatedRoute, role])

    return authorized ? children : null
}
