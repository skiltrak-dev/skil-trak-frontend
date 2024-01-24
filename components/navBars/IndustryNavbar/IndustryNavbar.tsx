import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'

import {
    MdEmail,
    MdNotifications,
    MdSpaceDashboard,
    MdWork,
} from 'react-icons/md'
import { FaClipboardList, FaSignature } from 'react-icons/fa'
import { HiInformationCircle, HiUsers } from 'react-icons/hi'
import { Desktop, Mobile } from '@components/Responsive'

// utils
import { getUserCredentials } from '@utils'

export const IndustryNavbar = () => {
    const router = useRouter()

    const defaultClasses = classNames({
        'transition-all duration-300 px-4 py-2 flex flex-col md:flex-row gap-x-2 items-center rounded-md':
            true,
    })

    return (
        <>
            <Desktop>
                <div className="flex items-center justify-between">
                    <ul className="flex gap-x-2 py-4">
                        <li>
                            <Link legacyBehavior href="/portals/industry">
                                <a
                                    className={`${
                                        router.pathname == '/portals/industry'
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'text-slate-700'
                                    } ${defaultClasses} hover:bg-indigo-100 hover:text-indigo-700`}
                                >
                                    <span>
                                        <MdSpaceDashboard />
                                    </span>
                                    <span className="text-sm font-semibold">
                                        Dashboard
                                    </span>
                                </a>
                            </Link>
                        </li>

                        <li>
                            <Link legacyBehavior href="/portals/industry/tasks">
                                <a
                                    className={`${
                                        router.pathname ==
                                        '/portals/industry/tasks'
                                            ? 'bg-green-100 text-accent-700'
                                            : 'text-slate-700'
                                    } ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
                                    id="tasks"
                                >
                                    <span>
                                        <HiUsers />
                                    </span>
                                    <span className="text-sm font-semibold">
                                        Tasks
                                    </span>
                                </a>
                            </Link>
                        </li>

                        <li>
                            <Link
                                legacyBehavior
                                href="/portals/industry/students/current-students?tab=pending"
                            >
                                <a
                                    className={`${
                                        router.pathname ==
                                        '/portals/industry/students/current-students'
                                            ? 'bg-orange-100 text-orange-700'
                                            : 'text-slate-700'
                                    } ${defaultClasses} hover:bg-orange-100 hover:text-orange-700`}
                                    id="students"
                                >
                                    <span>
                                        <FaClipboardList />
                                    </span>
                                    <span className="text-sm font-semibold">
                                        Students
                                    </span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                legacyBehavior
                                href="/portals/industry/supervisors"
                            >
                                <a
                                    className={`${
                                        router.pathname ==
                                        '/portals/industry/supervisors'
                                            ? 'bg-green-100 text-green-700'
                                            : 'text-slate-700'
                                    } ${defaultClasses} hover:bg-green-100 hover:text-green-700`}
                                    id="jobs"
                                >
                                    <span>
                                        <MdWork />
                                    </span>
                                    <span className="text-sm font-semibold">
                                        Supervisors
                                    </span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/portals/industry/jobs">
                                <a
                                    className={`${
                                        router.pathname ==
                                        '/portals/industry/jobs'
                                            ? 'bg-green-100 text-green-700'
                                            : 'text-slate-700'
                                    } ${defaultClasses} hover:bg-green-100 hover:text-green-700`}
                                    id="jobs"
                                >
                                    <span>
                                        <MdWork />
                                    </span>
                                    <span className="text-sm font-semibold">
                                        Jobs
                                    </span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                legacyBehavior
                                href="/portals/industry/general-information"
                            >
                                <a
                                    className={`${
                                        router.pathname ==
                                        '/portals/industry/general-info'
                                            ? 'bg-green-100 text-green-700'
                                            : 'text-slate-700'
                                    } ${defaultClasses} hover:bg-green-100 hover:text-green-700`}
                                >
                                    <span>
                                        <HiInformationCircle />
                                    </span>
                                    <span className="text-sm font-semibold">
                                        General Info
                                    </span>
                                </a>
                            </Link>
                        </li>
                        {/* Mails */}
                        {/* <li>
                            <Link
                                legacyBehavior
                                href="/portals/industry/e-mails"
                            >
                                <a
                                    className={`${
                                        router.pathname ==
                                        '/portals/industry/e-mails'
                                            ? 'bg-green-100 text-green-700'
                                            : 'text-slate-700'
                                    } ${defaultClasses} hover:bg-green-100 hover:text-green-700`}
                                >
                                    <span>
                                        <MdEmail />
                                    </span>
                                    <span className="text-sm font-semibold">
                                        E-mails
                                    </span>
                                </a>
                            </Link>
                        </li> */}

                        <li>
                            <Link
                                legacyBehavior
                                href="/portals/industry/notifications"
                            >
                                <a
                                    className={`${
                                        router.pathname ==
                                        '/portals/industry/notifications'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-slate-700'
                                    } ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
                                >
                                    <span>
                                <MdEmail  />
                            </span>
                            <span className="text-xs 2xl:text-sm font-semibold">
                                Mails
                            </span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                    <div>
                        <Link legacyBehavior href="#">
                            <a
                                className={`${
                                    router.pathname == '#'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-slate-700'
                                } ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
                            >
                                <span>
                                    <MdNotifications />
                                </span>
                                <span className="text-sm font-semibold">
                                    Settings
                                </span>
                            </a>
                        </Link>
                    </div>
                </div>
            </Desktop>
            <Mobile>
                <ul
                    className="flex w-full overflow-scroll gap-x-2 py-4 fixed bottom-0 left-0 right-0 bg-white z-30"
                    style={{
                        boxShadow: `0 -10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`,
                    }}
                >
                    <li>
                        <Link legacyBehavior href="/portals/industry">
                            <a
                                className={`${
                                    router.pathname == '/portals/industry'
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-slate-700'
                                } ${defaultClasses} hover:bg-indigo-100 hover:text-indigo-700`}
                            >
                                <span>
                                    <MdSpaceDashboard size={24} />
                                </span>
                                <span className="text-xs font-semibold">
                                    Dashboard
                                </span>
                            </a>
                        </Link>
                    </li>

                    <li>
                        <Link legacyBehavior href="/portals/industry/tasks">
                            <a
                                className={`${
                                    router.pathname == '/portals/industry/tasks'
                                        ? 'bg-green-100 text-accent-700'
                                        : 'text-slate-700'
                                } ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
                            >
                                <span>
                                    <HiUsers size={24} />
                                </span>
                                <span className="text-xs font-semibold">
                                    Tasks
                                </span>
                            </a>
                        </Link>
                    </li>

                    <li>
                        <Link legacyBehavior href="/portals/industry/students">
                            <a
                                className={`${
                                    router.pathname ==
                                    '/portals/industry/students'
                                        ? 'bg-orange-100 text-orange-700'
                                        : 'text-slate-700'
                                } ${defaultClasses} hover:bg-orange-100 hover:text-orange-700`}
                            >
                                <span>
                                    <FaClipboardList size={24} />
                                </span>
                                <span className="text-xs font-semibold">
                                    Students
                                </span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/portals/industry/jobs">
                            <a
                                className={`${
                                    router.pathname == '/portals/industry/jobs'
                                        ? 'bg-green-100 text-green-700'
                                        : 'text-slate-700'
                                } ${defaultClasses} hover:bg-green-100 hover:text-green-700`}
                            >
                                <span>
                                    <MdWork size={24} />
                                </span>
                                <span className="text-xs font-semibold">
                                    Jobs
                                </span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link
                            legacyBehavior
                            href="/portals/industry/general-information"
                        >
                            <a
                                className={`${
                                    router.pathname ==
                                    '/portals/industry/general-info'
                                        ? 'bg-green-100 text-green-700'
                                        : 'text-slate-700'
                                } ${defaultClasses} hover:bg-green-100 hover:text-green-700`}
                            >
                                <span>
                                    <HiInformationCircle size={24} />
                                </span>
                                <span className="text-xs whitespace-nowrap font-semibold">
                                    General Info
                                </span>
                            </a>
                        </Link>
                    </li>
                    {/* Mails */}
                    <li>
                        <Link legacyBehavior href="/portals/industry/e-mails">
                            <a
                                className={`${
                                    router.pathname ==
                                    '/portals/industry/e-mails'
                                        ? 'bg-green-100 text-green-700'
                                        : 'text-slate-700'
                                } ${defaultClasses} hover:bg-green-100 hover:text-green-700`}
                            >
                                <span>
                                    <MdEmail size={24} />
                                </span>
                                <span className="text-xs whitespace-nowrap font-semibold">
                                    E-mails
                                </span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link
                            legacyBehavior
                            href="/portals/industry/notifications"
                        >
                            <a
                                className={`${
                                    router.pathname ==
                                    '/portals/industry/notifications'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-slate-700'
                                } ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
                            >
                                <span>
                                    <MdNotifications size={24} />
                                </span>
                                <span className="text-xs font-semibold">
                                    Notifications
                                </span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="#">
                            <a
                                className={`${
                                    router.pathname == '#'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-slate-700'
                                } ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
                            >
                                <span>
                                    <MdNotifications size={24} />
                                </span>
                                <span className="text-sm font-semibold">
                                    Settings
                                </span>
                            </a>
                        </Link>
                    </li>
                </ul>
            </Mobile>
        </>
    )
}
