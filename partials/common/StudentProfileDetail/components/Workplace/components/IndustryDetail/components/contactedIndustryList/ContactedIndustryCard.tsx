import { InitialAvatar } from '@components'
import { UserRoles } from '@constants'
import { ellipsisText, getUserCredentials } from '@utils'
import moment from 'moment'
import Link from 'next/link'
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { MdBusiness, MdContactPage } from 'react-icons/md'
import { Actions } from './Actions'

export const ContactedIndustryCard = ({
    industry,
    isListing = false,
    isBranch = false,
}: {
    industry: any
    isListing?: boolean
    isBranch?: boolean
}) => {
    console.log('industry', industry)

    // ✅ handle branch 
    const data = isBranch
        ? industry?.branch?.industry
        : isListing
        ? industry?.listing
        : industry?.industry

    const name = isListing ? data?.businessName : data?.user?.name

    const address = isListing ? data?.address : data?.addressLine1

    const avatar = isListing ? null : data?.user?.avatar

    // ✅ branch callLogs
    const callLogNote = isBranch
        ? industry?.branch?.callLogs?.[0]?.note
        : data?.callLog?.length > 0
        ? data?.callLog[0]?.note
        : null

    const role = getUserCredentials()?.role
    const linkHref =
        role === UserRoles.ADMIN
            ? `/portals/admin/industry/${data?.id}?tab=sectors`
            : role === UserRoles.SUBADMIN
            ? isListing
                ? `/portals/sub-admin/tasks/industry-listing/${data?.id}`
                : `/portals/sub-admin/users/industries/${data?.id}?tab=overview`
            : '#'

    return (
        <div className=" bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <Link
                    href={linkHref}
                    className="flex items-center gap-3 flex-1 min-w-0"
                >
                    <div className="">
                        {name && (
                            <InitialAvatar name={name} imageUrl={avatar} />
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h4
                                className="font-semibold text-gray-900 truncate text-sm hover:text-blue-600 transition-colors"
                                title={name}
                            >
                                {ellipsisText(name, 20)}
                            </h4>
                            {isListing && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    <MdBusiness className="w-3 h-3 mr-1" />
                                    Listed
                                </span>
                            )}
                            {isBranch && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Branch
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div
                                className="flex items-center gap-1"
                                title={address}
                            >
                                <FaMapMarkerAlt className="w-3 h-3" />
                                <span className="truncate max-w-32">
                                    {address}
                                </span>
                            </div>
                            <div
                                className="flex items-center gap-1"
                                title={moment(industry?.createdAt)?.format(
                                    'ddd, DD.MMM.YYYY [at] hh:mm a'
                                )}
                            >
                                <FaCalendarAlt className="w-3 h-3" />
                                <span>
                                    {moment(industry?.createdAt)?.format(
                                        'DD/MM/YY'
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="flex-shrink-0">
                    <Actions industry={industry} />
                </div>
            </div>

            {/* Notes Section */}
            {callLogNote && (
                <div className="mt-3 pt-3 border-t border-gray-100 ">
                    <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <MdContactPage className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-medium text-blue-800">
                                Call Notes
                            </span>
                        </div>
                        <p className="text-sm text-gray-700 line-clamp-3 min-h-20 h-auto max-h-36 remove-scrollbar overflow-auto">
                            {callLogNote}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
