import { InitialAvatar } from '@components/InitialAvatar'
import { Typography } from '@components/Typography'
import Link from 'next/link'
import React from 'react'
import {
    FaEnvelope,
    FaLocationArrow,
    FaMapMarkerAlt,
    FaPhone,
} from 'react-icons/fa'

export const UserCellInfo = ({ user }: any) => {
    const profile = user ? user[user?.role] : {}
    return (
        <div className="flex items-center relative">
            <div className="flex items-center gap-x-2">
                <div>
                    {user?.name && (
                        <InitialAvatar
                            name={user?.name}
                            imageUrl={user?.avatar}
                        />
                    )}
                </div>

                <div>
                    <div className="flex items-center gap-x-2">
                        <Typography variant={'muted'} color={'text-gray-700'}>
                            {profile?.studentId}
                        </Typography>
                    </div>
                    <Typography variant={'subtitle'} color={'text-gray-800'}>
                        {user?.name} ({user?.role}){' '}
                    </Typography>
                    <div className="flex items-center gap-x-2 text-sm">
                        <FaEnvelope className="text-gray-400" />
                        <Typography variant={'label'} color={'text-gray-500'}>
                            {user?.email}
                        </Typography>
                    </div>
                    <div className="flex items-center gap-x-2 text-sm">
                        <FaPhone className="text-gray-400" />
                        <Typography variant={'label'} color={'text-gray-500'}>
                            {profile?.phone || profile?.phoneNumber}
                        </Typography>
                    </div>
                    <div className="flex items-center gap-x-2 text-sm">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <Typography variant={'label'} color={'text-gray-500'}>
                            {profile?.addressLine1}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}
