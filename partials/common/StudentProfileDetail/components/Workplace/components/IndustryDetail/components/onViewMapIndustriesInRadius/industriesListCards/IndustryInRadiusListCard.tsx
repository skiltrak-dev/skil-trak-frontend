import React from 'react'
import { DistanceIndicator } from './DistanceIndicator'
import { FaHandshakeSimple, FaHandshakeSimpleSlash } from 'react-icons/fa6'
import { MapPin } from 'lucide-react'
import { ellipsisText } from '@utils'
import { Actions } from '../contactHistoryTab/Actions'

type IndustryInRadiusListCardProps = {
    item: any
    onSelect: any
    branch?: boolean
}

export const IndustryInRadiusListCard = ({
    item,
    onSelect,
    branch = false,
}: IndustryInRadiusListCardProps) => {
    return (
        <div className=" flex items-center justify-between bg-white border rounded-2xl shadow-sm p-4 w-full">
            {/* Left Section: Avatar + Info */}
            <div
                onClick={() => {
                    if (!branch) {
                        onSelect(item)
                    } else {
                        onSelect({ ...item, type: 'branch' })
                    }
                }}
                className="flex gap-3 cursor-pointer"
            >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {item.user?.avatar ? (
                        <img
                            src={item.user.avatar}
                            alt={item.user.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <span className="text-sm font-bold text-gray-600">
                            {item?.user?.name?.[0] ?? 'N'}
                        </span>
                    )}
                </div>

                {/* Info */}
                <div>
                    <h3
                        className="font-semibold cursor-pointer text-sm text-gray-800 inline-flex items-center gap-2"
                        title={item?.user?.name}
                    >
                        {branch
                            ? `${ellipsisText(item?.user?.name, 15)} (branch)`
                            : ellipsisText(item?.user?.name, 15)}
                        {item?.isPartner ? (
                            <div className="flex items-center gap-x-2">
                                <FaHandshakeSimple className="text-orange-500" />
                                <span className="text-xs text-orange-500 font-bold">
                                    Partner
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-x-2">
                                <FaHandshakeSimpleSlash className="text-green-700" />
                                <span className="text-xs text-green-700 font-bold">
                                    Non Partner
                                </span>
                            </div>
                        )}
                    </h3>

                    <div className="text-sm text-gray-500">
                        <span
                            title={item?.addressLine1}
                            className="flex items-center gap-1 text-sm cursor-pointer"
                        >
                            <MapPin className="text-red-500" size={14} />{' '}
                            {ellipsisText(item?.addressLine1, 20)}
                        </span>
                        <DistanceIndicator
                            distance={item?.distance ?? 0}
                            mode="car"
                        />
                    </div>
                </div>
            </div>

            {/* Right Section: Contacted Status */}
            <div className="flex flex-col gap-y-2 justify-center items-end">
                <Actions
                    alreadyContacted={item?.alreadyContacted}
                    int={item?.interested}
                    contactId={item?.contactId}
                />
                <div className="flex items-center gap-x-2">
                    {item?.alreadyContacted ? (
                        <span className="text-[9px] font-medium bg-green-100 text-green-500 px-3 py-1 rounded-lg">
                            Contacted
                        </span>
                    ) : (
                        <span className="text-[9px] font-medium bg-red-100 text-red-500 px-3 py-1 rounded-lg">
                            Not Contacted
                        </span>
                    )}
                    {item?.user?.emails?.length ? (
                        <span className="text-[9px] font-medium bg-indigo-100 text-indigo-500 px-3 py-1 rounded-lg">
                            Email Sent
                        </span>
                    ) : (
                        <span className="text-[9px] font-medium bg-rose-100 text-rose-700 px-3 py-1 rounded-lg">
                            No Email Sent
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
