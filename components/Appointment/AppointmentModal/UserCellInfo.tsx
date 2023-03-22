import { InitialAvatar } from '@components/InitialAvatar'
import { Typography } from '@components/Typography'
import { UserRoles } from '@constants'
import Link from 'next/link'
import React from 'react'
import {
    FaEnvelope,
    FaLocationArrow,
    FaMapMarkerAlt,
    FaPhone,
} from 'react-icons/fa'

export const UserCellInfo = ({ user }: any) => {
    const profile = user
        ? user[user['role'] === 'subadmin' ? 'coordinator' : user?.role]
        : {}

    const userProfile = user
        ? user?.role === UserRoles.SUBADMIN
            ? profile[0]
            : profile
        : {}

    console.log(
        'userProfileuserProfile',
        userProfile?.studentId,
        profile?.studentId
    )

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
                            {userProfile?.phone || userProfile?.phoneNumber}
                        </Typography>
                    </div>
                    <div className="flex items-center gap-x-2 text-sm">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <Typography variant={'label'} color={'text-gray-500'}>
                            {userProfile?.addressLine1}, {userProfile?.suburb},{' '}
                            {userProfile?.state}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}
