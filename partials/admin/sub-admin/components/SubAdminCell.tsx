import { Industry, SubAdmin } from '@types'
import Link from 'next/link'
import { FaHandshake } from 'react-icons/fa'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const SubAdminCell = ({ subAdmin }: { subAdmin: SubAdmin }) => {
    return (
        <Link href={`/portals/admin/sub-admin/${subAdmin?.id}`}>
            <a className="flex items-center gap-x-2">
                <div className="shadow-inner-image rounded-full relative">
                    <img
                        src={
                            subAdmin?.user?.avatar ||
                            `https://picsum.photos/64/${64 + subAdmin?.id}`
                        }
                        className="w-10 h-10 rounded-full"
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
