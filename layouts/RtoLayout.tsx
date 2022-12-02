import { PageTitle, PageTitleProps } from '@components'
import { RtoNavbar } from '@components'
import { ReactNode } from 'react'
import { UserLayout } from './UserLayout'

interface RtoLayoutProps {
    pageTitle?: PageTitleProps
    children: ReactNode
}
export const RtoLayout = ({ pageTitle, children }: RtoLayoutProps) => {
    return (
        <UserLayout>
            <div className="px-16">
                <div className="mb-4">
                    <RtoNavbar />
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
