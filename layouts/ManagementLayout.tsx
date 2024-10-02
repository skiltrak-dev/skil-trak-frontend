import {
    DisplayNotifications,
    ManagementNavbar,
    ManagementProtectedRoute,
} from '@components'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useMemo, useState, useRef } from 'react'

const URLS = {
    BLOGS: '/portals/management/blogs',
    DASHBOARD: '/portals/management/dashboard',
}
export const ManagementLayout = ({ children }: { children: ReactNode }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const router = useRouter()
    const role = getUserCredentials()?.role

    // If the marketing user dares to trespass
    // into the manager's domain, they'll be promptly
    // redirected to their rightful place with a virtual slap🫲!
    // useEffect(() => {
    //     const isBlogPage = router.pathname.startsWith(URLS.BLOGS)
    //     if (role !== UserRoles.MANAGER && !isBlogPage) {
    //         router.push(`${URLS.BLOGS}?tab=published&page=1&pageSize=50`)
    //     } else if (role === UserRoles.MANAGER && isBlogPage) {
    //         router.push(URLS.DASHBOARD)
    //     }
    // }, [role, router.pathname])

    return (
        <ManagementProtectedRoute>
            <div className="management-portal-log h-screen flex flex-col gap-y-4 overflow-hidden pb-8 px-6 pt-6 w-full">
                <DisplayNotifications />
                <ManagementNavbar
                    setIsExpanded={setIsExpanded}
                    isExpanded={isExpanded}
                />
                {children}
            </div>
        </ManagementProtectedRoute>
    )
}
