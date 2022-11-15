import Link from 'next/link'
import { useRouter } from 'next/router'

import { MdNotifications, MdSpaceDashboard } from 'react-icons/md'
import { FaClipboardList, FaSignature } from 'react-icons/fa'
import { HiUsers } from 'react-icons/hi'

export const IndustryNavbar = () => {
  const router = useRouter()

  const defaultClasses =
    'transition-all duration-300 px-4 py-2 flex gap-x-2 items-center rounded-md'

  return (
    <div className='flex items-center justify-between'>
      <ul className="flex gap-x-2 py-4">
        <li>
          <Link href="/portals/industry">
            <a
              className={`${router.pathname == '/portals/industry'
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
          <Link href="/portals/industry/tasks">
            <a
              className={`${router.pathname == '/portals/industry/tasks'
                ? 'bg-green-100 text-accent-700'
                : 'text-slate-700'
                } ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
            >
              <span>
                <HiUsers />
              </span>
              <span className="text-sm font-semibold">Tasks</span>
            </a>
          </Link>
        </li>

        <li>
          <Link href="/portals/industry/students">
            <a
              className={`${router.pathname == '/portals/industry/students'
                ? 'bg-orange-100 text-orange-700'
                : 'text-slate-700'
                } ${defaultClasses} hover:bg-orange-100 hover:text-orange-700`}
            >
              <span>
                <FaClipboardList />
              </span>
              <span className="text-sm font-semibold">Students</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/portals/industry/jobs">
            <a
              className={`${router.pathname == '/portals/industry/jobs'
                ? 'bg-green-100 text-green-700'
                : 'text-slate-700'
                } ${defaultClasses} hover:bg-green-100 hover:text-green-700`}
            >
              <span>
                <FaSignature />
              </span>
              <span className="text-sm font-semibold">
                Jobs
              </span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/portals/industry/general-info">
            <a
              className={`${router.pathname == '/portals/industry/general-info'
                ? 'bg-green-100 text-green-700'
                : 'text-slate-700'
                } ${defaultClasses} hover:bg-green-100 hover:text-green-700`}
            >
              <span>
                <FaSignature />
              </span>
              <span className="text-sm font-semibold">
                General Info
              </span>
            </a>
          </Link>
        </li>

        <li>
          <Link href="/portals/industry/notifications">
            <a
              className={`${router.pathname == '/portals/industry/notifications'
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
      <div>
        <Link href="#">
          <a
            className={`${router.pathname == '#'
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
  )
}
