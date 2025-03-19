import { Typography } from '@components/Typography'
import moment from 'moment'
import React from 'react'

export const CreatedAtDate = ({
    createdAt,
}: {
    createdAt: string | Date | undefined
}) => {
    return (
        <>
            <Typography variant={'small'} color={'text-gray-600'} normal>
                <span className="whitespace-pre">
                    {moment(createdAt).format('Do MMM YYYY')}
                </span>
            </Typography>
            <Typography variant={'small'} color={'text-gray-600'} normal>
                <span className="whitespace-pre">
                    {moment(createdAt).format('hh:mm:ss a')}
                </span>
            </Typography>
        </>
    )
}
