import { HideRestrictedData, InitialAvatar } from '@components'
import { UserRoles } from '@constants'
import { Industry } from '@types'
import { QueryType, queryToUrl } from '@utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaHandshake, FaHireAHelper } from 'react-icons/fa'
import { HiOutlineSpeakerphone } from 'react-icons/hi'
import { MdEmail, MdPhoneIphone, MdSnooze } from 'react-icons/md'

export const IndustryCell = ({ industry }: { industry: Industry }) => {
    const router = useRouter()
    const query = queryToUrl(router.query as QueryType)

    return (
        <Link legacyBehavior href={`/portals/admin/industry/${industry?.id}`}>
            <a
                onClick={() => {
                    sessionStorage.setItem(
                        'industry',
                        `${router.pathname}?${query}`
                    )
                }}
            >
                <div className="flex items-center gap-x-2">
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
                        {industry?.snoozedDate &&
                        industry?.snoozedDate !== null ? (
                            <MdSnooze size={14} className="text-red-500" />
                        ) : null}
                        <div className="flex items-center gap-x-2">
                            <p className="font-semibold">
                                {industry?.user?.name}
                            </p>
                            {industry?.isHiring ? (
                                <div>
                                    <HiOutlineSpeakerphone className="text-lg" />
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                        {/* snoozedDate */}
                        <div className="font-medium text-xs text-gray-500">
                            <HideRestrictedData type={UserRoles.INDUSTRY}>
                                <p className="flex items-center gap-x-1">
                                    <span>
                                        <MdEmail />
                                    </span>
                                    {industry?.user?.email}
                                </p>
                            </HideRestrictedData>

                            <HideRestrictedData type={UserRoles.INDUSTRY}>
                                <p className="flex items-center gap-x-1">
                                    <span>
                                        <MdPhoneIphone />
                                    </span>
                                    {industry?.phoneNumber}
                                </p>
                            </HideRestrictedData>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}
