import { Card } from '@components/cards'
import { InitialAvatar, Typography } from '@components'
import React from 'react'

export const FutureCandidateCard = ({ data }: any) => {
    return (
        <Card>
            <div className="flex flex-col gap-y-3 md:flex-row md:justify-between md:items-center">
                <div className="flex items-center gap-x-2">
                    {data?.user && (
                        <InitialAvatar
                            name={data?.user?.name}
                            imageUrl={data?.user?.avatar}
                        />
                    )}
                    <div>
                        <Typography variant={'label'}>
                            <span className="font-semibold">
                                {data?.user?.name}
                            </span>
                        </Typography>
                        <Typography variant={'small'} color={'text-gray-500'}>
                            {data?.user?.email}
                        </Typography>
                    </div>
                </div>

                {/* phone */}
                <div>
                    <Typography variant={'xs'} color={'text-base-light'}>
                        <span className="font-semibold">Phone #</span>
                    </Typography>
                    <Typography variant={'label'}>{data?.phone}</Typography>
                </div>

                {/* Address */}
                <div>
                    <Typography variant={'xs'} color={'text-base-light'}>
                        <span className="font-semibold">Address</span>
                    </Typography>
                    <Typography variant={'label'}>
                        {data?.addressLine1}, {data?.addressLine2}
                    </Typography>
                </div>

                {/* RTO */}
                <div>
                    <Typography variant={'xs'} color={'text-base-light'}>
                        <span className="font-semibold">RTO</span>
                    </Typography>
                    <div className="flex items-center gap-x-2">
                        {data?.rto?.user?.name && (
                            <InitialAvatar
                                name={data?.rto?.user?.name}
                                imageUrl={data?.rto?.user?.avatar}
                            />
                        )}
                        <div>
                            <Typography color={'black'} variant={'small'}>
                                {data?.rto?.user?.name}
                            </Typography>
                            <div className="flex items-center gap-x-2">
                                <Typography
                                    variant={'muted'}
                                    color={'text-gray-400'}
                                >
                                    {data?.rto?.user?.email}
                                </Typography>
                                <span className="text-gray-400">|</span>
                                <Typography
                                    variant={'muted'}
                                    color={'text-gray-400'}
                                >
                                    {data?.rto?.phone}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
