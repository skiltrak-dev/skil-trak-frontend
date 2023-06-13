import { InitialAvatar } from '@components'
import { Industry, SubAdmin } from '@types'
import { setLink } from '@utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiFillStar } from 'react-icons/ai'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'
import { IndustrySubAdmin } from '../AllIndustries'
import { FaHandshake } from 'react-icons/fa'

export const IndustryCellInfo = ({
    industry,
    isFavorite,
}: {
    industry: IndustrySubAdmin
    isFavorite?: any
}) => {
    const router = useRouter()
    return (
        <Link
            legacyBehavior
            href={`/portals/sub-admin/users/industries/${industry?.id}?tab=overview`}
        >
            <a
                className="flex items-center gap-x-2"
                onClick={() => {
                    setLink('subadmin-industries', router)
                }}
            >
                <div className="shadow-inner-image rounded-full relative">
                    {industry?.user?.name && (
                        <InitialAvatar
                            name={industry?.user?.name}
                            imageUrl={industry?.user?.avatar}
                        />
                    )}
                    {industry?.isPartner ? (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center bg-green-500 rounded-full text-white">
                            <FaHandshake size={14} />
                        </div>
                    ) : null}
                </div>
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
