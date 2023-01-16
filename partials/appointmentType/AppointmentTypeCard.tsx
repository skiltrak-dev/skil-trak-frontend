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

export const AppointmentTypeCard = ({
    title,
    imageUrl,
    selectedImageUrl,
    onClick,
    selected,
}: AppointmentTypeCardProps) => {
    const AppointmentType = () => {
        switch (title) {
            case 'video Conference':
                return {
                    imageUrl: '/images/card-images/video-icon.png',
                    selectedImageUrl: '/images/card-images/video-image.png',
                    post: 'Video Conference',
                }

            default:
                return {
                    imageUrl: '/images/card-images/box-icon.png',
                    selectedImageUrl: '/images/card-images/box-image.png',
                    post: 'Work Place Visit',
                }
        }
    }
    const typeData = AppointmentType()
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
                    {/* <Image
                        src={
                            selected === title
                                ? typeData.selectedImageUrl
                                : typeData.imageUrl
                        }
                        width={100}
                        height={100}
                        alt="appointment type"
                    /> */}
                    <div className="whitespace-pre">
                        <Typography variant="body" color="text-black">
                            {title}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}
