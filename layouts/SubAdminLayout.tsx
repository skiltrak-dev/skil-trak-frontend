import {
    DisplayAlerts,
    PageTitle,
    PageTitleProps,
    RedirectUnApprovedUsers,
    SubAdminNavbar,
} from '@components'
import { useContextBar, useJoyRide } from '@hooks'
import { UsersPendingEsignModal } from '@partials'
import { CommonApi } from '@queries'
import { EsignDocumentStatus } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import Joyride from 'react-joyride'
import { UserLayout } from './UserLayout'
import Head from 'next/head'

interface SubAdminLayoutProps {
    pageTitle?: PageTitleProps
    children: ReactNode
}

const getRoutePath = `/portals/sub-admin`
const urls = [
    `/students`,
    `/students/[id]/detail`,
    `/users/rtos`,
    `/users/rtos/[id]`,
    `/users/industries`,
    `/users/industries/[id]`,
    `/tasks/workplace`,
    `/history`,
    `/e-sign`,
    `/e-sign/[id]`,
    `/volunteer-requests`,
    `/report`,
    `/setting`,
    `/tasks/appointments`,
    `/tasks/appointments/create-appointment`,
    `/tasks/appointments/set-schedule`,
    `/tasks/appointments/set-unavailability`,
    `/tasks/assessment-evidence`,
    `/notifications/e-mails`,
    `/notifications/bulk-email`,
    `/email-draft`,
    `/create-email-draft`,
    `/notifications/all-notifications`,
    `/tasks/my-students-report`,
    `/tasks/industry-listing`,
]

const redirectUrls = urls?.map((url: string) => `${getRoutePath}${url}`)

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
                    <UsersPendingEsignModal
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
        <RedirectUnApprovedUsers
            getRoutePath={getRoutePath}
            redirectUrls={redirectUrls}
        >
            <UserLayout>
                <>
                    {modal}

                    <Head>
                        <title>{pageTitle?.title}</title>
                    </Head>

                    <div className="px-2 lg:px-8">
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
        </RedirectUnApprovedUsers>
    )
}
