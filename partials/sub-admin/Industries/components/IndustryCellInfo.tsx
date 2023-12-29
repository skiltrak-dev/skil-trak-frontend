import { InitialAvatar } from '@components'
import { setLink } from '@utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiFillStar } from 'react-icons/ai'
import { FaHandshake } from 'react-icons/fa'
import { MdEmail, MdPhoneIphone, MdSnooze } from 'react-icons/md'
import { IndustrySubAdmin } from '../AllIndustries'
import moment from 'moment'
import { ImPhone, ImPhoneHangUp } from 'react-icons/im'

export const IndustryCellInfo = ({
    industry,
    isFavorite,
    call,
}: {
    industry: IndustrySubAdmin
    isFavorite?: any
    call?: boolean
}) => {
    const router = useRouter()

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
            href={`/portals/sub-admin/users/industries/${industry?.id}?tab=students`}
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
                        <div className="flex items-center gap-x-2">
                            <div className="flex items-center gap-x-2">
                                <p className="font-semibold">
                                    {industry?.user?.name}
                                </p>
                                {industry?.snoozedDate !== null && (
                                    <MdSnooze
                                        size={18}
                                        className="text-red-500"
                                    />
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
                        {/* {isFavorite && isFavorite(industry?.subAdmin) && (
                            <AiFillStar className="text-primary" />
                        )} */}
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
