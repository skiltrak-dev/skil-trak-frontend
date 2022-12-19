import React from 'react'

import { Typography } from '@components'

export const RtoDetail = ({ rto }: any) => {
    return (
        <div className="flex items-center relative">
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
                        <Typography variant={'muted'} color={'text-gray-400'}>
                            info@jti.edu.au
                        </Typography>
                        <span className="text-gray-400">|</span>
                        <Typography variant={'muted'} color={'text-gray-400'}>
                            {rto?.phone}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}
