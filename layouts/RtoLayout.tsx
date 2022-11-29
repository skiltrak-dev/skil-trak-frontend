import { PageTitle } from '@components'
import { RtoNavbar } from '@components'
import { ReactNode } from 'react'
import { UserLayout } from './UserLayout'

interface RtoLayoutProps {
    title?: string
    children: ReactNode
}
export const RtoLayout = ({ title, children }: RtoLayoutProps) => {
    return (
        <UserLayout>
            <div className="px-16">
                <div className="mb-4">
                    <RtoNavbar />
                </div>
                {title && (
                    <div className="mb-4">
                        <PageTitle title={title} />
                    </div>
                )}
                <div>{children}</div>
            </div>
        </UserLayout>
    )
}
