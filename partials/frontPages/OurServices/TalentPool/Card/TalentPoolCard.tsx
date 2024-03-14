import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'
import { useMediaQuery } from 'react-responsive'

export interface TalentPoolType {
    image: string
    title: string
    description: string
}

export const TalentPoolCard = ({ detail }: { detail: TalentPoolType }) => {
    const isMobile = useMediaQuery({ maxWidth: 1024 })

    return (
        <div
            data-aos="fade-up"
            className="shadow-site py-6 lg:py-0 px-7 rounded-[10px] bg-white flex flex-col justify-between gap-y-2.5 lg:justify-center lg:gap-y-5 lg:h-24"
        >
            <div className="lg:grid grid-cols-1 lg:grid-cols-7 flex flex-col lg:flex-none justify-between lg:justify-center gap-y-2.5 lg:gap-y-0">
                <div className="lg:col-span-3 flex flex-col lg:flex-row gap-y-6 items-center gap-x-6">
                    <Image
                        src={`/images/site/services/talentPool/${detail.image}`}
                        alt={detail.title}
                        width={36}
                        height={36}
                    />
                    <Typography variant="title" normal>
                        {detail.title}
                    </Typography>
                </div>
                <div className="lg:col-span-4">
                    <Typography
                        variant="small"
                        normal
                        center={isMobile ? true : false}
                    >
                        {detail.description}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
