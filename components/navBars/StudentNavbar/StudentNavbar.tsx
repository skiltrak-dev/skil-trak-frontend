import { Desktop, Mobile } from '@components/Responsive'
import { getUserCredentials } from '@utils'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { FaBriefcase } from 'react-icons/fa'
import { MdAssessment, MdNotifications, MdSpaceDashboard } from 'react-icons/md'

export const StudentNavbar = () => {
    const router = useRouter()

    const status = getUserCredentials()?.status

    const defaultClasses = classNames({
        'transition-all duration-300 px-4 py-2 flex flex-col md:flex-row gap-x-2 items-center rounded-md':
            true,
    })

    return (
        <>
            <Desktop>
                <ul className="flex gap-x-2 py-4">
                    <li>
                        <Link legacyBehavior href="/portals/student">
                            <a
                                className={`${router.pathname == '/student'
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
                        <Link legacyBehavior href="/portals/student/workplace">
                            <a
                                className={`${router.pathname ==
                                        '/portals/student/workplace'
                                        ? 'bg-green-100 text-green-700'
                                        : 'text-slate-700'
                                    } ${defaultClasses} hover:bg-green-100 hover:text-green-700`}
                                id="workplace"
                            >
                                <span>
                                    <FaBriefcase />
                                </span>
                                <span className="text-sm font-semibold">
                                    Workplace
                                </span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link
                            legacyBehavior
                            href="/portals/student/assessments"
                        >
                            <a
                                className={`${router.pathname ==
                                        '/portals/student/assessments'
                                        ? 'bg-orange-100 text-orange-700'
                                        : 'text-slate-700'
                                    } ${defaultClasses} hover:bg-orange-100 hover:text-orange-700`}
                                id="assessments"
                            >
                                <span>
                                    <MdAssessment />
                                </span>
                                <span className="text-sm font-semibold">
                                    Assessments
                                </span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/portals/student/notifications">
                            <a
                                className={`${router.pathname == '/portals/student/notifications'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-slate-700'
                                    } ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
                            >
                                <span>
                                    <MdNotifications />
                                </span>
                                <span className="text-sm font-semibold">
                                    Notifications
                                </span>
                            </a>
                        </Link>
                    </li>{' '}
                </ul>
            </Desktop>

            <Mobile>
                <ul
                    className="flex justify-evenly gap-x-2 py-4 fixed bottom-0 left-0 right-0 bg-white z-30"
                    style={{
                        boxShadow: `0 -10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`,
                    }}
                >
                    <li>
                        <Link legacyBehavior href="/portals/student">
                            <a
                                className={`${router.pathname == '/student'
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-slate-700'
                                    } ${defaultClasses} hover:bg-indigo-100 hover:text-indigo-700`}
                            >
                                <div>
                                    <MdSpaceDashboard size={24} />
                                </div>
                                <div className="text-xs font-semibold">
                                    Dashboard
                                </div>
                            </a>
                        </Link>
                    </li>

                    <li>
                        <Link legacyBehavior href="/portals/student/workplace">
                            <a
                                className={`${router.pathname ==
                                        '/portals/student/workplace'
                                        ? 'bg-green-100 text-green-700'
                                        : 'text-slate-700'
                                    } ${defaultClasses} hover:bg-green-100 hover:text-green-700`}
                                id="workplace"
                            >
                                <span>
                                    <FaBriefcase size={24} />
                                </span>
                                <span className="text-xs font-semibold">
                                    Workplace
                                </span>
                            </a>
                        </Link>
                    </li>

                    <li>
                        <Link
                            legacyBehavior
                            href="/portals/student/assessments"
                        >
                            <a
                                className={`${router.pathname ==
                                        '/portals/student/assessments'
                                        ? 'bg-orange-100 text-orange-700'
                                        : 'text-slate-700'
                                    } ${defaultClasses} hover:bg-orange-100 hover:text-orange-700`}
                                id="assessments"
                            >
                                <span>
                                    <MdAssessment size={24} />
                                </span>
                                <span className="text-xs font-semibold">
                                    Assessments
                                </span>
                            </a>
                        </Link>
                    </li>

                    {/* <li>
                <Link legacyBehavior href="/portals/student/notifications">
                    <a
                        className={`${
                            router.pathname == '/portals/student/notifications'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-slate-700'
                        } ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
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
                </ul>
            </Mobile>
        </>
    )
}
