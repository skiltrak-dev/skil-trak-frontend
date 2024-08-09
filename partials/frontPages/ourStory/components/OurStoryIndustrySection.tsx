import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

export const OurStoryIndustrySection = () => {
    const items = [
        {
            icon: '/images/our-story/industry-icons/icon-1.svg',
            description: `All Services Are Free for Our Industry Partners`,
        },
        {
            icon: '/images/our-story/industry-icons/icon-2.svg',
            description: `Advertise Jobs Through SkilTrak`,
        },
        {
            icon: '/images/our-story/industry-icons/icon-3.svg',
            description: `Hire talented individuals locally and Internationally`,
        },
        {
            icon: '/images/our-story/industry-icons/icon-4.svg',
            description: `Recruit highly qualified candidates from all over the world`,
        },
        {
            icon: '/images/our-story/industry-icons/icon-5.svg',
            description: `Talent Pool For Hiring Students`,
        },
    ]
    return (
        <>
            <div className="gradient-bg">
                <div className="mx-auto max-w-7xl md:py-16 py-0 px-4">
                    <div className="flex justify-between  gap-x-44 flex-col md:flex-row md:items-start items-center">
                        <div>
                            <div className='md:mt-0 mt-5'>
                                <Typography
                                    variant="title"
                                    color="text-[#24556D]"
                                >
                                    Features
                                </Typography>
                            </div>
                            <div className="grid grid-cols-1 gap-y-5 md:gap-y-8 mt-8">
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
                        <div className="">
                            <div className="md:mt-4 mt-4 flex flex-col gap-y-5">
                                <Typography variant="h2" color="text-[#24556D]">
                                    Industries
                                </Typography>
                                <Typography
                                    variant="body"
                                    color="text-[#24556D]"
                                    semibold
                                >
                                    Join Hands with SkilTrak in Transforming
                                    Futures
                                </Typography>
                                <Typography
                                    variant="body"
                                    color="text-[#24556D]"
                                >
                                    Partner with us to recruit talented
                                    individuals through our talent pool and
                                    other specialized programs.
                                </Typography>
                                <div className="relative hidden md:block">
                                    <Image
                                        src="/images/our-story/industry-1.png"
                                        alt="feature-icon"
                                        width={542}
                                        height={215}
                                    />
                                    <div className="absolute top-28 right-10 z-20">
                                        <Image
                                            src="/images/our-story/industry-2.png"
                                            alt="feature-icon"
                                            width={340}
                                            height={87}
                                        />
                                    </div>
                                    <div className="absolute top-[60%] -right-36 z-10">
                                        <Image
                                            src="/images/our-story/industry-3.png"
                                            alt="feature-icon"
                                            width={442}
                                            height={153}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
