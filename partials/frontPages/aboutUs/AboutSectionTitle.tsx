import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

export const AboutSectionTitle = ({ title, space }: any) => {
    return (
        <div className={`flex ${space} flex-col`}>
            <Typography variant="h2" color="text-[#24556D]" uppercase>
                {title ?? 'title here'}
            </Typography>
            <Image
                src={'/images/site/home-page-v3/who-we-serve/title-line.svg'}
                alt={`title line`}
                height={18}
                width={280}
                className=""
            />
        </div>
    )
}
