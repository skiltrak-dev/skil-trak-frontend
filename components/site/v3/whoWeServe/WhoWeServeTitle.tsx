import { Typography } from '@components/Typography'
import Image from 'next/image'
import React from 'react'

export const WhoWeServeTitle = () => {
    return (
        <div className='flex justify-center items-center flex-col'>
            <Typography variant="h2" color="text-[#24556D]">
                Who We Serve?
            </Typography>
            <Image
                src={'/images/site/home-page-v3/who-we-serve/title-line.svg'}
                alt={`title line`}
                height={550}
                width={280}
                className=""
            />
        </div>
    )
}
