import { useRouter } from 'next/router'

import { CommonApi } from '@queries'
import { getUserCredentials, isActiveRoute } from '@utils'
import {
    FaClipboardList,
    FaFileSignature,
    FaHistory,
    FaUserGraduate,
} from 'react-icons/fa'
import { HiDocumentReport, HiUsers } from 'react-icons/hi'
import { MdEmail, MdNotifications, MdSpaceDashboard } from 'react-icons/md'
import { NavLinkItem } from '../NavLinkItem'
import { Typography } from '@components/Typography'

const PREFIX = '/portals/sub-admin'
const Routes = {
    Dashboard: `${PREFIX}`,
    Students: `${PREFIX}/students?tab=all`,
    Users: `${PREFIX}/users`,
    Tasks: `${PREFIX}/tasks`,
    ESignature: `${PREFIX}/e-signature`,
    Notification: `${PREFIX}/notifications`,
    Settings: `${PREFIX}/setting`,
    Report: `${PREFIX}/report`,
    History: `${PREFIX}/history`,
    ESign: `${PREFIX}/e-sign?tab=all`,
    VolunteerRequest: `${PREFIX}/volunteer-requests?tab=pending`,
}

export const SubAdminNavbar = () => {
    const router = useRouter()

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
            link: Routes.Notification,
            text: 'Mails',
            Icon: MdEmail,
            activeClasses: 'bg-blue-100 text-blue-700',
            inActiveClasses: 'text-slate-700',
        },
        {
            link: Routes.History,
            text: 'History',
            Icon: FaHistory,
            activeClasses: 'bg-green-100 text-green-700',
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
        {
            link: Routes.VolunteerRequest,
            text: 'Volunteer Requests',
            Icon: FaClipboardList,
            activeClasses: 'bg-orange-100 text-orange-700',
            inActiveClasses: 'text-slate-700',
        },
    ]

    const additionalMenuItems = [
        {
            link: Routes.Report,
            text: 'My Reports',
            Icon: HiDocumentReport,
            activeClasses: 'bg-blue-100 text-blue-700',
            inActiveClasses: 'text-slate-700',
        },
        {
            link: Routes.Settings,
            text: 'Settings',
            Icon: MdNotifications,
            activeClasses: 'bg-blue-100 text-blue-700',
            inActiveClasses: 'text-slate-700',
        },
    ]

    return (
        <div className="flex justify-between items-center">
            <ul className="flex gap-x-2 py-4">
                {navBarData.map((nav, i) => (
                    <NavLinkItem key={i} nav={nav} PREFIX={PREFIX} />
                ))}
                {getUserCredentials()?.id == 5726 ? (
                    <Typography variant="h3">
                        {String.fromCodePoint(0x1f642)}
                        {String.fromCodePoint(0x1f643)}
                    </Typography>
                ) : (
                    ''
                )}
            </ul>
            <ul className="flex gap-x-2 py-4">
                {additionalMenuItems.map((nav, i) => (
                    <NavLinkItem key={i} nav={nav} PREFIX={PREFIX} />
                ))}
            </ul>
        </div>
    )
}
