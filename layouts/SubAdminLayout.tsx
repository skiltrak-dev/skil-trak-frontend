import {
    DisplayAlerts,
    PageTitle,
    PageTitleProps,
    SubAdminNavbar,
} from '@components'
import { useContextBar, useJoyRide } from '@hooks'
import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import Joyride from 'react-joyride'
import { UserLayout } from './UserLayout'
import { CommonApi } from '@queries'
import { EsignDocumentStatus } from '@utils'
import { useRouter } from 'next/router'
import { ViewUsersForEsignModal } from '@partials'

interface SubAdminLayoutProps {
    pageTitle?: PageTitleProps
    children: ReactNode
}
export const SubAdminLayout = ({
    pageTitle,
    children,
}: SubAdminLayoutProps) => {
    const [mounted, setMounted] = useState(false)
    const joyride = useJoyRide()

    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)
    const { viewAgreementModal, setViewAgreementModal } = useContextBar()

    const pendingDocuments = CommonApi.ESign.usePendingDocumentsList(
        {
            status: [EsignDocumentStatus.PENDING, EsignDocumentStatus.ReSign],
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (pendingDocuments.isSuccess) {
            const route = `/portals/student/assessments/e-sign/${pendingDocuments?.data?.[0]?.id}`

            if (
                pendingDocuments?.data &&
                viewAgreementModal === 0 &&
                pendingDocuments?.data?.length > 0 &&
                router?.pathname !== `/portals/sub-admin/e-sign/[id]`
            ) {
                setModal(
                    <ViewUsersForEsignModal
                        documents={pendingDocuments?.data}
                        onClick={() => router.push(route)}
                        route="/portals/sub-admin/e-sign"
                        onCancel={() => {
                            setViewAgreementModal((view: number) =>
                                Number(view + 1)
                            )
                            setModal(null)
                        }}
                    />
                )
            } else if (router?.pathname === `/portals/sub-admin/e-sign/[id]`) {
                setModal(null)
            }
        } else {
            setModal(null)
        }
    }, [pendingDocuments, router, viewAgreementModal])
    // const MemoNavbar = React.memo(SubAdminNavbar)
    return (
        <UserLayout>
            <>
                {modal}
                <div className="px-8">
                    <div className="mb-2">
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
                {mounted && (
                    <Joyride
                        callback={joyride.state.callback}
                        continuous
                        run={joyride.state.run}
                        stepIndex={joyride.state.stepIndex}
                        steps={joyride.state.steps}
                        showSkipButton={true}
                        // hideCloseButton={true}
                        disableScrollParentFix
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
    )
}
