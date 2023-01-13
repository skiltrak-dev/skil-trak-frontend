import React, { ReactElement, ReactNode, useEffect } from 'react'
import { useAlert, useNotification } from '@hooks'

// components
import {
    AdminNavbar,
    DisplayAlerts,
    DisplayNotifications,
    Footer,
    ContextBar,
    SideBar,
} from '@components'
import { MdHomeWork, MdSpaceDashboard, MdSubscriptions } from 'react-icons/md'
import { IconType } from 'react-icons'
import { FaClipboardList, FaUniversity, FaUserGraduate } from 'react-icons/fa'
import { IoMdBriefcase } from 'react-icons/io'
import { RiShieldUserFill } from 'react-icons/ri'
import { BsInfoSquareFill } from 'react-icons/bs'
import { HiTicket } from 'react-icons/hi'

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
        path: getRoutePath('/rto?tab=approved'),
    },
    {
        text: 'Students',
        path: getRoutePath('/student?tab=approved'),
        Icon: FaUserGraduate,
    },
    {
        text: 'Industry',
        path: getRoutePath('/industry?tab=approved'),
        Icon: IoMdBriefcase,
    },
    {
        text: 'Sub-Admin',
        path: getRoutePath('/sub-admin?tab=active'),
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
        path: getRoutePath('/sectors?tab=sectors'),
        Icon: FaClipboardList,
    },
    {
        text: 'Appointments',
        path: getRoutePath('/appointment-type'),
        Icon: FaClipboardList,
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
    // {
    //     text: 'Subscribers',
    //     path: 'subscribers/*',
    //     Icon: MdSubscriptions,
    //     placement: 'after',
    // },
]

export const AdminLayout = ({ children }: any) => {
    const { alert } = useAlert()
    const { notification } = useNotification()

    return (
        <div className="flex w-full h-screen overflow-hidden bg-[#F9FAFB]">
            <SideBar portalType={'admin'} routes={routes} />
            <div className="flex-grow flex flex-col justify-between">
                <div className='border-b bg-white'>
                    <AdminNavbar />
                </div>
                <div className="flex h-full">
                    <div
                        className={`h-full overflow-scroll remove-scrollbar w-full relative`}
                    >
                        <DisplayAlerts />
                        <DisplayNotifications />
                        <div className="w-full mb-28">{children}</div>
                    </div>
                    <ContextBar />
                </div>
            </div>
        </div>
    )
}
