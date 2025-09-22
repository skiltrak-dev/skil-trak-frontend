import { Typography } from '@components/Typography'
import Image from 'next/image'
import React from 'react'

export const SubTitleWhoWeServe = () => {
    return (
        <div className="">
            <Typography variant="h2" color="text-[#24556D]">
                Key Features of SkilTrak
            </Typography>
            <Image
                src={'/images/site/home-page-v3/who-we-serve/title-line.svg'}
                alt={`title line`}
                height={700}
                width={400}
                className=""
            />
            <div className="flex items-center gap-x-2 ml-16">
                <span className="bg-[#9B2000] w-12 h-[2px]"></span>
                <Typography variant="label" semibold color="text-[#9B2000]">
                    The Benefits
                </Typography>
                <span className="bg-[#9B2000] w-14 h-[2px]"></span>
            </div>
        </div>
    )
}
