import React from 'react'
import { MdNoAccounts } from 'react-icons/md'
import { MapPin } from 'lucide-react'
import { ellipsisText } from '@utils'
import { DistanceIndicator } from './DistanceIndicator'
import { Actions } from '../contactHistoryTab/Actions'

export const FutureIndustryInRadiusListCard = ({ item, onSelect }: any) => {
    return (
        <div
            key={`future-${item?.id}`}
            className="flex items-center justify-between w-full "
        >
            {/* Left Section */}
            <div
                onClick={() =>
                    onSelect?.({
                        ...item,
                        type: 'futureIndustry',
                    })
                }
                className="flex gap-3 cursor-pointer"
            >
                {/* Placeholder Avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-600">
                        {item?.businessName?.[0] ?? 'N'}
                    </span>
                </div>

                {/* Info */}
                <div>
                    <div className="flex items-center gap-x-2">
                        <h3
                            className="cursor-pointer font-semibold text-sm text-gray-800"
                            title={item?.businessName}
                        >
                            {ellipsisText(item?.businessName, 15)}
                        </h3>

                        {!item?.signedUp && (
                            <div className="flex items-center gap-x-2 whitespace-nowrap">
                                <MdNoAccounts className="text-blue-700" />
                                <span className="text-xs text-blue-700 font-bold">
                                    Not Signed Up
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="text-sm text-gray-500 flex flex-col">
                        <span
                            title={item?.addressLine1}
                            className="flex items-center gap-1 text-sm cursor-pointer"
                        >
                            <MapPin className="text-red-500" size={14} />{' '}
                            {ellipsisText(item?.address, 20)}
                        </span>

                        <DistanceIndicator
                            distance={item?.distance ?? 0}
                            mode="walking"
                        />
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col gap-y-2 justify-center items-end">
                <Actions
                    alreadyContacted={item?.alreadyContacted}
                    int={item?.intrested}
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
