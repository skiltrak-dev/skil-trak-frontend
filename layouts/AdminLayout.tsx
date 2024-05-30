import { ReactElement, ReactNode, useEffect, useRef } from 'react'

// components
import {
    AdminNavbar,
    ContextBar,
    DisplayAlerts,
    DisplayNotifications,
    ProtectedRoute,
    SideBar,
} from '@components'
import { IconType } from 'react-icons'

import { useRouter } from 'next/router'
import { BiLogoBlogger } from 'react-icons/bi'
import { BsFillTicketDetailedFill } from 'react-icons/bs'
import {
    FaClipboardList,
    FaFileInvoiceDollar,
    FaFileSignature,
    FaMapMarkedAlt,
    FaUniversity,
    FaUserGraduate,
    FaUsers,
} from 'react-icons/fa'
import { FaCircleQuestion } from 'react-icons/fa6'
import { HiOutlineDocumentText } from 'react-icons/hi2'
import { IoMdBriefcase } from 'react-icons/io'
import { LiaCertificateSolid } from 'react-icons/lia'
import {
    MdEmail,
    MdFindInPage,
    MdHistory,
    MdHomeWork,
    MdNotificationsActive,
    MdSpaceDashboard,
    MdSubscriptions,
    MdVolunteerActivism,
} from 'react-icons/md'
import { RiShieldUserFill, RiVoiceRecognitionLine } from 'react-icons/ri'
import { AdminApi, CommonApi } from '@queries'
import { UserRoles } from '@constants'

export type RouteNavLinkCountType = {
    loading: boolean
    text: number
}

export type RouteNavLink = {
    type?: 'title' | 'divider'
    Icon?: IconType | ReactElement | ReactNode
    path?: string
    text?: string
    placement?: 'before' | 'after'
    count?: RouteNavLinkCountType
}

const getRoutePath = (path: string) => `/portals/admin${path}`

export const AdminLayout = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const childrenRef = useRef<any>(null)

    const queriesCount = CommonApi.WorkBased.useWorkBaseAndTraineeCount()
    const rplCount = AdminApi.Rpl.useRplCount()
    const volunteerCount = AdminApi.Volunteer.useVolunteerCount()

    useEffect(() => {
        const handleRouteChange = () => {
            if (childrenRef.current) {
                childrenRef.current.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                })
            }
        }

        // Add event listener for route changes
        router.events.on('routeChangeComplete', handleRouteChange)

        // Remove event listener when component unmounts
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router])

    const routes: RouteNavLink[] = [
        {
            text: 'Dashboard',
            Icon: MdSpaceDashboard,
            path: getRoutePath(''),
        },
        {
            type: 'divider',
        },
        {
            type: 'title',
            text: 'Users',
        },
        {
            text: 'RTOs',
            Icon: FaUniversity,
            path: getRoutePath('/rto?tab=approved&page=1&pageSize=50'),
        },
        {
            text: 'Students',
            path: getRoutePath('/student?tab=active&page=1&pageSize=50'),
            Icon: FaUserGraduate,
        },
        {
            text: 'Industry',
            path: getRoutePath('/industry?tab=approved&page=1&pageSize=50'),
            Icon: IoMdBriefcase,
        },
        {
            text: 'Sub-Admin',
            path: getRoutePath('/sub-admin?tab=active&page=1&pageSize=50'),
            Icon: RiShieldUserFill,
        },
        {
            type: 'divider',
        },
        {
            type: 'title',
            text: 'Management',
        },
        {
            text: 'Talent Pool',
            path: getRoutePath('/talent-pool?tab=all'),
            Icon: LiaCertificateSolid,
        },
        {
            text: 'Workplace Request',
            path: getRoutePath(
                '/workplaces?tab=all-student-provided-workplace'
            ),
            Icon: MdHomeWork,
        },
        {
            text: 'Industry Listing',
            path: getRoutePath('/future-industries?tab=all&page=1&pageSize=50'),
            Icon: MdFindInPage,
        },
        {
            text: 'Sectors',
            path: getRoutePath('/sectors?tab=sectors&page=1&pageSize=50'),
            Icon: FaClipboardList,
        },
        {
            text: 'Countries & States',
            path: getRoutePath('/countries?tab=countries&page=1&pageSize=50'),
            Icon: FaMapMarkedAlt,
        },
        {
            text: 'Appointments',
            path: getRoutePath('/appointment-type'),
            Icon: FaUsers,
        },
        {
            text: 'RPL',
            path: getRoutePath('/rpl-list'),
            Icon: RiVoiceRecognitionLine,
            count: {
                loading: rplCount?.isLoading,
                text: rplCount?.data,
            },
        },
        {
            text: 'Volunteer Request',
            path: getRoutePath('/volunteer-requests?tab=pending'),
            Icon: MdVolunteerActivism,
            count: {
                loading: volunteerCount?.isLoading,
                text: volunteerCount?.data,
            },
        },
        {
            text: 'Jobs',
            path: getRoutePath('/jobs?tab=active'),
            Icon: IoMdBriefcase,
        },
        {
            text: 'Blogs',
            path: getRoutePath('/blogs?tab=published&page=1&pageSize=50'),
            Icon: BiLogoBlogger,
        },
        {
            text: 'Subscribers',
            path: getRoutePath('/subscribers'),
            Icon: MdSubscriptions,
        },
        {
            text: 'Documents',
            path: getRoutePath('/documents'),
            Icon: HiOutlineDocumentText,
        },
        {
            text: 'E-Sign',
            path: getRoutePath('/e-sign?tab=approved&page=1&pageSize=50'),
            Icon: FaFileSignature,
        },
        {
            text: 'Tickets',
            path: getRoutePath('/tickets?tab=my-open-tickets'),
            Icon: BsFillTicketDetailedFill,
        },
        {
            text: 'Queries',
            path: getRoutePath('/queries?tab=traineeship'),
            Icon: FaCircleQuestion,
            count: {
                loading: queriesCount?.isLoading,
                text: queriesCount?.data,
            },
        },
        {
            text: 'Sub-Admin As Admin Activities',
            path: getRoutePath('/sub-admin-as-admin-activities'),
            Icon: MdHistory,
        },
        // sub-admin-as-admin-activities
        {
            type: 'divider',
        },
        {
            type: 'title',
            text: 'Messages & Notifications',
        },
        {
            text: 'SMS',
            path: getRoutePath('/sms'),
            Icon: MdSubscriptions,
        },
        {
            text: 'Emails',
            path: getRoutePath('/e-mails?tab=all-mails'),
            Icon: MdEmail,
        },
        {
            text: 'Notifications',
            path: getRoutePath('/all-notifications'),
            Icon: MdNotificationsActive,
        },
        {
            type: 'divider',
        },
        {
            type: 'title',
            text: 'Accounts',
        },
        {
            text: 'Invoices',
            path: getRoutePath('/invoices'),
            Icon: FaFileInvoiceDollar,
        },
    ]
    return (
        <ProtectedRoute>
            <div className="flex w-full h-screen overflow-hidden bg-layout">
                <SideBar portalType={UserRoles.ADMIN} routes={routes} />
                {/* <div className="flex-grow flex flex-col justify-between"> */}
                <div className="flex-grow w-[calc(100vh-224px)]  justify-between">
                    <div className="border-b bg-white">
                        <AdminNavbar />
                    </div>
                    <div className="flex h-full bg-[#F8FAFC]">
                        <div
                            className={`h-full overflow-scroll remove-scrollbar w-full relative`}
                            ref={childrenRef}
                        >
                            <DisplayAlerts />
                            <DisplayNotifications />
                            {/* <div className="w-full mb-28 py-3">{children}</div> */}
                            <div className="w-full mb-28 py-1">{children}</div>
                        </div>
                        <ContextBar />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
