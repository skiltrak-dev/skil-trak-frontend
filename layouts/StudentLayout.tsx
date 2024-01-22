import {
    DisplayAlerts,
    PageTitle,
    PageTitleProps,
    RedirectUnApprovedUsers,
    StudentNavbar,
    StudentTimer,
} from '@components'
import { useAlert, useContextBar, useJoyRide } from '@hooks'
import { ProfileModal } from '@partials/student/Profile/modal/ProfileModal'
import { StudentContextBar } from '@partials/student/components'
import { CommonApi, useGetStudentProfileDetailQuery } from '@queries'
import { UserStatus } from '@types'
import { EsignDocumentStatus, getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import Joyride from 'react-joyride'
import { UserLayout } from './UserLayout'
import { ViewUsersForEsignModal } from '@partials'

interface StudentLayoutProps {
    pageTitle?: PageTitleProps
    children: ReactNode
}

const getRoutePath = `/portals/student`
const redirectUrls = [
    `${getRoutePath}/workplace/my-workplace`,
    `${getRoutePath}/workplace/my-workplace/have-workplace`,
    `${getRoutePath}/workplace/my-workplace/dont-have-workplace`,
    `${getRoutePath}/workplace/appointments`,
    `${getRoutePath}/workplace/book-appointment`,
    `${getRoutePath}/assessments/assessment-evidence`,
    `${getRoutePath}/assessments/assessment-tools`,
    `${getRoutePath}/assessments/schedule`,
    `${getRoutePath}/assessments/schedule/add-schedule`,
    `${getRoutePath}/workplace/jobs`,
    `${getRoutePath}/notifications/e-mails`,
    `${getRoutePath}/notifications/all-notifications`,
]

export const StudentLayout = ({ pageTitle, children }: StudentLayoutProps) => {
    const [mounted, setMounted] = useState(false)
    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)

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

    useEffect(() => {
        if (userData?.status === UserStatus.Pending) {
            alert.warning({
                title: `${userData?.name} is Pending`,
                description: 'Please wait for admin approval',
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

    const profile = useGetStudentProfileDetailQuery(undefined, {
        refetchOnMountOrArgChange: true,
    })

    const values = { ...profile?.data, ...profile?.data?.user }
    const keys = [
        'name',
        'email',
        'familyName',
        'phone',
        'rto',
        'studentId',
        'dob',
        'emergencyPerson',
        'emergencyPersonPhone',
        'suburb',
        'state',
        'zipCode',
        'addressLine1',
        'courses',
    ]
    // const keys = Object.keys(values)

    let totalValues = keys?.length
    let filledValues = 0
    keys.forEach((key) => {
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

    useEffect(() => {
        if (profile.isSuccess) {
            if (profileCompletion && profileCompletion < 100) {
                setModal(
                    <ProfileModal
                        profileCompletion={profileCompletion}
                        keys={keys}
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
                        <ViewUsersForEsignModal
                            documents={pendingDocuments?.data}
                            onClick={() => router.push(route)}
                            route="/portals/student/assessments/e-sign"
                        />
                    )
                } else if (
                    router?.pathname ===
                    `/portals/student/assessments/e-sign/[id]`
                ) {
                    setModal(null)
                }
            } else {
                setModal(null)
            }
        }
    }, [profileCompletion, profile, pendingDocuments, router])

    return (
        <RedirectUnApprovedUsers
            getRoutePath={getRoutePath}
            redirectUrls={redirectUrls}
        >
            {modal}
            <UserLayout>
                <>
                    <StudentContextBar />
                    <div className="px-4 mb-32 md:px-16">
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <StudentNavbar />
                                {profile.data?.expiryDate && (
                                    <StudentTimer
                                        studentId={profile.data?.user?.id}
                                        date={profile.data?.expiryDate}
                                        oldExpiry={profile?.data?.oldExpiry}
                                    />
                                )}
                            </div>
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
