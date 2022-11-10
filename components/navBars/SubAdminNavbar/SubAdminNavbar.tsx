import Link from 'next/link'
import { useRouter } from 'next/router'

import { MdNotifications, MdSpaceDashboard } from 'react-icons/md'
import { FaClipboardList, FaSignature } from 'react-icons/fa'
import { HiUsers } from 'react-icons/hi'

export const SubAdminNavbar = () => {
  const router = useRouter()

  const defaultClasses =
    'transition-all duration-300 px-4 py-2 flex gap-x-2 items-center rounded-md'

  return (
    <ul className="flex gap-x-2 py-4">
      <li>
        <Link href="/portals/sub-admin">
          <a
            className={`${router.pathname == '/portals/sub-admin'
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
        <Link href="/portals/sub-admin/users">
          <a
            className={`${router.pathname == '/portals/sub-admin/users'
              ? 'bg-green-100 text-accent-700'
              : 'text-slate-700'
              } ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
          >
            <span>
              <HiUsers />
            </span>
            <span className="text-sm font-semibold">Users</span>
          </a>
        </Link>
      </li>

      <li>
        <Link href="/portals/sub-admin/tasks">
          <a
            className={`${router.pathname == '/portals/sub-admin/tasks'
              ? 'bg-orange-100 text-orange-700'
              : 'text-slate-700'
              } ${defaultClasses} hover:bg-orange-100 hover:text-orange-700`}
          >
            <span>
              <FaClipboardList />
            </span>
            <span className="text-sm font-semibold">Tasks</span>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/portals/sub-admin/e-signature">
          <a
            className={`${router.pathname == '/portals/sub-admin/e-signature'
              ? 'bg-green-100 text-green-700'
              : 'text-slate-700'
              } ${defaultClasses} hover:bg-green-100 hover:text-green-700`}
          >
            <span>
              <FaSignature />
            </span>
            <span className="text-sm font-semibold">
              E-Signature
            </span>
          </a>
        </Link>
      </li>

      <li>
        <Link href="/portals/sub-admin/notifications">
          <a
            className={`${router.pathname == '/portals/sub-admin/notifications'
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
