import Link from 'next/link'
import { useRouter } from 'next/router'

import { FaBriefcase } from 'react-icons/fa'
import { MdAssessment, MdNotifications, MdSpaceDashboard } from 'react-icons/md'

export const StudentNavbar = () => {
    const router = useRouter()

    const defaultClasses =
        'transition-all duration-300 px-4 py-2 flex gap-x-2 items-center rounded-md'

    return (
        <ul className="flex gap-x-2 py-4">
            <li>
                <Link href="/student">
                    <a
                        className={`${
                            router.pathname == '/student'
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
                <Link href="/student/workplace">
                    <a
                        className={`${
                            router.pathname == '/student/workplace'
                                ? 'bg-green-100 text-green-700'
                                : 'text-slate-700'
                        } ${defaultClasses} hover:bg-green-100 hover:text-green-700`}
                    >
                        <span>
                            <FaBriefcase />
                        </span>
                        <span className="text-sm font-semibold">Workplace</span>
                    </a>
                </Link>
            </li>

            <li>
                <Link href="/student/assessments">
                    <a
                        className={`${
                            router.pathname == '/student/assessments'
                                ? 'bg-orange-100 text-orange-700'
                                : 'text-slate-700'
                        } ${defaultClasses} hover:bg-orange-100 hover:text-orange-700`}
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
                <Link href="/student/notifications">
                    <a
                        className={`${
                            router.pathname == '/student/notifications'
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
            </li>
        </ul>
    )
}
