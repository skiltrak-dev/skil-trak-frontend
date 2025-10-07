import React from 'react'
import { AboutSectionTitle } from './AboutSectionTitle'
import Image from 'next/image'
import { Typography } from '@components'

export const OurMissionAndVision = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 md:px-0 md:my-20 my-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full">
                <div className="md:w-1/2">
                    <Image
                        src={'/images/site/about-us/our-mission.png'}
                        alt={`title line`}
                        height={18}
                        width={280}
                        className="w-full"
                    />
                </div>
                <div className="md:w-1/2 space-y-6">
                    <AboutSectionTitle
                        title="Our Mission"
                        space={'justify-end items-end'}
                    />
                    <Typography color="text-gray-500" variant="body">
                        To empower students and support educators by
                        streamlining the placement process through reliable
                        technology, professional guidance, and trusted industry
                        partnerships.
                    </Typography>
                </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-6 md:gap-8 w-full">
                <div className="md:w-1/2 space-y-6">
                    <AboutSectionTitle
                        title="Our Mission"
                        space={'justify-start items-start'}
                    />
                    <Typography color="text-gray-500" variant="body">
                        To empower students and support educators by
                        streamlining the placement process through reliable
                        technology, professional guidance, and trusted industry
                        partnerships.
                    </Typography>
                </div>
                <div className="md:w-1/2">
                    <Image
                        src={'/images/site/about-us/our-vision.png'}
                        alt={`title line`}
                        height={18}
                        width={280}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    )
}
