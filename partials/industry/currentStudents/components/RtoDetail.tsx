import { Typography } from '@components'
import React from 'react'

export const RtoDetail = ({ rto }: { rto: any }) => {
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
                        {rto?.user?.name}
                    </Typography>
                    <div className="flex items-center gap-x-2">
                        <Typography variant={'muted'} color={'text-gray-400'}>
                            {rto?.user?.email}
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
