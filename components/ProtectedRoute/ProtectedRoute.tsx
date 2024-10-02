import { UserRoles } from '@constants'
import { SubAdminApi } from '@queries'
import { AuthUtils, isBrowser } from '@utils'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    return children
    const data: any = useSession()
    const authenticated = !!data?.data?.accessToken
    console.log({ authenticated })

    const [authorized, setAuthorized] = useState(false)
    const router = useRouter()
    const role = data?.data?.role
    // const role = AuthUtils.getUserCredentials()?.role
    // const authenticated = AuthUtils.isAuthenticated()

    const subadmin = SubAdminApi.SubAdmin.useProfile(undefined, {
        skip: role !== UserRoles.SUBADMIN,
        refetchOnMountOrArgChange: true,
        // refetchOnFocus: true,
    })

    const pathename = router.pathname
    const assessRole = pathename ? pathename?.split('/')[2] : ''

    const updatedRoute =
        assessRole === 'sub-admin' ? UserRoles.SUBADMIN : assessRole

    const newUrl = role === UserRoles.SUBADMIN ? 'sub-admin' : role
    useEffect(() => {
        const isAdmin = subadmin?.data?.isAdmin
        if (role === UserRoles.SUBADMIN) {
            if (subadmin?.data && subadmin.isSuccess) {
                if (!authenticated) {
                    setAuthorized(false)
                    if (isBrowser()) {
                        localStorage.setItem('autoLogoutPath', router?.asPath)
                    }
                    router.push('/auth/login')
                }
                // else if (subadmin.isLoading || subadmin.isFetching) {
                if (isAdmin) {
                    if (
                        !router.pathname
                            ?.split('/')
                            ?.slice(0, 3)
                            .includes(UserRoles.ADMIN)
                    ) {
                        setAuthorized(true)
                        router.push('/portals/admin')
                    } else {
                        setAuthorized(true)
                    }
                    // }
                } else if (!isAdmin) {
                    if (
                        !router.pathname
                            .split('/')
                            ?.slice(0, 3)
                            .includes('sub-admin')
                    ) {
                        setAuthorized(true)
                        router.push('/portals/sub-admin')
                    } else {
                        setAuthorized(true)
                    }

                    // router.push('/portals/sub-admin')
                } else if (updatedRoute !== role) {
                    setAuthorized(false)
                    router.push(`/portals/${newUrl}`)
                    // router.push('/404')
                } else {
                    setAuthorized(true)
                }
            }
            // else {
            //     if (!authenticated) {
            //         setAuthorized(false)
            //         router.push('/auth/login')
            //     } else if (updatedRoute !== role) {
            //         setAuthorized(false)
            //         router.push(`/portals/${newUrl}`)
            //         // router.push('/404')
            //     } else {
            //         setAuthorized(true)
            //     }
            // }
        } else {
            if (!authenticated) {
                setAuthorized(false)
                if (isBrowser()) {
                    localStorage.setItem('autoLogoutPath', router?.asPath)
                }
                router.push('/auth/login')
            } else if (updatedRoute !== role) {
                setAuthorized(false)
                router.push(`/portals/${newUrl}`)
                // router.push('/404')
            } else {
                setAuthorized(true)
            }
        }
    }, [router, updatedRoute, role, subadmin])

    return authorized ? children : null
}
