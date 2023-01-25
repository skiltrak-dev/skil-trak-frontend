import { InitialAvatar, Typography } from '@components'
import React from 'react'

export const RtoDetail = ({ rto }: { rto: any }) => {
    return (
        <div className="flex items-center relative">
            <div className="flex items-center gap-x-2">
                <InitialAvatar
                    name={rto?.user?.name}
                    imageUrl={rto?.user?.avatar}
                />
                <div>
                    <Typography color={'black'} variant={'small'}>
                        {rto?.user?.name}
                    </Typography>
                    <div className="flex flex-col gap-y-1">
                        <Typography variant={'muted'} color={'text-gray-400'}>
                            {rto?.user?.email}
                        </Typography>
                        <Typography variant={'muted'} color={'text-gray-400'}>
                            {rto?.phone}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}
