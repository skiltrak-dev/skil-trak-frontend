import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

export const PodCastSection = () => {
    return (
        <div
            className="bg-no-repeat bg-cover flex flex-col gap-10 md:flex-row items-center justify-center mx-auto max-w-7xl px-4 md:px-0 py-16"
            style={{
                backgroundImage: 'url(/images/site/about-us/podcast-bg.png)',
            }}
        >
            <div
                className={`flex items-center justify-center flex-col md:w-1/3`}
            >
                <Typography variant="h2" color="text-[#24556D]" uppercase>
                    PodCast
                </Typography>
                <Image
                    src={
                        '/images/site/home-page-v3/who-we-serve/title-line.svg'
                    }
                    alt={`title line`}
                    height={18}
                    width={280}
                    className=""
                />
            </div>
            <div className="md:w-2/3">
                <iframe
                    // width="560"
                    // height="315"
                    className="w-full h-[415px]"
                    src="https://www.youtube.com/embed/lDYeF10RWSU?si=n2DFQ1SIaK5zJvUT"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    )
}
