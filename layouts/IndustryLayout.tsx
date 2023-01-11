import { PageTitle } from '@components'
import { IndustryNavbar, PageTitleProps } from '@components'
import { ReactNode } from 'react'
import { UserLayout } from './UserLayout'

interface IndustryLayoutProps {
    pageTitle?: PageTitleProps
    children: ReactNode
}
export const IndustryLayout = ({
    pageTitle,
    children,
}: IndustryLayoutProps) => {
    return (
        <UserLayout>
            <div className="md:px-16 px-2 mb-24">
                <div className="mb-6">
                    <IndustryNavbar />
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
