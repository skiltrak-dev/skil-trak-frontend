import {
    DisplayNotifications,
    ManagementNavbar,
    ManagementProtectedRoute,
} from '@components'
import { ReactNode, useState } from 'react'

export const ManagementLayout = ({ children }: { children: ReactNode }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
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
