import Link from 'next/link'
import { useRouter } from 'next/router'

import { MdNotifications, MdSpaceDashboard, MdHomeWork } from 'react-icons/md'
import { FaClipboardList } from 'react-icons/fa'
import { HiDocumentReport, HiUsers } from 'react-icons/hi'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { RiAdminFill, RiAdminLine } from 'react-icons/ri'
import { NavLinkItem } from '../NavLinkItem'
import { IoDocumentTextOutline } from 'react-icons/io5'

const PREFIX = '/portals/rto'

const Routes = {
    Dashboard: `${PREFIX}`,
    Students: `${PREFIX}/students?tab=active`,
    ContactPerson: `${PREFIX}/admins/contact-person`,
    Industries: `${PREFIX}/industries`,
    Tasks: `${PREFIX}/tasks`,
    Coordinators: `${PREFIX}/coordinators?tab=my-coordinators`,
    Notifications: `${PREFIX}/notifications`,
    Report: `${PREFIX}/report`,
    InsuranceDocuments: `${PREFIX}/insurance-documents`,
}

export const RtoNavbar = () => {
    const router = useRouter()

    const rtoPortalData = [
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
            Icon: AiOutlineUsergroupAdd,
            activeClasses: 'bg-indigo-100 text-indigo-700',
            inActiveClasses: 'text-slate-700',
            id: 'students',
        },
        {
            link: Routes.ContactPerson,
            text: 'Contact Person',
            Icon: RiAdminLine,
            activeClasses: 'bg-blue-100 text-blue-700',
            inActiveClasses: 'text-slate-700',
            id: 'admins',
        },
        {
            link: Routes.Industries,
            text: 'Industries',
            Icon: MdHomeWork,
            activeClasses: 'bg-green-100 text-green-700',
            inActiveClasses: 'text-slate-700',
            id: 'industries',
        },
        // {
        //     link: Routes.Tasks,
        //     text: 'Tasks',
        //     Icon: FaClipboardList,
        //     activeClasses: 'bg-orange-100 text-orange-700',
        //     inActiveClasses: 'text-slate-700',
        //     id: 'tasks',
        // },
        {
            link: Routes.Coordinators,
            text: 'Coordinators',
            Icon: RiAdminFill,
            activeClasses: 'bg-blue-100 text-blue-700',
            inActiveClasses: 'text-slate-700',
            id: 'coordinators',
        },
        {
            link: Routes.Notifications,
            text: 'Notifications',
            Icon: MdNotifications,
            activeClasses: 'bg-blue-100 text-blue-700',
            inActiveClasses: 'text-slate-700',
            id: 'notifications',
        },
        {
            link: Routes.InsuranceDocuments,
            text: 'Insurance Documents',
            Icon: IoDocumentTextOutline,
            activeClasses: 'bg-blue-100 text-blue-700',
            inActiveClasses: 'text-slate-700',
            id: 'insuranceDocuments',
        },
    ]

    const otherLinks = [
        {
            link: Routes.Report,
            text: 'My Reports',
            Icon: HiDocumentReport,
            activeClasses: 'bg-blue-100 text-blue-700',
            inActiveClasses: 'text-slate-700',
            id: 'reports',
        },
    ]
    return (
        <div className="flex justify-between items-center">
            <ul className="flex gap-x-2 py-4">
                {rtoPortalData.map((nav, i) => (
                    <NavLinkItem key={i} nav={nav} PREFIX={PREFIX} />
                ))}
            </ul>

            <ul className="flex gap-x-2 py-4">
                {otherLinks.map((nav, i) => (
                    <NavLinkItem key={i} nav={nav} PREFIX={PREFIX} />
                ))}
            </ul>
        </div>
    )
}
