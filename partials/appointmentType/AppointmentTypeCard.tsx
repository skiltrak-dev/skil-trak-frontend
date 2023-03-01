import Image from 'next/image'
import React, { useState, useEffect } from 'react'

import { Typography } from '@components/Typography'

type AppointmentTypeCardProps = {
    title?: string
    imageUrl?: string
    selectedImageUrl?: string
    onClick: Function
    selected: string | null
}

export const getAppointmentTypeIcon = (title: any) => {
    switch (title?.toLowerCase()) {
        case 'video conference':
            return '/images/icons/appointment-type/video.png'
        case 'phone consultation':
            return '/images/icons/appointment-type/phone.png'
        case 'student observation':
            return '/images/icons/appointment-type/observation.png'
        case 'workplace visit':
            return '/images/icons/appointment-type/workplace.png'
        default:
            return '/images/card-images/box-icon.png'
    }
}

export const AppointmentTypeCard = ({
    title,
    imageUrl,
    selectedImageUrl,
    onClick,
    selected,
}: AppointmentTypeCardProps) => {
    const imageIcon = getAppointmentTypeIcon(title)
    return (
        <div
            className="cursor-pointer"
            onClick={() => {
                onClick()
            }}
        >
            <div
                className={`border ${
                    selected === title
                        ? 'border-[#3782F3] bg-blue-100'
                        : 'border-gray-300 bg-white'
                } rounded-lg py-2 px-5`}
            >
                <div className="flex flex-col gap-y-1 items-center">
                    <Image
                        src={imageIcon}
                        width={60}
                        height={60}
                        alt="appointment type"
                    />
                    <div className="whitespace-pre mt-2">
                        <p className="text-sm font-medium">{title}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
