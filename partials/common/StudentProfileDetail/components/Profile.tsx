import { Student } from '@types'
import React from 'react'
import { Avatar } from './Avatar'
import { StudentTimer, Typography } from '@components'
import { RiEditFill } from 'react-icons/ri'
import { IoMdEyeOff } from 'react-icons/io'
import { EmergencyContact, StudentDetail } from './StudentDetail'
import { StudentExpireTime } from './StudentExpireTime'
import { StudentStatus } from './StudentStatus'

const profileLinks = [
    {
        text: 'Edit Profile',
        link: '',
        Icon: RiEditFill,
    },
    {
        text: 'View Password',
        link: '',
        Icon: IoMdEyeOff,
    },
]

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
                <div className="flex flex-col items-end gap-y-2.5">
                    {profileLinks.map(
                        ({ text, link, Icon }: any, index: number) => (
                            <div
                                className="flex items-center gap-x-2"
                                key={index}
                            >
                                <Typography variant="xxs">{text}</Typography>
                                <div
                                    onClick={() => {
                                        // link
                                    }}
                                    className="w-5 h-5 rounded-full bg-primaryNew flex justify-center items-center"
                                >
                                    <Icon className="text-white" size={12} />
                                </div>
                            </div>
                        )
                    )}
                </div>
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
