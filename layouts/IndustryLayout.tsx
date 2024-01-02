import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import Joyride from 'react-joyride'
// components
import {
    DisplayAlerts,
    IndustryNavbar,
    PageTitle,
    PageTitleProps,
    RedirectUnApprovedUsers,
} from '@components'

// layout
import { UserLayout } from './UserLayout'

// utils
import { useAlert, useJoyRide } from '@hooks'
import { UserStatus } from '@types'
import { AuthUtils, EsignDocumentStatus } from '@utils'
import { CommonApi } from '@queries'
import { ViewUsersForEsignModal } from '@partials'

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
    const { alert, setAlerts } = useAlert()
    const joyride = useJoyRide()
    const [mounted, setMounted] = useState(false)
    const [modal, setModal] = useState<ReactElement | null>(null)

    const pendingDocuments = CommonApi.ESign.usePendingDocumentsList({
        status: EsignDocumentStatus.PENDING,
    })

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
        if (pendingDocuments.isSuccess) {
            const route = `/portals/student/assessments/e-sign/${pendingDocuments?.data?.[0]?.id}`

            if (
                pendingDocuments?.data &&
                pendingDocuments?.data?.length > 0 &&
                router?.pathname !== `/portals/industry/students/e-sign/[id]`
            ) {
                setModal(
                    <ViewUsersForEsignModal
                        documents={pendingDocuments?.data}
                        onClick={() => router.push(route)}
                        route="/portals/industry/students/e-sign"
                    />
                )
            } else if (
                router?.pathname === `/portals/industry/students/e-sign/[id]`
            ) {
                setModal(null)
            }
        } else {
            setModal(null)
        }
    }, [pendingDocuments, router])

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

        return () => {
            setAlerts([])
        }
    }, [])

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <RedirectUnApprovedUsers
            getRoutePath={getRoutePath}
            redirectUrls={redirectUrls}
        >
            <UserLayout>
                <>
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
                    {mounted && (
                        <Joyride
                            callback={joyride.state.callback}
                            continuous
                            run={joyride.state.run}
                            stepIndex={joyride.state.stepIndex}
                            steps={joyride.state.steps}
                            showSkipButton={true}
                            disableScrollParentFix
                            // hideCloseButton={true}
                            disableOverlayClose={true}
                            hideBackButton={true}
                            locale={{
                                skip: 'Close Tour',
                            }}

                            // styles={{
                            //     options: {
                            //         arrowColor: theme.black,
                            //         backgroundColor: theme.black,
                            //         primaryColor: theme.colors.purple,
                            //         textColor: theme.white,
                            //     },
                            // }}
                        />
                    )}
                </>
            </UserLayout>
        </RedirectUnApprovedUsers>
    )
}
