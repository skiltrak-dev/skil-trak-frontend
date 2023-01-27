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

const getRoutePath = `/portals/industry`

// Redirect Urls When not approved
const redirectUrls = [
    `${getRoutePath}/required-documents`,
    `${getRoutePath}/tasks/add-a-schedule`,
    `${getRoutePath}/tasks/add-a-schedule/schedule`,
    `${getRoutePath}/tasks/available-shifts`,
    `${getRoutePath}/students/current-students`,
    `${getRoutePath}/students/future-candidates`,
    `${getRoutePath}/students/request-a-volunteer`,
    `${getRoutePath}/students/appointments`,
    `${getRoutePath}/students/appointments/book-appointments`,
    `${getRoutePath}/jobs/advertised-jobs`,
    `${getRoutePath}/jobs/form`,
    `${getRoutePath}/jobs/[id]`,
    `${getRoutePath}/jobs/browse-candidates`,
    `${getRoutePath}/general-information/unit-requirements`,
    `${getRoutePath}/general-information/placement-workflow`,
    `${getRoutePath}/general-information/industry-consultation`,
    `${getRoutePath}/general-information/consultation`,
    `${getRoutePath}/general-information/mou`,
    `${getRoutePath}/e-mails`,
    `${getRoutePath}/tasks/apply-for-rpl`,
]

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

    useEffect(() => {
        if (
            token &&
            redirectUrls.includes(router.pathname) &&
            status !== UserStatus.Approved
        ) {
            router.push(getRoutePath)
        }
    }, [router])

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
