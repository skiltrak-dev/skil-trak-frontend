import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

// types
type TalentPoolInfoCardProps = {
    title: string
    description: string
    icon: string
}

export const TalentPoolInfoCard = ({
    title,
    description,
    icon,
}: TalentPoolInfoCardProps) => {
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div className="relative bg-[#8CB1C3] rounded-xl rounded-br-3xl size-14">
                <div className="absolute top-0 -left-4">
                    <Image
                        src={`/images/site/talent-pool/${icon}`}
                        alt={title}
                        height={50}
                        width={50}
                    />
                </div>
            </div>
            <div className="text-center space-y-8">
                <Typography variant="h4" color="text-primaryNew">
                    {title ?? 'Title here'}
                </Typography>
                <Typography variant="small" color="text-gray-500">
                    {description ?? 'Title here'}
                </Typography>
            </div>
        </div>
    )
}
