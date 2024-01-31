import {
    DisplayAlerts,
    PageTitle,
    PageTitleProps,
    RedirectUnApprovedUsers,
    RtoNavbar,
} from '@components'
import { useAlert, useContextBar, useJoyRide } from '@hooks'
import { UserStatus } from '@types'
import { AuthUtils, EsignDocumentStatus } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import Joyride from 'react-joyride'
import { UserLayout } from './UserLayout'
import { CommonApi } from '@queries'
import { ViewUsersForEsignModal } from '@partials'
interface RtoLayoutProps {
    pageTitle?: PageTitleProps
    children: ReactNode
}

const getRoutePath = `/portals/rto`

// Redirect Urls When not approved

const urls = [
    `/create`,
    `/students`,
    `/coordinators`,
    `/students/[id]`,
    `/industries/mous`,
    `/coordinators/[id]`,
    `/tasks/appointments`,
    `/industries/workplaces`,
    `/admins/contact-person`,
    `/tasks/assessment-tools`,
    `/industries/mous/[mouDetail]`,
    `/tasks/appointments/create-appointments`,
]
const redirectUrls = urls?.map((url: string) => `${getRoutePath}${url}`)

export const RtoLayout = ({ pageTitle, children }: RtoLayoutProps) => {
    const [mounted, setMounted] = useState(false)
    const joyride = useJoyRide()
    const router = useRouter()
    const { alert, setAlerts } = useAlert()
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

    const status = AuthUtils.getUserCredentials()?.status

    useEffect(() => {
        if (status === UserStatus.Pending) {
            alert.warning({
                title: `Your account is Pending`,
                description:
                    'Your request is waiting for approval. Meanwhile, your functionalities will be limited',
                autoDismiss: false,
            })
        }
        return () => {
            setAlerts([])
        }
    }, [])

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
                router?.pathname !== `/portals/rto/tasks/e-sign/[id]`
            ) {
                setModal(
                    <ViewUsersForEsignModal
                        documents={pendingDocuments?.data}
                        onClick={() => router.push(route)}
                        route="/portals/rto/tasks/e-sign"
                        onCancel={() => {
                            setViewAgreementModal((view: number) =>
                                Number(view + 1)
                            )
                            setModal(null)
                        }}
                    />
                )
            } else if (router?.pathname === `/portals/rto/tasks/e-sign/[id]`) {
                setModal(null)
            }
        } else {
            setModal(null)
        }
    }, [pendingDocuments, router])

    return (
        <RedirectUnApprovedUsers
            getRoutePath={getRoutePath}
            redirectUrls={redirectUrls}
        >
            <UserLayout>
                <>
                    {modal}
                    <div className="px-8">
                        <div className="mb-4">
                            <RtoNavbar />
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
