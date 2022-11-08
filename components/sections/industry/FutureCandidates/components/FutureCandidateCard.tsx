import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import React from 'react'

export const FutureCandidateCard = () => {
    return (
        <Card>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                    <img
                        className="w-7 h-7 rounded-full"
                        src="https://picsum.photos/100/100"
                        alt=""
                    />
                    <div>
                        <Typography variant={'label'}>
                            <span className="font-semibold">
                                Raminder Kaur Sharma
                            </span>
                        </Typography>
                        <Typography variant={'small'} color={'text-gray-500'}>
                            k_thabal@yahoo.co.in
                        </Typography>
                    </div>
                </div>

                {/* phone */}
                <div>
                    <Typography variant={'xs'} color={'text-base-light'}>
                        <span className="font-semibold">Phone #</span>
                    </Typography>
                    <Typography variant={'label'}>0401748554</Typography>
                </div>

                {/* Address */}
                <div>
                    <Typography variant={'xs'} color={'text-base-light'}>
                        <span className="font-semibold">Address</span>
                    </Typography>
                    <Typography variant={'label'}>Wallan, Vic 3756</Typography>
                </div>

                {/* RTO */}
                <div className="flex items-center gap-x-2">
                    <img
                        className="rounded-full w-8 h-8"
                        src={'https://picsum.photos/100/100'}
                        alt={''}
                    />
                    <div>
                        <Typography color={'black'} variant={'small'}>
                            Job Tranining Institute{' '}
                        </Typography>
                        <div className="flex items-center gap-x-2">
                            <Typography
                                variant={'muted'}
                                color={'text-gray-400'}
                            >
                                info@jti.edu.au
                            </Typography>
                            <span className="text-gray-400">|</span>
                            <Typography
                                variant={'muted'}
                                color={'text-gray-400'}
                            >
                                041 610 9825
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
