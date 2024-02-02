import { ReactElement, ReactNode, useEffect, useRef } from 'react'

// components
import {
    SideBar,
    ContextBar,
    AdminNavbar,
    DisplayAlerts,
    ProtectedRoute,
    DisplayNotifications,
} from '@components'
import { IconType } from 'react-icons'

import {
    FaClipboardList,
    FaUsers,
    FaFileInvoiceDollar,
    FaUniversity,
    FaUserGraduate,
} from 'react-icons/fa'
import { IoMdBriefcase } from 'react-icons/io'
import {
    MdHomeWork,
    MdSpaceDashboard,
    MdSubscriptions,
    MdVolunteerActivism,
    MdFindInPage,
    MdHistory,
} from 'react-icons/md'
import { RiShieldUserFill, RiVoiceRecognitionLine } from 'react-icons/ri'
import { MdNotificationsActive, MdEmail } from 'react-icons/md'
import { BsFillTicketDetailedFill } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi2'
import { useRouter } from 'next/router'
import { FaFileSignature } from 'react-icons/fa'
import { BiLogoBlogger } from 'react-icons/bi'
import { FaMapMarkedAlt } from 'react-icons/fa'

type Route = {
    type?: 'title' | 'divider'
    Icon?: IconType | ReactElement | ReactNode
    path?: string
    text?: string
    placement?: 'before' | 'after'
}

const getRoutePath = (path: string) => `/portals/admin${path}`
const routes: Route[] = [
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
        text: 'Workplace Request',
        path: getRoutePath('/workplaces?tab=all-student-provided-workplace'),
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
    },
    {
        text: 'Volunteer Request',
        path: getRoutePath('/volunteer-requests?tab=pending'),
        Icon: MdVolunteerActivism,
    },
    {
        text: 'Jobs',
        path: getRoutePath('/jobs'),
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

export const AdminLayout = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const childrenRef = useRef<any>(null)

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
    return (
        <ProtectedRoute>
            <div className="flex w-full h-screen overflow-hidden bg-layout">
                <SideBar portalType={'admin'} routes={routes} />
                {/* <div className="flex-grow flex flex-col justify-between"> */}
                <div className="flex-grow w-[calc(100vh-224px)]  justify-between">
                    <div className="border-b bg-white">
                        <AdminNavbar />
                    </div>
                    <div className="flex h-full">
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
