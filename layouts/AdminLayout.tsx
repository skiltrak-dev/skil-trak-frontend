import { ReactElement, ReactNode } from 'react'

// components
import {
    AdminNavbar,
    ContextBar,
    DisplayAlerts,
    DisplayNotifications,
    SideBar,
} from '@components'
import { IconType } from 'react-icons'
import { FaClipboardList, FaUniversity, FaUserGraduate } from 'react-icons/fa'
import { IoMdBriefcase } from 'react-icons/io'
import {
    MdHomeWork,
    MdSpaceDashboard,
    MdSubscriptions,
    MdVolunteerActivism,
} from 'react-icons/md'
import { RiShieldUserFill, RiVoiceRecognitionLine } from 'react-icons/ri'

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
        text: 'Sectors',
        path: getRoutePath('/sectors?tab=sectors&page=1&pageSize=50'),
        Icon: FaClipboardList,
    },
    {
        text: 'Appointments',
        path: getRoutePath('/appointment-type'),
        Icon: FaClipboardList,
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
    // {
    //     text: 'Ticket',
    //     path: 'ticket/*',
    //     Icon: HiTicket,
    // },
    // {
    //   text: 'Acts',
    //   path: 'acts/*',
    //   Icon: BsInfoSquareFill,
    // },
    {
        text: 'Subscribers',
        path: getRoutePath('/subscribers'),
        Icon: MdSubscriptions,
    },
    {
        text: 'SMS',
        path: getRoutePath('/sms'),
        Icon: MdSubscriptions,
    },
    {
        text: 'Documents',
        path: getRoutePath('/documents'),
        Icon: MdSubscriptions,
    },
]

export const AdminLayout = ({ children }: any) => {
    return (
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
                        <div className="w-full mb-28 py-3">{children}</div>
                    </div>
                    <ContextBar />
                </div>
            </div>
        </div>
    )
}
