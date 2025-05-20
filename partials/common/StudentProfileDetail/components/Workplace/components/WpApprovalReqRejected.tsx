import { Typography } from '@components'
import React from 'react'
import { FaInfoCircle } from 'react-icons/fa'

export const WpApprovalReqRejected = ({
    onClick,
    userName,
}: {
    userName?: string
    onClick: () => void
}) => {
    return (
        <div className="w-48 flex items-center gap-x-2">
            <Typography variant="xs" color={'text-error-dark'}>
                Workplace Approval Request was cancelled by{' '}
                {userName ? userName : 'student'}
            </Typography>
            <div>
                <FaInfoCircle
                    onClick={() => {
                        onClick()
                    }}
                    className="text-error-dark cursor-pointer"
                />
            </div>
        </div>
    )
}
