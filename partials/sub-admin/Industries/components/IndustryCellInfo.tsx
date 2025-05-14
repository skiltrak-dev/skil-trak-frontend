import { InitialAvatar, Tooltip } from '@components'
import { SubAdminApi } from '@queries'
import { Industry, SubAdmin } from '@types'
import { ellipsisText, maskText, setLink } from '@utils'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiFillStar } from 'react-icons/ai'
import { FaHandshake, FaHireAHelper } from 'react-icons/fa'
import { ImPhone, ImPhoneHangUp } from 'react-icons/im'
import { MdPhoneIphone, MdSnooze } from 'react-icons/md'
import { HiBriefcase } from 'react-icons/hi2'
import { CopyData } from '@partials/common/FindWorkplaces/components'

export const IndustryCellInfo = ({
    industry,
    isFavorite,
    call,
    onlyName = true,
}: {
    industry: any
    isFavorite?: SubAdmin
    call?: boolean
    onlyName?: boolean
}) => {
    const router = useRouter()

    const profile = SubAdminApi.SubAdmin.useProfile()

    const callLog = industry?.callLog?.reduce(
        (a: any, b: any) => (a?.createdAt > b?.createdAt ? a : b),
        {
            isExpired: true,
            createdAt: null,
        }
    )

    const today = moment()
    const startDate = today.startOf('week').format('MM-DD-YYYY')
    const endDate = today.endOf('week').format('MM-DD-YYYY')
    const createdAt = moment(callLog?.createdAt, 'YYYY-MM-DD')

    const isDateExist = createdAt.isBetween(startDate, endDate, 'day')

    return (
        <Link
            legacyBehavior
            href={
                profile?.data?.isAssociatedWithRto &&
                profile?.isSuccess &&
                profile?.data
                    ? '#'
                    : `/portals/sub-admin/users/industries/${industry?.id}?tab=students`
            }
        >
            <a
                className="flex items-center gap-x-2 relative z-10"
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
                    {industry?.snoozedDate &&
                        industry?.snoozedDate !== null && (
                            <MdSnooze size={14} className="text-red-500" />
                        )}
                    <div className="flex items-center gap-x-1">
                        <div className="flex items-center gap-x-2">
                            <div className="flex items-center gap-x-1">
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
                                {industry?.isHiring && (
                                    <div className="" title="Hiring">
                                        <HiBriefcase
                                            size={20}
                                            className="text-blue-500"
                                        />
                                    </div>
                                )}
                            </div>

                            {call &&
                                isDateExist &&
                                (callLog.isAnswered ? (
                                    <div className="rounded-full bg-success p-0.5">
                                        <ImPhone
                                            title={'Call Made and Answered'}
                                            className="text-white text-[10px]"
                                        />
                                    </div>
                                ) : callLog.isAnswered === false ? (
                                    <div className="rounded-full bg-red-700 p-0.5">
                                        <ImPhoneHangUp
                                            title={'Call Made and Not Answered'}
                                            className="text-white text-[10px]"
                                        />
                                    </div>
                                ) : null)}
                        </div>
                        {industry?.subAdmin &&
                            industry?.subAdmin?.length > 0 && (
                                <AiFillStar className="text-primary" />
                            )}
                        {isFavorite && (
                            <AiFillStar size={18} className="text-primary" />
                        )}
                    </div>
                    {/* {onlyName && (
                        <div className="font-medium text-xs text-gray-500">
                            <p className="flex items-center gap-x-1">
                                <span>
                                    <MdPhoneIphone />
                                </span>
                                {maskText(industry?.phoneNumber)}
                            </p>
                        </div>
                    )} */}
                </div>
            </a>
        </Link>
    )
}
