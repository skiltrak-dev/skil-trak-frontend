import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

export interface TalentPoolType {
    image: string
    title: string
    description: string
}

export const TalentPoolCard = ({ detail }: { detail: TalentPoolType }) => {
    return (
        <div
            data-aos="fade-up"
            className="shadow-site px-7 rounded-[10px] bg-white flex flex-col justify-center gap-y-5 h-24"
        >
            <div className="grid grid-cols-7">
                <div className="col-span-3 flex items-center gap-x-6">
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
                <div className="col-span-4">
                    <Typography variant="small" normal>
                        {detail.description}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
