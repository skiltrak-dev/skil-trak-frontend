import { Desktop, Mobile } from '@components/Responsive'
import { getUserCredentials } from '@utils'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { FaBriefcase } from 'react-icons/fa'
import { MdAssessment, MdNotifications, MdSpaceDashboard } from 'react-icons/md'
import { LiaCertificateSolid } from "react-icons/lia";

import { NavLinkItem } from '../NavLinkItem'

const PREFIX = '/portals/student'

const Routes = {
    Dashboard: `${PREFIX}`,
    Workplace: `${PREFIX}/workplace`,
    Jobs: `${PREFIX}/jobs`,
    Assessments: `${PREFIX}/assessments`,
    Notifications: `${PREFIX}/notifications`,
    TalentPool: `${PREFIX}/talent-pool`
}

export const StudentNavbar = () => {
    const router = useRouter()

    const status = getUserCredentials()?.status

    const defaultClasses = classNames({
        'transition-all duration-300 px-4 py-2 flex flex-col md:flex-row gap-x-2 items-center rounded-md':
            true,
    })

    const studentPortalData = [
        {
            link: Routes.Dashboard,
            text: 'Dashboard',
            Icon: MdSpaceDashboard,
            activeClasses: 'bg-indigo-100 text-indigo-700',
            inActiveClasses: 'text-slate-700',
        },
        {
            link: `${Routes.Workplace}`,
            text: 'Workplace',
            Icon: FaBriefcase,
            activeClasses: 'bg-green-100 text-green-700',
            inActiveClasses: 'text-slate-700',
            id: 'workplace',
        },
        {
            link: `${Routes.Jobs}`,
            text: 'Jobs',
            Icon: FaBriefcase,
            activeClasses: 'bg-green-100 text-green-700',
            inActiveClasses: 'text-slate-700',
            id: 'workplace',
        },
        // {
        //     link: `${Routes.TalentPool}`,
        //     text: 'Talent Pool',
        //     Icon: LiaCertificateSolid,
        //     activeClasses: 'bg-blue-100 text-blue-700',
        //     inActiveClasses: 'text-slate-700',
        // },
        {
            link: `${Routes.Assessments}`,
            text: 'Assessments',
            Icon: MdAssessment,
            activeClasses: 'bg-orange-100 text-orange-700',
            inActiveClasses: 'text-slate-700',
            id: 'assessments',
        },
        {
            link: `${Routes.Notifications}`,
            text: 'Notifications',
            Icon: MdNotifications,
            activeClasses: 'bg-blue-100 text-blue-700',
            inActiveClasses: 'text-slate-700',
        },
        
    ]

    return (
        <>
            <Desktop>
                <ul className="flex gap-x-2 py-4">
                    {studentPortalData.map((nav, i) => (
                        <NavLinkItem key={i} nav={nav} PREFIX={PREFIX} />
                    ))}
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
                                className={`${
                                    router.pathname == '/student'
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
                                className={`${
                                    router.pathname ==
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
                                className={`${
                                    router.pathname ==
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
                        <Link
                            legacyBehavior
                            href="/portals/student/talent-pool"
                        >
                            <a
                                className={`${
                                    router.pathname ==
                                    '/portals/student/talent-pool'
                                        ? 'bg-orange-100 text-orange-700'
                                        : 'text-slate-700'
                                } ${defaultClasses} hover:bg-orange-100 hover:text-orange-700`}
                                id="talent-pool"
                            >
                                <span>
                                    <LiaCertificateSolid size={24} />
                                </span>
                                <span className="text-xs font-semibold">
                                    Talent Pool
                                </span>
                            </a>
                        </Link>
                    </li> */}
                </ul>
            </Mobile>
        </>
    )
}
