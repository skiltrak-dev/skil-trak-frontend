import { InitialAvatar } from '@components'
import { Industry, SubAdmin } from '@types'
import Link from 'next/link'
import { AiFillStar } from 'react-icons/ai'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'
import { IndustrySubAdmin } from '../AllIndustries'

export const IndustryCellInfo = ({
    industry,
    isFavorite,
}: {
    industry: IndustrySubAdmin
    isFavorite?: any
}) => {
    return (
        <Link
            legacyBehavior
            href={`/portals/sub-admin/users/industries/${industry?.id}?tab=overview`}
        >
            <a className="flex items-center gap-x-2">
                <InitialAvatar
                    name={industry?.user?.name}
                    imageUrl={industry?.user?.avatar}
                />
                <div>
                    <div className="flex items-center gap-x-1">
                        <p className="font-semibold">{industry?.user?.name}</p>
                        {isFavorite && isFavorite(industry?.subAdmin) && (
                            <AiFillStar className="text-primary" />
                        )}
                    </div>
                    <div className="font-medium text-xs text-gray-500">
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdEmail />
                            </span>
                            {industry?.user?.email}
                        </p>
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdPhoneIphone />
                            </span>
                            {industry?.phoneNumber}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    )
}
