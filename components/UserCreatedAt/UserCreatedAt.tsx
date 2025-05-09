import { Typography } from '@components/Typography'
import moment from 'moment'
import React from 'react'

export const UserCreatedAt = ({
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
            <Typography variant={'xxs'} color={'text-gray-700'} medium>
                <span className="whitespace-pre">
                    {moment(createdAt).format('Do MMM YYYY')}
                </span>
            </Typography>
            {/* <Typography variant={'small'} color={'text-gray-500'}>
                <span className="whitespace-pre">
                    {moment(createdAt).format('hh:mm:ss a')}
                </span>
            </Typography> */}
        </div>
    )
}
