import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

export const OurStoryRtoSection = () => {
    const items = [
        {
            icon: '/images/our-story/rto-icons/icon-1.svg',
            description: `Unlock Seamless Compliance and Placement Success with SkilTrak`,
        },
        {
            icon: '/images/our-story/rto-icons/icon-2.svg',
            description: `video conferencing Enhances communication`,
        },
        {
            icon: '/images/our-story/rto-icons/icon-3.svg',
            description: `Track Student Placement Progress at Every Step`,
        },
        {
            icon: '/images/our-story/rto-icons/icon-4.svg',
            description: `E-Sign Feature for Documents`,
        },
        {
            icon: '/images/our-story/rto-icons/icon-5.svg',
            description: `Bulk Student Account Creation`,
        },
        {
            icon: '/images/our-story/rto-icons/icon-6.svg',
            description: `No Hassle, No Compliance Issues`,
        },
        {
            icon: '/images/our-story/rto-icons/icon-7.svg',
            description: `Book Appointments Online from Their Portal`,
        },
        {
            icon: '/images/our-story/rto-icons/icon-8.svg',
            description: `Create Tickets For Students`,
        },
    ]
    return (
        <>
            <div className="gradient-bg">
                <div className="mx-auto max-w-7xl md:py-16 py-0 px-4">
                    <div className="flex justify-between gap-x-44 flex-col md:flex-row md:items-start items-center">
                        <div className="flex flex-col gap-y-5">
                            <div className="md:mt-0 mt-8">
                                <Typography variant="h2" color="text-[#24556D]">
                                    RTO
                                </Typography>
                            </div>
                            <Typography
                                variant="body"
                                color="text-[#24556D]"
                                semibold
                            >
                                Your RTO’s Ultimate Partner in Efficiency
                            </Typography>
                            <Typography variant="body" color="text-[#24556D]">
                                Experience unparalleled efficiency with
                                SkilTrak, designed to streamline and enhance
                                your Registered Training Organization's
                                operations.
                            </Typography>
                            <div className="relative hidden md:block">
                                <Image
                                    src="/images/our-story/rto-1.png"
                                    alt="feature-icon"
                                    width={434}
                                    height={211}
                                />
                                <div className="absolute top-16 right-10">
                                    <Image
                                        src="/images/our-story/rto-2.png"
                                        alt="feature-icon"
                                        width={344}
                                        height={77}
                                    />
                                </div>
                                <div className="absolute top-[60%] right-12">
                                    <Image
                                        src="/images/our-story/rto-3.png"
                                        alt="feature-icon"
                                        width={486}
                                        height={173}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <Typography variant="title" color="text-[#24556D]">
                                Features
                            </Typography>
                            <div className="grid grid-cols-2 md:gap-y-12 gap-y-5 gap-x-10 md:gap-x-24 mt-4 md:mt-8">
                                {items?.map((item: any) => (
                                    <div>
                                        <div className="size-10 bg-white mb-4 rounded-lg flex items-center justify-center">
                                            <Image
                                                src={item?.icon}
                                                alt="feature-icon"
                                                width={27}
                                                height={27}
                                            />
                                        </div>
                                        <Typography
                                            variant="small"
                                            color="text-[#24556D]"
                                            medium
                                        >
                                            {item?.description}
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
