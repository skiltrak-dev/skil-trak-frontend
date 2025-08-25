import {
    Alert,
    AuthorizedUserComponent,
    DetailNavbar,
    ProtectedRoute,
} from '@components'
import { ContextBar } from '@components/sideBars'
import { UserRoles } from '@constants'
import { useAlert } from '@hooks'
import { DraggableConcernButton } from '@partials/common'
import { UserStatus } from '@types'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useRef } from 'react'

interface UserLayoutProps {
    children: ReactNode
}
export const UserLayout = ({ children }: UserLayoutProps) => {
    const router = useRouter()
    const childrenRef = useRef<any>(null)

    const userData = getUserCredentials()

    const { alert, setAlerts } = useAlert()

    useEffect(() => {
        const handleRouteChange = () => {
            if (
                router.pathname.includes('/portals/sub-admin/todo-list-details')
            ) {
                return
            }

            if (childrenRef.current) {
                // childrenRef.current.scrollTo({
                //     top: 0,
                //     left: 0,
                //     behavior: 'smooth',
                // })
            }
        }

        // Add event listener for route changes
        router.events.on('routeChangeComplete', handleRouteChange)

        // Remove event listener when component unmounts
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router])

    useEffect(() => {
        if (userData?.status === UserStatus.Pending) {
            alert.warning({
                title: `Account Pending Approval`,
                description: `${userData?.name}, your account is currently pending admin approval. Until your request is approved, your functionalities will be limited. Thank you for your patience.`,
                autoDismiss: false,
                existId: 'userStatusPending',
            })
        }
        if (userData?.status === UserStatus.Archived) {
            alert.warning({
                title: `${userData?.name} is Archived`,
                description: 'Account is archived',
                autoDismiss: false,
                existId: 'userStatusArchived',
            })
        }
        if (userData?.status === UserStatus.Blocked) {
            alert.error({
                title: `${userData?.name} is Blocked`,
                description: 'Your Account is Blocked!',
                autoDismiss: false,
                existId: 'userStatusBlocked',
            })
        }
        if (userData?.status === UserStatus.Rejected) {
            alert.error({
                title: `${userData?.name} is Rejected`,
                description: 'Account is Rejected!',
                autoDismiss: false,
                existId: 'userStatusRejected',
            })
        }
        return () => {
            setAlerts([])
        }
    }, [])
    return (
        <ProtectedRoute>
            <div>
                <DetailNavbar />
                <AuthorizedUserComponent excludeRoles={[UserRoles.SUBADMIN]}>
                    <DraggableConcernButton />
                </AuthorizedUserComponent>
                {/* Viewport & SideBar Container */}
                <div className="bg-slate-50 h-[90vh] flex justify-between w-full overflow-hidden">
                    {/* Viewport */}
                    <div
                        ref={childrenRef}
                        className="w-full flex flex-col h-full transition-all duration-300 overflow-y-scroll remove-scrollbar"
                    >
                        {children}
                    </div>
                    {/* Sidebar */}
                    <ContextBar />
                </div>
            </div>
        </ProtectedRoute>
    )
}
