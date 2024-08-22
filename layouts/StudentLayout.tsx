import {
    Button,
    PageTitle,
    GlobalModal,
    StudentTimer,
    PaymentModal,
    StudentNavbar,
    DisplayAlerts,
    PageTitleProps,
    RedirectUnApprovedUsers,
} from '@components'

import { useAlert, useJoyRide } from '@hooks'
import { UsersPendingEsignModal } from '@partials'
import { ProfileModal } from '@partials/student/Profile/modal/ProfileModal'
import {
    StudentContextBar,
    studentProfileKeys,
} from '@partials/student/components'
import { CommonApi, useGetStudentProfileDetailQuery } from '@queries'
import { UserStatus } from '@types'
import { EsignDocumentStatus, getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import Joyride from 'react-joyride'
import { UserLayout } from './UserLayout'

interface StudentLayoutProps {
    pageTitle?: PageTitleProps
    children: ReactNode
}

const getRoutePath = `/portals/student`
const urls = [
    `/workplace/my-workplace`,
    `/workplace/my-workplace/have-workplace`,
    `/workplace/my-workplace/dont-have-workplace`,
    `/workplace/appointments`,
    `/workplace/book-appointment`,
    `/assessments/assessment-evidence`,
    `/assessments/assessment-tools`,
    `/assessments/schedule`,
    `/assessments/schedule/add-schedule`,
    // `/jobs`,
    `/notifications/e-mails`,
    `/notifications/all-notifications`,
    `/assessments/e-sign`,
    `/assessments/e-sign/[id]`,
]

const redirectUrls = urls?.map((url: string) => `${getRoutePath}${url}`)

export const StudentLayout = ({ pageTitle, children }: StudentLayoutProps) => {
    const [mounted, setMounted] = useState(false)
    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancel = () => {
        setModal(null)
    }
    const { alert, setAlerts } = useAlert()
    const userData = getUserCredentials()
    const pendingDocuments = CommonApi.ESign.usePendingDocumentsList(
        {
            status: [EsignDocumentStatus.PENDING, EsignDocumentStatus.ReSign],
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )
    const joyride = useJoyRide()

    // useEffect(() => {
    //     if (userData?.status === UserStatus.Pending) {
    //         alert.warning({
    //             title: `${userData?.name} is Pending`,
    //             description: 'Please wait for admin approval',
    //             autoDismiss: false,
    //         })
    //     }
    //     return () => {
    //         setAlerts([])
    //     }
    // }, [])

    useEffect(() => {
        setMounted(true)
    }, [])

    const profile = useGetStudentProfileDetailQuery(undefined, {
        refetchOnMountOrArgChange: true,
    })

    const values = { ...profile?.data, ...profile?.data?.user }

    // const keys = Object.keys(values)

    let totalValues = studentProfileKeys?.length
    let filledValues = 0
    studentProfileKeys.forEach((key) => {
        const keyValue = values[key as keyof typeof values]
        if (
            keyValue &&
            keyValue != 'NA' &&
            keyValue != 'N/A' &&
            !Array.isArray(keyValue)
        ) {
            filledValues++
        } else if (Array.isArray(keyValue) && keyValue?.length > 0) {
            filledValues++
        }
    })

    const profileCompletion = Math.floor((filledValues / totalValues) * 100)
    const onPaymentClick = () => {
        setModal(
            <GlobalModal>
                <PaymentModal onCancel={onCancel} />
            </GlobalModal>
        )
    }

    useEffect(() => {
        if (profile.isSuccess) {
            if (profileCompletion && profileCompletion < 100) {
                setModal(
                    <ProfileModal
                        profileCompletion={profileCompletion}
                        keys={studentProfileKeys}
                    />
                )
            } else if (pendingDocuments.isSuccess) {
                const route = `/portals/student/assessments/e-sign/${pendingDocuments?.data?.[0]?.id}`
                if (
                    pendingDocuments?.data &&
                    pendingDocuments?.data?.length > 0 &&
                    router?.pathname !==
                        `/portals/student/assessments/e-sign/[id]`
                ) {
                    setModal(
                        <UsersPendingEsignModal
                            documents={pendingDocuments?.data}
                            onClick={() => router.push(route)}
                            route="/portals/student/assessments/e-sign"
                        />
                    )
                } else if (
                    router?.pathname ===
                        `/portals/student/assessments/e-sign/[id]` ||
                    (profileCompletion && profileCompletion === 100)
                ) {
                    setModal(null)
                }
            } else if (profileCompletion && profileCompletion === 100) {
                setModal(null)
            }
        }
    }, [profileCompletion, profile, pendingDocuments, router])

    const parts = router?.pathname.split('/')
    const talentPoolLink = '/' + parts.slice(1, 4).join('/')

    return (
        <RedirectUnApprovedUsers
            getRoutePath={getRoutePath}
            redirectUrls={redirectUrls}
        >
            {modal}
            <UserLayout>
                <>
                    {talentPoolLink !== '/portals/student/talent-pool' && (
                        <StudentContextBar />
                    )}
                    <div className="px-4 mb-32 md:px-8">
                        <div>
                            <div className="flex items-center gap-x-3 justify-between mb-2">
                                <StudentNavbar />
                                <div className="flex items-center gap-x-5 mt-3">
                                    <div className="">
                                        {userData?.status ===
                                            UserStatus.Archived && (
                                            <Button
                                                text="make payment to reactivate"
                                                // variant="success"
                                                onClick={onPaymentClick}
                                            />
                                        )}
                                    </div>
                                    {profile?.data?.expiryDate && (
                                        <StudentTimer
                                            studentId={profile.data?.user?.id}
                                            date={profile.data?.expiryDate}
                                            oldExpiry={profile?.data?.oldExpiry}
                                        />
                                    )}
                                </div>
                            </div>

                            <DisplayAlerts />
                        </div>
                        {pageTitle && pageTitle.title && (
                            <div className="mb-3">
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
