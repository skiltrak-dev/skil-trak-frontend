import { Student } from '@types'
import React from 'react'
import { Avatar } from './Avatar'
import { StudentTimer, Typography } from '@components'
import { RiEditFill } from 'react-icons/ri'
import { IoMdEyeOff } from 'react-icons/io'
import { EmergencyContact, StudentDetail } from './StudentDetail'
import { StudentExpireTime } from './StudentExpireTime'
import { StudentStatus } from './StudentStatus'
import { ProfileLinks } from './ProfileLinks'

export const Profile = ({ profile }: { profile: Student }) => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <Avatar
                        avatar={profile?.user?.avatar}
                        name={profile?.user?.name}
                    />
                </div>
                <ProfileLinks />
            </div>

            {/* User */}
            <div className="mt-2">
                <Typography semibold>
                    <span className="text-[15px]"> {profile?.user?.name}</span>
                </Typography>
                <Typography variant="xs" color="text-[#6B7280]">
                    {profile?.user?.email}
                </Typography>
            </div>

            {/* Expiry Date */}
            <div className="flex items-center gap-x-5 mt-3">
                <StudentExpireTime
                    studentId={profile?.user?.id}
                    date={profile?.expiryDate}
                    oldExpiry={profile?.oldExpiry}
                />
            </div>

            {/* Student Detail */}
            <StudentDetail profile={profile} />
            <EmergencyContact profile={profile} />

            {/* Student Status */}
            <StudentStatus />
        </div>
    )
}
