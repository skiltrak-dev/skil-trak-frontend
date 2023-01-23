import { useState, ReactElement, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'

// components
import {
    PageTitle,
    Modal,
    IndustryNavbar,
    PageTitleProps,
    Typography,
    DisplayAlerts,
} from '@components'

// layout
import { UserLayout } from './UserLayout'

// utils
import { AuthUtils } from '@utils'
import { useAlert } from '@hooks'
import { UserStatus } from '@types'

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

    // hooks
    const { alert } = useAlert()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancelClicked = () => {
        setModal(null)
    }

    useEffect(() => {
        const displayAlerts = () => {
            switch (status) {
                case UserStatus.Pending:
                    alert.warning({
                        title: 'Your account is pending',
                        description: 'Please wait for admin approval',
                        autoDismiss: false,
                    })
                    break
                case UserStatus.Archived:
                    alert.warning({
                        title: 'Your account is Archived',
                        description:
                            'Please contact with admin to know about your status',
                        autoDismiss: false,
                    })
                    break
                case UserStatus.Blocked:
                    alert.error({
                        title: 'Your account is Blocked',
                        description:
                            'Please contact with admin to know about your status',
                        autoDismiss: false,
                    })
                    break
                case UserStatus.Rejected:
                    alert.warning({
                        title: 'Your account is rejected',
                        description:
                            'Please contact with admin to know about your status',
                        autoDismiss: false,
                    })
                    break

                default:
                    break
            }
        }
        displayAlerts()
    }, [])

    return (
        <UserLayout>
            {modal && modal}
            <div className="md:px-16 px-2 mb-24">
                <div className="mb-6">
                    <IndustryNavbar />
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
