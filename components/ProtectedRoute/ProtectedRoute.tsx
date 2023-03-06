import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AuthUtils } from '@utils'
import { UserRoles } from '@constants'

export const ProtectedRoute = ({ children }: { children: any }) => {
    const [authorized, setAuthorized] = useState(false)
    const router = useRouter()
    const role = AuthUtils.getUserCredentials()?.role
    const authenticated = AuthUtils.isAuthenticated()

    const pathename = router.pathname
    const assessRole = pathename ? pathename?.split('/')[2] : ''

    // useEffect(() => {
    //     if (!authenticated) {
    //         setAuthorized(false)
    //         router.push('/auth/login')
    //     } else {
    //         setAuthorized(true)
    //     }
    // const isAuth = () => {
    //     if (!authenticated) {
    //         setAuthorized(false)
    //         router.push('/auth/login')
    //     } else {
    //         setAuthorized(true)
    //     }
    // }
    // const preventAccess = () => setAuthorized(false)

    // router.events.on('routeChangeStart', preventAccess)
    // router.events.on('routeChangeComplete', isAuth)

    // return () => {
    //     router.events.off('routeChangeStart', preventAccess)
    //     router.events.off('routeChangeComplete', isAuth)
    // }
    // }, [router])

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
        // else if (authenticated) {
        //     router.push(`/portals/${role}`)
        //     setAuthorized(true)
        // }
    }, [router, updatedRoute, role])

    // useEffect(() => {
    //     const isAuth = () => {
    //         if (authenticated && assessRole !== role) {
    //             router.push('/404')
    //         } else {
    //             setAuthorized(true)
    //         }
    //     }
    //     const preventAccess = () => setAuthorized(false)
    //     router.events.on('routeChangeStart', preventAccess)
    //     router.events.on('routeChangeComplete', isAuth)

    //     return () => {
    //         router.events.off('routeChangeStart', preventAccess)
    //         router.events.off('routeChangeComplete', isAuth)
    //     }
    // }, [router, authenticated, assessRole, role])

    return authorized ? children : null
    // return authenticated && assessRole === role ? children : null
}
