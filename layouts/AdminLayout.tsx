import { ReactElement, ReactNode } from 'react'

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
} from 'react-icons/md'
import { RiShieldUserFill, RiVoiceRecognitionLine } from 'react-icons/ri'
import { MdNotificationsActive, MdEmail } from 'react-icons/md'
import { BsFillTicketDetailedFill } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi2'

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
        path: getRoutePath('/search-workplaces?tab=all&page=1&pageSize=50'),
        Icon: MdFindInPage,
    },
    {
        text: 'Sectors',
        path: getRoutePath('/sectors?tab=sectors&page=1&pageSize=50'),
        Icon: FaClipboardList,
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
        path: getRoutePath('/volunteer-requests'),
        Icon: MdVolunteerActivism,
    },
    {
        text: 'Jobs',
        path: getRoutePath('/jobs'),
        Icon: IoMdBriefcase,
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
        text: 'Tickets',
        path: getRoutePath('/tickets?tab=my-open-tickets'),
        Icon: BsFillTicketDetailedFill,
    },
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
    return (
        <ProtectedRoute>
            <div className="flex w-full h-screen overflow-hidden bg-[#F9FAFB]">
                <SideBar portalType={'admin'} routes={routes} />
                {/* <div className="flex-grow flex flex-col justify-between"> */}
                <div className="flex-grow w-[calc(100vh-224px)]  justify-between">
                    <div className="border-b bg-white">
                        <AdminNavbar />
                    </div>
                    <div className="flex h-full">
                        <div
                            className={`h-full overflow-scroll remove-scrollbar w-full relative`}
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
