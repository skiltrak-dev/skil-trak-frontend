import { PageTitle, StudentNavbar } from '@components'
import { ReactNode } from 'react'
import { UserLayout } from './UserLayout'

interface StudentLayoutProps {
    title?: string
    children: ReactNode
}
export const StudentLayout = ({ title, children }: StudentLayoutProps) => {
    return (
        <UserLayout>
            <div className="px-16">
                <div className="mb-6">
                    <StudentNavbar />
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
