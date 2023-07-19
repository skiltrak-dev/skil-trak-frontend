import { InitialAvatar } from '@components'
import { SubAdmin } from '@types'
import { QueryType, queryToUrl } from '@utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const SubAdminCell = ({ subAdmin }: { subAdmin: SubAdmin }) => {
    const router = useRouter()
    const query = queryToUrl(router.query as QueryType)
    return (
        <Link
            legacyBehavior
            href={`/portals/admin/sub-admin/${subAdmin?.id}?tab=history`}
        >
            <a
                onClick={() => {
                    sessionStorage.setItem(
                        'subadmin',
                        `${router.pathname}?${query}`
                    )
                }}
                className="flex items-center gap-x-2"
            >
                <div className="shadow-inner-image rounded-full relative">
                    {subAdmin.user.name && (
                        <InitialAvatar
                            name={subAdmin.user.name}
                            imageUrl={subAdmin.user?.avatar}
                        />
                    )}
                </div>
                <div>
                    <p className="font-semibold">{subAdmin?.user?.name}</p>
                    <div className="font-medium text-xs text-gray-500">
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdEmail />
                            </span>
                            {subAdmin?.user?.email}
                        </p>
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdPhoneIphone />
                            </span>
                            {subAdmin?.phone}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    )
}
