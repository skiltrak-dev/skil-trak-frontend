import { Typography } from '@components'
import { User } from '@types'
import React from 'react'
import { FaEnvelope } from 'react-icons/fa'

export const RequestedByCellInfo = ({ requestedBy }: { requestedBy: User }) => {
    return (
        <div>
            <Typography variant="label">{requestedBy?.name}</Typography>
            <div className="flex items-center gap-x-1">
                <span className="text-gray-400">
                    <FaEnvelope />
                </span>
                <Typography variant="small" color="text-gray-500">
                    {requestedBy?.email}
                </Typography>
            </div>
        </div>
    )
}
