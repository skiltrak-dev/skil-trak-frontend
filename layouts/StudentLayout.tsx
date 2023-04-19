import {
    DisplayAlerts,
    PageTitle,
    PageTitleProps,
    RedirectUnApprovedUsers,
    StudentNavbar,
} from '@components'
import { useAlert, useJoyRide } from '@hooks'
import { StudentContextBar } from '@partials/student/components'
import { UserStatus } from '@types'
import { AuthUtils, getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import Joyride from 'react-joyride'
import { UserLayout } from './UserLayout'
import { ProfileModal } from '@partials/student/Profile/modal/ProfileModal'
import { useGetStudentProfileDetailQuery } from '@queries'

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
        if (keyValue && keyValue != 'NA' && !Array.isArray(keyValue)) {
            filledValues++
        } else if (Array.isArray(keyValue) && keyValue?.length > 0) {
            filledValues++
        }
    })

    const profileCompletion = Math.floor((filledValues / totalValues) * 100)

    useEffect(() => {
        if (profileCompletion && profileCompletion < 100) {
            setModal(<ProfileModal />)
        } else {
            setModal(null)
        }
    }, [profileCompletion])

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
                            <StudentNavbar />
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
