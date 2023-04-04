import { Typography } from '@components/Typography'
import moment from 'moment'
import React from 'react'

export const UserCreatedAt = ({
    createdAt,
    label,
}: {
    createdAt: Date
    label?: boolean
}) => {
    return (
        <div>
            {label && (
                <Typography variant={'label'} color={'text-gray-800'}>
                    Created At
                </Typography>
            )}
            <Typography variant={'small'} color={'text-gray-600'}>
                <span className="font-semibold whitespace-pre">
                    {moment(createdAt).format('Do MMM YYYY')}
                </span>
            </Typography>
            <Typography variant={'small'} color={'text-gray-600'}>
                <span className="font-semibold whitespace-pre">
                    {moment(createdAt).format('hh:mm:ss a')}
                </span>
            </Typography>
        </div>
    )
}
