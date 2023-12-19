import Link from 'next/link'
import { useRouter } from 'next/router'

import { isActiveRoute } from '@utils'
import {
    FaClipboardList,
    FaFileSignature,
    FaHistory,
    FaUserGraduate,
} from 'react-icons/fa'
import { HiDocumentReport, HiUsers } from 'react-icons/hi'
import { MdNotifications, MdSpaceDashboard } from 'react-icons/md'

const PREFIX = '/portals/sub-admin'
const Routes = {
    Dashboard: '/portals/sub-admin',
    Students: '/portals/sub-admin/students?tab=all',
    Users: '/portals/sub-admin/users',
    Tasks: '/portals/sub-admin/tasks',
    ESignature: '/portals/sub-admin/e-signature',
    Notification: '/portals/sub-admin/notifications',
    Settings: '/portals/sub-admin/setting',
    Report: '/portals/sub-admin/report',
    History: '/portals/sub-admin/history',
    ESign: '/portals/sub-admin/e-sign',
}
export const SubAdminNavbar = () => {
    const router = useRouter()

    const defaultClasses =
        'transition-all duration-300 px-4 py-2 flex gap-x-2 items-center rounded-md'

    const isActive = (pathname: string) => {
        return isActiveRoute(pathname, router, PREFIX, true)
    }

    return (
        <div className="flex justify-between items-center">
            <ul className="flex gap-x-2 py-4">
                <li>
                    <Link legacyBehavior href={Routes.Dashboard}>
                        <a
                            className={`${
                                isActive(Routes.Dashboard)
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'text-slate-700'
                            } ${defaultClasses} hover:bg-indigo-100 hover:text-indigo-700`}
                        >
                            <span>
                                <MdSpaceDashboard />
                            </span>
                            <span className="text-xs 2xl:text-sm font-semibold">
                                Dashboard
                            </span>
                        </a>
                    </Link>
                </li>

                <li>
                    <Link legacyBehavior href={Routes.Students}>
                        <a
                            className={`${
                                isActive(Routes.Students)
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-slate-700'
                            } ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
                            id="student"
                        >
                            <span>
                                <FaUserGraduate />
                            </span>
                            <span className="text-xs 2xl:text-sm font-semibold">
                                Students
                            </span>
                        </a>
                    </Link>
                </li>

                <li>
                    <Link legacyBehavior href={Routes.Users}>
                        <a
                            className={`${
                                isActive(Routes.Users)
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-slate-700'
                            } ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
                            id="users"
                        >
                            <span>
                                <HiUsers />
                            </span>
                            <span className="text-xs 2xl:text-sm font-semibold">
                                Users
                            </span>
                        </a>
                    </Link>
                </li>

                <li>
                    <Link legacyBehavior href={Routes.Tasks}>
                        <a
                            className={`${
                                isActive(Routes.Tasks)
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'text-slate-700'
                            } ${defaultClasses} hover:bg-orange-100 hover:text-orange-700`}
                            id="tasks"
                        >
                            <span>
                                <FaClipboardList />
                            </span>
                            <span className="text-xs 2xl:text-sm font-semibold">
                                Tasks
                            </span>
                        </a>
                    </Link>
                </li>

                <li>
                    <Link legacyBehavior href={Routes.Notification}>
                        <a
                            className={`${
                                isActive(Routes.Notification)
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-slate-700'
                            } ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
                        >
                            <span>
                                <MdNotifications />
                            </span>
                            <span className="text-xs 2xl:text-sm font-semibold">
                                Notifications
                            </span>
                        </a>
                    </Link>
                </li>

                <li>
                    <Link legacyBehavior href={Routes.History}>
                        <a
                            className={`${
                                isActive(Routes.History)
                                    ? 'bg-green-100 text-green-700'
                                    : 'text-slate-700'
                            } ${defaultClasses} hover:bg-green-100 hover:text-green-700`}
                        >
                            <span>
                                <FaHistory />
                            </span>
                            <span className="text-xs 2xl:text-sm font-semibold">
                                History
                            </span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href={Routes.ESign}>
                        <a
                            className={`${
                                isActive(Routes.ESign)
                                    ? 'bg-green-100 text-green-700'
                                    : 'text-slate-700'
                            } ${defaultClasses} hover:bg-green-100 hover:text-green-700`}
                        >
                            <span>
                                <FaFileSignature />
                            </span>
                            <span className="text-xs 2xl:text-sm font-semibold">
                                E-Sign
                            </span>
                        </a>
                    </Link>
                </li>
            </ul>
            <div className="flex items-center gap-x-2">
                <Link legacyBehavior href={Routes.Report}>
                    <a
                        className={`${
                            isActive(Routes.Report)
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-slate-700'
                        } ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
                    >
                        <span>
                            <HiDocumentReport />
                        </span>
                        <span className="text-xs 2xl:text-sm font-semibold">
                            Reports
                        </span>
                    </a>
                </Link>
                <Link legacyBehavior href={Routes.Settings}>
                    <a
                        className={`${
                            isActive(Routes.Settings)
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-slate-700'
                        } ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
                    >
                        <span>
                            <MdNotifications />
                        </span>
                        <span className="text-xs 2xl:text-sm font-semibold">
                            Settings
                        </span>
                    </a>
                </Link>
            </div>
        </div>
    )
}
