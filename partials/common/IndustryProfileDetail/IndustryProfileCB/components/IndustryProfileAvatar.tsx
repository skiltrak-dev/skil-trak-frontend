import Image from 'next/image'
import React from 'react'
import { MdAdminPanelSettings } from 'react-icons/md'

export const IndustryProfileAvatar = ({ avatar }: { avatar: string }) => {
    return (
        <div className="mt-4">
            {avatar ? (
                <Image
                    src={avatar}
                    width={100}
                    height={100}
                    className="rounded-full shadow-inner-image"
                    alt=""
                />
            ) : (
                <div className="h-24 w-24 flex items-center justify-center bg-gray-100 rounded-full">
                    <span className="text-4xl text-gray-300">
                        <MdAdminPanelSettings />
                    </span>
                </div>
            )}
        </div>
    )
}
