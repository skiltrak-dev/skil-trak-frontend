import { PageTitle } from '@components'
import { SubAdminNavbar } from '@components'
import { ReactNode } from 'react'
import { UserLayout } from './UserLayout'

interface SubAdminLayoutProps {
    title?: string
    children: ReactNode
}
export const SubAdminLayout = ({ title, children }: SubAdminLayoutProps) => {
    return (
        <UserLayout>
            <div className="px-16">
                <div className="mb-6">
                    <SubAdminNavbar />
                </div>
                {title && (
                    <div className="mb-6">
                        <PageTitle title={title} />
                    </div>
                )}
                <div>{children}</div>
            </div>
        </UserLayout>
    )
}
