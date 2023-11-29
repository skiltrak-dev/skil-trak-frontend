import { UserRoles } from '@constants'
import { SubAdminApi } from '@queries'
import { AuthUtils } from '@utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const [authorized, setAuthorized] = useState(false)
    const router = useRouter()
    const role = AuthUtils.getUserCredentials()?.role
    const authenticated = AuthUtils.isAuthenticated()

    const subadmin = SubAdminApi.SubAdmin.useProfile(undefined, {
        skip: !UserRoles.SUBADMIN,
        refetchOnMountOrArgChange: true,
    })

    const pathename = router.pathname
    const assessRole = pathename ? pathename?.split('/')[2] : ''

    const updatedRoute =
        assessRole === 'sub-admin' ? UserRoles.SUBADMIN : assessRole
    useEffect(() => {
        const isAdmin = subadmin?.data?.isAdmin;
        if (role === UserRoles.SUBADMIN) {
            if (subadmin?.data && subadmin.isSuccess) {
                if (!authenticated) {
                    setAuthorized(false)
                    router.push('/auth/login')
                }
                // else if (subadmin.isLoading || subadmin.isFetching) {
                if (isAdmin) {
                    if (!router.pathname.split("/").includes("admin")) {
                        setAuthorized(true)
                        router.push('/portals/admin')
                    } else {
                        console.log('after router push admin')
                        setAuthorized(true)
                    }
                    // }
                } else if (!isAdmin) {
                    if (!router.pathname.split("/").includes("sub-admin")) {
                        setAuthorized(true)
                        router.push('/portals/sub-admin')
                    } else {
                        
                        setAuthorized(true)
                    }

                    // router.push('/portals/sub-admin')
                } else if (updatedRoute !== role) {
                    console.log('after router push back to sub-admin')
                    setAuthorized(false)
                    router.push('/404')
                } else {
                    setAuthorized(true)
                }
            }
        } else {
            if (!authenticated) {
                setAuthorized(false)
                router.push('/auth/login')
            } else if (updatedRoute !== role) {
                setAuthorized(false)
                router.push('/404')
            } else {
                setAuthorized(true)
            }
        }
    }, [router, updatedRoute, role, subadmin])

    // useEffect(() => {
    //     if (!authenticated) {
    //         setAuthorized(false)
    //         router.push('/auth/login')
    //     } else if (updatedRoute !== role) {
    //         setAuthorized(false)
    //         router.push('/404')
    //     } else {
    //         setAuthorized(true)
    //     }
    // }, [router, updatedRoute, role])

    // useEffect(() => {
    //     const isAdmin = subadmin?.data?.isAdmin

    //     if (!authenticated) {
    //         setAuthorized(false)
    //         router.push('/auth/login')
    //     } else if (role === UserRoles.SUBADMIN) {
    //         if (isAdmin) {
    //             if (router.pathname !== '/portals/admin') {
    //                 router.push('/portals/admin')
    //             }
    //             setAuthorized(true)
    //         } else {
    //             if (router.pathname !== '/portals/sub-admin') {
    //                 router.push('/portals/sub-admin')
    //             }
    //             setAuthorized(true)
    //         }
    //     } else if (role === UserRoles.ADMIN) {
    //         if (!isAdmin) {
    //             if (router.pathname !== '/portals/sub-admin') {
    //                 router.push('/portals/sub-admin')
    //             }
    //             setAuthorized(true)
    //         } else {
    //             if (router.pathname !== '/portals/admin') {
    //                 router.push('/portals/admin')
    //             }
    //             setAuthorized(true)
    //         }
    //     } else {
    //         // Handle other roles or fallback
    //         setAuthorized(false)
    //         router.push('/404')
    //     }
    // }, [router, role, subadmin, authenticated])

    return authorized ? children : null
}
