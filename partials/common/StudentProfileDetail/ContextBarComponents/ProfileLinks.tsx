import { Typography } from '@components'
import React from 'react'
import { IoMdEyeOff } from 'react-icons/io'
import { RiEditFill } from 'react-icons/ri'

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

export const ProfileLinks = () => {
    return (
        <div className="flex flex-col items-end gap-y-2.5">
            {profileLinks.map(({ text, link, Icon }: any, index: number) => (
                <div className="flex items-center gap-x-2" key={index}>
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
            ))}
        </div>
    )
}
