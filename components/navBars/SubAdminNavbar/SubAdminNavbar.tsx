import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { CommonApi, SubAdminApi } from '@queries'
import {
    FaClipboardList,
    FaFileSignature,
    FaUserGraduate,
} from 'react-icons/fa'
import { HiDocumentReport, HiUsers } from 'react-icons/hi'
import { IoMdSettings } from 'react-icons/io'
import { MdEmail, MdSpaceDashboard } from 'react-icons/md'
import { NavLinkItem } from '../NavLinkItem'
import { GrUserAdmin } from 'react-icons/gr'

const PREFIX = '/portals/sub-admin'
const Routes = {
    Dashboard: `${PREFIX}`,
    Students: `${PREFIX}/students?tab=all`,
    Users: `${PREFIX}/users`,
    Tasks: `${PREFIX}/tasks`,
    WPCancelationReq: `${PREFIX}/cancelled-workplace-requests`,
    ESignature: `${PREFIX}/e-signature`,
    Notification: `${PREFIX}/notifications`,
    Settings: `${PREFIX}/setting`,
    Report: `${PREFIX}/report`,
    History: `${PREFIX}/history`,
    ESign: `${PREFIX}/e-sign?tab=all`,
    VolunteerRequest: `${PREFIX}/volunteer-requests?tab=pending`,
    TalentPool: `${PREFIX}/talent-pool`,
    CoordinatorsList: `${PREFIX}/department`,
    MyStudentsReports: `${PREFIX}/tasks/my-students-report`,
}

export const SubAdminNavbar = () => {
    const router = useRouter()
    const subadmin = SubAdminApi.SubAdmin.useProfile()
    const checkIsHod = subadmin?.data?.departmentMember?.isHod

    const pendingDocsCount = CommonApi.ESign.pendingDocsCount(undefined, {
        refetchOnMountOrArgChange: true,
    })

    const navBarData = [
        {
            link: Routes.Dashboard,
            text: 'Dashboard',
            Icon: MdSpaceDashboard,
            activeClasses: 'bg-indigo-100 text-indigo-700',
            inActiveClasses: 'text-slate-700',
        },
        {
            link: Routes.Students,
            text: 'Students',
            Icon: FaUserGraduate,
            activeClasses: 'bg-blue-100 text-blue-700',
            inActiveClasses: 'text-slate-700',
        },
        {
            link: Routes.Users,
            text: 'Users',
            Icon: HiUsers,
            activeClasses: 'bg-blue-100 text-blue-700',
            inActiveClasses: 'text-slate-700',
        },
        {
            link: Routes.Tasks,
            text: 'Tasks',
            Icon: FaClipboardList,
            activeClasses: 'bg-orange-100 text-orange-700',
            inActiveClasses: 'text-slate-700',
        },
        {
            link: Routes.WPCancelationReq,
            text: 'WP Cancelation Requests',
            Icon: FaClipboardList,
            activeClasses: 'bg-orange-100 text-orange-700',
            inActiveClasses: 'text-slate-700',
        },
        {
            link: Routes.Notification,
            text: 'Mails',
            Icon: MdEmail,
            activeClasses: 'bg-blue-100 text-blue-700',
            inActiveClasses: 'text-slate-700',
        },

        {
            link: Routes.ESign,
            text: 'E-Sign',
            Icon: FaFileSignature,
            activeClasses: 'bg-green-100 text-green-700',
            inActiveClasses: 'text-slate-700',
            count: pendingDocsCount?.data,
        },
        ...(checkIsHod
            ? [
                  {
                      link: Routes.CoordinatorsList,
                      text: 'Dept Coordinators',
                      Icon: GrUserAdmin,
                      activeClasses: 'bg-green-100 text-green-700',
                      inActiveClasses: 'text-slate-700',
                  },
              ]
            : []),
    ]

    const additionalMenuItems = [
        {
            link: Routes.MyStudentsReports,
            text: 'My Students Reports',
            Icon: HiDocumentReport,
            activeClasses: 'bg-blue-100 text-blue-700',
            inActiveClasses: 'text-slate-700',
        },
        {
            link: Routes.Report,
            text: 'My Reports',
            Icon: HiDocumentReport,
            activeClasses: 'bg-blue-100 text-blue-700',
            inActiveClasses: 'text-slate-700',
        },
        {
            link: Routes.Settings,
            Icon: IoMdSettings,
            activeClasses: 'bg-blue-100 text-blue-700',
            inActiveClasses: 'text-slate-700',
            mini: true,
        },
    ]

    useEffect(() => {
        if (
            (!checkIsHod &&
                (router.pathname === '/portals/sub-admin/department' ||
                    router.pathname ===
                        '/portals/sub-admin/department/students' ||
                    router.pathname ===
                        '/portals/sub-admin/department/[id]')) ||
            router.pathname ===
                '/portals/sub-admin/tickets?tab=department-tickets'
        ) {
            router.replace('/portals/sub-admin')
        }
    }, [router.pathname])

    return (
        <div className="flex justify-between items-center">
            <ul className="flex gap-x-2 py-4 w-[950px] overflow-auto custom-scrollbar">
                {navBarData.map((nav, i) => (
                    <NavLinkItem key={i} nav={nav} PREFIX={PREFIX} />
                ))}
            </ul>
            <ul className="flex gap-x-2 items-center py-4">
                {additionalMenuItems.map((nav, i) => (
                    <NavLinkItem key={i} nav={nav} PREFIX={PREFIX} />
                ))}
            </ul>
        </div>
    )
}
