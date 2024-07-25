import { Typography } from '@components'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const OurStoryLetsCollaborateSection = () => {
    return (
        <div className="mx-auto max-w-7xl pt-20">
            <div className="bg-orange-400 h-[1px] w-full"></div>
            <div className="flex items-center justify-center py-7 flex-col gap-y-8 md:flex-row md:justify-between">
                <div className="md:text-left text-center">
                    <Typography variant="title">Let's Collaborate</Typography>
                    <Typography variant="small">
                        Join us now and unlock the full potential of your
                        career, educational, or business journey with SkilTrak
                    </Typography>
                </div>
                <div className="">
                    <Link
                        href="/auth/signup"
                        className=" text-white md:text-white md:text-base text-xs font-medium bg-orange-400 rounded-lg px-4 py-2 uppercase"
                    >
                        sign up to your desire portal
                    </Link>
                </div>
            </div>
            <div className="bg-orange-400 h-[0.5px] w-full"></div>
            <div className="mt-10 flex items-center justify-center flex-col md:flex-row gap-y-2 gap-x-1 mb-12">
                <Typography variant="small" color="text-blue-400">
                    Our Website is fully Secured with
                </Typography>
                <Image
                    src={'/images/our-story/digital-ocean.svg'}
                    alt="letsCollaborate"
                    width={197}
                    height={42}
                />
            </div>
        </div>
    )
}
