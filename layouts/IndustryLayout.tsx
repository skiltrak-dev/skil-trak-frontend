import { PageTitle } from '@components'
import { IndustryNavbar, PageTitleProps } from '@components'
import { ReactNode, useEffect } from 'react'
import { UserLayout } from './UserLayout'
import { AuthUtils } from '@utils'
import { useRouter } from 'next/router'

interface IndustryLayoutProps {
    pageTitle?: PageTitleProps
    children: ReactNode
}
export const IndustryLayout = ({
    pageTitle,
    children,
}: IndustryLayoutProps) => {
    const router = useRouter()
    const token = AuthUtils.getToken()
    const status = AuthUtils.getUserCredentials()?.status
    useEffect(() => {
        if (token && status !== 'approved') {
            router?.push('/portals/industry')
        }
    }, [router, token])

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
