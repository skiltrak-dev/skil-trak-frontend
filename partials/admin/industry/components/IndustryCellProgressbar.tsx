import {
    AuthorizedUserComponent,
    HideRestrictedData,
    InitialAvatar,
} from '@components'
import { UserRoles } from '@constants'
import { ProfileCompletionProgress } from '@partials/common'
import { CopyData } from '@partials/common/FindWorkplaces/components'
import { Industry } from '@types'
import { QueryType, ellipsisText, queryToUrl } from '@utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaHandshake, FaHireAHelper } from 'react-icons/fa'
import { HiOutlineSpeakerphone } from 'react-icons/hi'
import { HiBriefcase } from 'react-icons/hi2'
import { MdEmail, MdPhoneIphone, MdSnooze } from 'react-icons/md'

export const IndustryCellProgressbar = ({ industry }: any) => {
    const router = useRouter()
    const query = queryToUrl(router.query as QueryType)

    const {
        courseAdded,
        CapacityUpdated,
        ProfileUpdated,
        trading_hours_and_shifts,
        hasInsuranceDocuments,
        hasIndustryChecks,
    } = industry
    const completedCount = [
        courseAdded,
        CapacityUpdated,
        ProfileUpdated,
        trading_hours_and_shifts,
        hasInsuranceDocuments,
        hasIndustryChecks,
    ].filter(Boolean).length

    const profileFields = [
        { key: 'courseAdded', label: 'Courses' },
        { key: 'CapacityUpdated', label: 'Capacity' },
        { key: 'ProfileUpdated', label: 'Profile' },
        { key: 'trading_hours_and_shifts', label: 'Trading Hours & Shifts' },
        { key: 'hasInsuranceDocuments', label: 'Insurance Documents' },
        { key: 'hasIndustryChecks', label: 'Industry Checks' },
    ]

    // Find the missing items
    const incompleteItems = profileFields
        .filter((field) => !industry[field.key as keyof typeof industry])
        .map((field) => field.label)

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
                <div className="flex items-center gap-x-2 relative z-10">
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
                        <div className="flex gap-x-2">
                            <div className="flex flex-col gap-y-1">
                                <div className="group flex items-center gap-x-1">
                                    <p
                                        className="font-semibold"
                                        title={industry?.user?.name}
                                    >
                                        {ellipsisText(industry?.user?.name, 20)}
                                    </p>
                                    <CopyData
                                        text={industry?.user?.name}
                                        type={'Industry Name'}
                                    />
                                </div>
                                <div
                                    title={
                                        incompleteItems.length
                                            ? `Missing: ${incompleteItems.join(
                                                  ', '
                                              )}`
                                            : 'All set!'
                                    }
                                >
                                    <ProfileCompletionProgress
                                        completedItems={completedCount}
                                        totalItems={6}
                                    />
                                </div>
                            </div>

                            {industry?.isHiring ? (
                                <div>
                                    <HiBriefcase
                                        size={20}
                                        className="text-blue-500"
                                    />
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                        {/* snoozedDate */}
                    </div>
                </div>
            </a>
        </Link>
    )
}
