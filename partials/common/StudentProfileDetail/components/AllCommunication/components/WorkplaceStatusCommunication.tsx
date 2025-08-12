import { Typography } from '@components'
import moment from 'moment'
import React from 'react'

export const WorkplaceStatusCommunication = ({ item }: { item: any }) => {
    return (
        <div
            id={`pinned-notes-${item?.id}`}
            className={`relative w-full bg-[#FEF6E6] p-4 rounded-xl shadow-lg `}
        >
            <div className={``}>
                <div className="flex justify-between items-start">
                    <div>
                        <Typography variant="label" semibold>
                            {item?.title ?? item?.subject}{' '}
                            <span className="text-xs text-gray-400">
                                {item?.isInternal ? '(Internal)' : ''}
                            </span>
                        </Typography>
                    </div>
                </div>
                <div>
                    <div className={`text-sm mt-1 mb-2`}>
                        <span
                            className="block remove-text-bg customTailwingStyles-inline-style customTailwingStyles"
                            dangerouslySetInnerHTML={{
                                __html: item?.description ?? item?.message,
                            }}
                        ></span>
                    </div>

                    <div className="flex justify-between">
                        <div className="mr-6">
                            <p
                                className={`text-xs font-medium text-gray-500 capitalize`}
                            >
                                {item?.user?.name ?? item?.assignedTo?.name}{' '}
                                <span className="text-[11px] font-medium capitalize">
                                    (
                                    {item?.user?.role ?? item?.assignedTo?.role}
                                    )
                                </span>
                            </p>
                            <p
                                className={`text-[11px] font-medium text-[#BFBF80] `}
                            >
                                {moment(item?.isEnabled!! || item.createdAt!!)
                                    .tz('Australia/Melbourne')
                                    .format('ddd DD, MMM, yyyy [at] hh:mm A')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
