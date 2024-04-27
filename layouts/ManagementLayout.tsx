import { ProtectedRoute } from '@components'
import { ReactNode } from 'react'

export const ManagementLayout = ({ children }: { children: ReactNode }) => {
    return (
        <ProtectedRoute>
            <div>{children}</div>
        </ProtectedRoute>
    )
}
