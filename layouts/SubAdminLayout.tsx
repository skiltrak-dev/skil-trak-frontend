import { DisplayAlerts, PageTitle, PageTitleProps } from '@components'
import { SubAdminNavbar } from '@components'
import { ReactNode } from 'react'
import { UserLayout } from './UserLayout'

interface SubAdminLayoutProps {
    pageTitle?: PageTitleProps
    children: ReactNode
}
export const SubAdminLayout = ({
    pageTitle,
    children,
}: SubAdminLayoutProps) => {
    return (
        <UserLayout>
            <div className="px-16">
                <div className="mb-6">
                    <SubAdminNavbar />
                    <DisplayAlerts />
                </div>
                {pageTitle && pageTitle.title && (
                    <div className="mb-6">
                        <PageTitle
                            title={pageTitle.title}
                            navigateBack={pageTitle?.navigateBack}
                            backTitle={pageTitle?.backTitle}
                        />
                    </div>
                )}
                <div>{children}</div>
            </div>
        </UserLayout>
    )
}
