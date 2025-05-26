import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { HiDocumentReport } from 'react-icons/hi'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { MdHomeWork, MdNotifications, MdSpaceDashboard } from 'react-icons/md'
import { RiAdminFill, RiAdminLine } from 'react-icons/ri'
import { NavLinkItem } from '../NavLinkItem'
import { FaIndustry } from 'react-icons/fa'

const PREFIX = '/portals/rto'

const Routes = {
    Dashboard: `${PREFIX}`,
    Tasks: `${PREFIX}/tasks`,
    Report: `${PREFIX}/report`,
    Industries: `${PREFIX}/industries`,
    Notifications: `${PREFIX}/notifications`,
    Students: `${PREFIX}/students?tab=active`,
    ContactPerson: `${PREFIX}/admins/contact-person`,
    InsuranceDocuments: `${PREFIX}/insurance-documents`,
    WpApprovalRequest: `${PREFIX}/wp-approval-request`,
    Coordinators: `${PREFIX}/coordinators?tab=my-coordinators`,
}

export const RtoNavbar = () => {
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
        {
            link: Routes.WpApprovalRequest,
            text: 'Workplace Approval',
            Icon: FaIndustry,
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
            id: 'reports/my-report',
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
