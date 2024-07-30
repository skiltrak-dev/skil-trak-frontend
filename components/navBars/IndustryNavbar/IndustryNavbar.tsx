import classNames from 'classnames'
import { useRouter } from 'next/router'

import { Desktop, Mobile } from '@components/Responsive'
import { IndustryApi } from '@queries'
import { FaClipboardList, FaFileSignature } from 'react-icons/fa'
import { HiUsers } from 'react-icons/hi'
import { LiaCertificateSolid } from 'react-icons/lia'
import { MdEmail, MdSpaceDashboard, MdWork } from 'react-icons/md'
import { NavLinkItem } from '../NavLinkItem'

const PREFIX = '/portals/industry'

const Routes = {
    Dashboard: `${PREFIX}`,
    Tasks: `${PREFIX}/tasks`,
    Students: `${PREFIX}/students/current-students?tab=pending`,
    Supervisors: `${PREFIX}/supervisors`,
    Jobs: `${PREFIX}/jobs/advertised-jobs`,
    ESign: `${PREFIX}/students/e-sign`,
    RequestAVolunteer: `${PREFIX}/students/request-a-volunteer`,
    Notifications: `${PREFIX}/notifications/e-mails?tab=all-mails`,
    TalentPool: `${PREFIX}/talent-pool`,
    Schedule: `${PREFIX}/tasks/add-a-schedule`,
}

export const IndustryNavbar = () => {
    const router = useRouter()
    const talentPoolProfileCount =
        IndustryApi.TalentPool.useTalentPoolProfileCount()
    const defaultClasses = classNames({
        'transition-all duration-300 px-3 py-2 flex flex-col md:flex-row gap-x-2 items-center rounded-md':
            true,
    })

    const industryPortalData = [
        {
            link: Routes.Dashboard,
            text: 'Dashboard',
            Icon: MdSpaceDashboard,
            activeClasses: 'bg-indigo-100 text-indigo-700',
            inActiveClasses: 'text-slate-700',
        },
        // {
        //     link: Routes.Tasks,
        //     text: 'Tasks',
        //     Icon: HiUsers,
        //     activeClasses: 'bg-green-100 text-accent-700',
        //     inActiveClasses: 'text-slate-700',
        //     id: 'tasks',
        // },
        {
            link: Routes.Students,
            text: 'Students',
            Icon: FaClipboardList,
            activeClasses: 'bg-orange-100 text-orange-700',
            inActiveClasses: 'text-slate-700',
            id: 'students',
        },
        // {
        //     link: Routes.Supervisors,
        //     text: 'Supervisors',
        //     Icon: MdWork,
        //     activeClasses: 'bg-green-100 text-green-700',
        //     inActiveClasses: 'text-slate-700',
        //     id: 'jobs',
        // },
        // {
        //     link: Routes.Jobs,
        //     text: 'Jobs',
        //     Icon: MdWork,
        //     activeClasses: 'bg-green-100 text-green-700',
        //     inActiveClasses: 'text-slate-700',
        //     id: 'jobs',
        // },
        // {
        //     link: Routes.TalentPool,
        //     text: 'Talent Pool',
        //     Icon: LiaCertificateSolid,
        //     activeClasses: 'bg-blue-100 text-blue-700',
        //     inActiveClasses: 'text-slate-700',
        //     count: talentPoolProfileCount?.data,
        // },
        {
            link: Routes.ESign,
            text: 'E Sign',
            Icon: FaFileSignature,
            activeClasses: 'text-slate-700',
            inActiveClasses: 'hover:bg-green-100 hover:text-green-700',
        },
        {
            link: Routes.Schedule,
            text: 'Schedule',
            Icon: FaFileSignature,
            activeClasses: 'text-slate-700',
            inActiveClasses: 'hover:bg-green-100 hover:text-green-700',
        },
        // {
        //     link: Routes.RequestAVolunteer,
        //     text: 'Request a Volunteer',
        //     Icon: FaClipboardList,
        //     activeClasses: 'text-slate-700',
        //     inActiveClasses: 'hover:bg-orange-100 hover:text-orange-700',
        //     id: 'students',
        // },
        {
            link: Routes.Notifications,
            text: 'Messages',
            Icon: MdEmail,
            activeClasses: 'bg-blue-100 text-blue-700',
            inActiveClasses: 'text-slate-700',
        },
    ]

    return (
        <>
            <Desktop>
                <div className="flex items-center justify-between">
                    <ul className="flex gap-x-2 py-4">
                        {industryPortalData.map((nav, i) => (
                            <NavLinkItem key={i} nav={nav} PREFIX={PREFIX} />
                        ))}
                    </ul>
                </div>
            </Desktop>
            <Mobile>
                <ul
                    className="flex w-full overflow-scroll gap-x-2 py-2 fixed bottom-0 left-0 right-0 bg-white z-30"
                    style={{
                        boxShadow: `0 -10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`,
                    }}
                >
                    {industryPortalData
                        // .slice(0, 6)
                        // .concat(industryPortalData.slice(7))
                        .map((nav, i) => (
                            <NavLinkItem key={i} nav={nav} PREFIX={PREFIX} />
                        ))}
                </ul>
            </Mobile>
        </>
    )
}
