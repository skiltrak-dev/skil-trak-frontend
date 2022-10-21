import { Typography } from '@components/Typography'
import Image from 'next/image'
import React, { useState } from 'react'

type AppointmentTypeCardProps = {
    post?: string
    imageUrl?: string
    selectedImageUrl?: string
}

export const AppointmentTypeCard = ({
    post,
    imageUrl,
    selectedImageUrl,
}: AppointmentTypeCardProps) => {
    const [selected, setSelected] = useState(false)
    const handleClick = () => {
        setSelected((e) => !e)
    }

    return (
        <div onClick={handleClick}>
            <div
                className={`border ${
                    !selected ? 'border-gray-300' : 'border-[#3782F3]'
                } bg-white rounded-lg py-2 px-5`}
            >
                <div className="flex flex-col gap-y-1 items-center">
                    <Image
                        src={(!selected ? imageUrl : selectedImageUrl) || ' '}
                        width={100}
                        height={100}
                        alt="appointment type"
                    />
                    <div className="">
                        <Typography variant="body" color="text-black">
                            {post}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}
