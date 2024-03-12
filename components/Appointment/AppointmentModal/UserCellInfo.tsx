import { InitialAvatar } from '@components/InitialAvatar'
import { Typography } from '@components/Typography'
import { UserRoles } from '@constants'
import { Student, User } from '@types'
import Link from 'next/link'
import React from 'react'
import {
    FaEnvelope,
    FaLocationArrow,
    FaMapMarkerAlt,
    FaPhone,
} from 'react-icons/fa'

export const UserCellInfo = ({ user }: { user: User }) => {
    const profile: any = user
        ? user[
              user?.role === 'subadmin'
                  ? ('coordinator' as keyof typeof user)
                  : (user?.role as keyof typeof user)
          ]
        : {}

    const userProfile = user
        ? user?.role === UserRoles.SUBADMIN
            ? profile && profile?.length > 0
                ? profile[0]
                : profile
            : profile
        : {}

    console.log({ userProfile, profile })
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
                    {user?.role === UserRoles.INDUSTRY ? (
                        <div className="mt-3">
                            <Typography variant={'xs'}>
                                Contact Person
                            </Typography>
                            <div className="flex items-center gap-x-2 text-sm">
                                <Typography variant={'small'}>
                                    <span className="font-bold">
                                        {userProfile?.contactPerson || 'N/A'}
                                    </span>
                                </Typography>
                            </div>
                            <div className="flex items-center gap-x-2 text-sm">
                                <FaPhone className="text-gray-400 text-xs" />
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-500'}
                                >
                                    {userProfile?.contactPersonNumber}
                                </Typography>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
