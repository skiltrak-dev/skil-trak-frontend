import Link from 'next/link'
import { useRouter } from 'next/router'

import { MdNotifications, MdSpaceDashboard, MdHomeWork } from 'react-icons/md'
import { FaClipboardList } from 'react-icons/fa'
import { HiUsers } from 'react-icons/hi'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { RiAdminFill, RiAdminLine } from 'react-icons/ri'

export const RtoNavbar = () => {
    const router = useRouter()

    const defaultClasses =
        'transition-all duration-300 px-4 py-2 flex gap-x-2 items-center rounded-md'
    // students?tab=approved
    //coordinators
    return (
        <ul className="flex gap-x-2 py-4">
            <li>
                <Link legacyBehavior href="/portals/rto">
                    <a
                        className={`${
                            router.pathname == '/portals/rto'
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'text-slate-700'
                        } ${defaultClasses} hover:bg-indigo-100 hover:text-indigo-700`}
                    >
                        <span>
                            <MdSpaceDashboard />
                        </span>
                        <span className="text-sm font-semibold">Dashboard</span>
                    </a>
                </Link>
            </li>
            <li>
                <Link legacyBehavior href="/portals/rto/students?tab=active">
                    <a
                        className={`${
                            router.pathname ==
                            '/portals/rto/students?tab=approved'
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'text-slate-700'
                        } ${defaultClasses} hover:bg-indigo-100 hover:text-indigo-700`}
                        id="students"
                    >
                        <span>
                            <AiOutlineUsergroupAdd />
                        </span>
                        <span className="text-sm font-semibold">Students</span>
                    </a>
                </Link>
            </li>

            <li>
                <Link legacyBehavior href="/portals/rto/admins">
                    <a
                        className={`${
                            router.pathname == '/portals/rto/admins'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-slate-700'
                        } ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
                        id="admins"
                    >
                        <span>
                            <RiAdminLine />
                        </span>
                        <span className="text-sm font-semibold">Admins</span>
                    </a>
                </Link>
            </li>

            <li>
                <Link legacyBehavior href="/portals/rto/industries">
                    <a
                        className={`${
                            router.pathname == '/portals/rto/industries'
                                ? 'bg-green-100 text-green-700'
                                : 'text-slate-700'
                        } ${defaultClasses} hover:bg-green-100 hover:text-green-700`}
                        id="industries"
                    >
                        <span>
                            <MdHomeWork />
                        </span>
                        <span className="text-sm font-semibold">
                            Industries
                        </span>
                    </a>
                </Link>
            </li>

            <li>
                <Link legacyBehavior href="/portals/rto/tasks">
                    <a
                        className={`${
                            router.pathname == '/portals/rto/tasks'
                                ? 'bg-orange-100 text-orange-700'
                                : 'text-slate-700'
                        } ${defaultClasses} hover:bg-orange-100 hover:text-orange-700`}
                        id="tasks"
                    >
                        <span>
                            <FaClipboardList />
                        </span>
                        <span className="text-sm font-semibold">Tasks</span>
                    </a>
                </Link>
            </li>

            {/* <li>
                <Link legacyBehavior href="/portals/rto/notifications">
                    <a
                        className={`${router.pathname == '/portals/rto/notifications'
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-slate-700'
                            } ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
                        id="notifications"
                    >
                        <span>
                            <MdNotifications />
                        </span>
                        <span className="text-sm font-semibold">
                            Notifications
                        </span>
                    </a>
                </Link>
            </li> */}
            <li>
                <Link legacyBehavior href="/portals/rto/coordinators">
                    <a
                        className={`${
                            router.pathname == '/portals/rto/coordinators'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-slate-700'
                        } ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
                        id="coordinators"
                    >
                        <span>
                            <RiAdminFill />
                        </span>
                        <span className="text-sm font-semibold">
                            Coordinators
                        </span>
                    </a>
                </Link>
            </li>
        </ul>
    )
}
