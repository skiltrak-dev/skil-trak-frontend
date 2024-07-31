import { Typography } from '@components/Typography'
import moment from 'moment'
import React from 'react'

export const UpdatedUserCreatedAt = ({
    createdAt,
    label,
}: {
    createdAt: Date | undefined
    label?: boolean
}) => {
    return (
        <div>
            {label && (
                <Typography variant={'small'} color={'text-gray-800'}>
                    <span className="font-semibold">Created At</span>
                </Typography>
            )}
            <div className="flex items-center gap-x-4">
                <Typography variant={'small'} color={'text-gray-500'}>
                    <span className="whitespace-pre">
                        {moment(createdAt).format('Do MMM YYYY')}
                    </span>
                </Typography>
                <div className="bg-gray-300 h-4 w-[1px]"></div>
                <Typography variant={'small'} color={'text-gray-500'}>
                    <span className="whitespace-pre">
                        {moment(createdAt).format('hh:mm:ss a')}
                    </span>
                </Typography>
            </div>
        </div>
    )
}
