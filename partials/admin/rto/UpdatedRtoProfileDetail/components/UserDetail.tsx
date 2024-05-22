import { Typography } from '@components'
import React from 'react'

export const UserDetail = ({
    profile,
    onClick,
}: {
    profile: any
    onClick?: () => void
}) => {
    return (
        <div
            className={`${onClick ? 'cursor-pointer' : ''}`}
            onClick={() => {
                if (onClick) {
                    onClick()
                }
            }}
        >
            <Typography variant="small" semibold>
                {profile?.user?.name}
            </Typography>
            <Typography variant="xs">{profile?.user?.email}</Typography>
            <Typography variant="xs">{profile?.phone}</Typography>
        </div>
    )
}
