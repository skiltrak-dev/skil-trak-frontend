import { InitialAvatar } from '@components'
import { Industry, SubAdmin } from '@types'
import Link from 'next/link'
import { FaHandshake } from 'react-icons/fa'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const SubAdminCell = ({ subAdmin }: { subAdmin: SubAdmin }) => {
    return (
        <Link
            legacyBehavior
            href={`/portals/admin/sub-admin/${subAdmin?.id}?tab=notes`}
        >
            <a className="flex items-center gap-x-2">
                <div className="shadow-inner-image rounded-full relative">
                    <InitialAvatar
                        name={subAdmin.user.name}
                        imageUrl={subAdmin.user?.avatar}
                    />
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
