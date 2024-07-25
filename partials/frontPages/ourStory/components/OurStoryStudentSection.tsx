import { Typography } from '@components'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const OurStoryStudentSection = () => {
    const items = [
        {
            icon: '/images/our-story/student-icons/icon-1.svg',
            description: `Track your Placement Progress`,
        },
        {
            icon: '/images/our-story/student-icons/icon-2.svg',
            description: `Use our E-signs system for your Placement agreements`,
        },
        {
            icon: '/images/our-story/student-icons/icon-3.svg',
            description: `Build connections with Australia's top-notch industries`,
        },
        {
            icon: '/images/our-story/student-icons/icon-4.svg',
            description: `Free access to our Talent Pool`,
        },
        {
            icon: '/images/our-story/student-icons/icon-5.svg',
            description: `Get Nationwide Jobs and build your CV`,
        },
        {
            icon: '/images/our-story/student-icons/icon-6.svg',
            description: `Stay updated with market trends via emails and our dedicated team`,
        },
    ]
    return (
        <>
            <div className="gradient-bg">
                <div className="mx-auto max-w-7xl md:py-16 py-4 px-4">
                    <div className="flex justify-between gap-x-44 flex-col md:flex-row md:items-start items-center">
                        <div className="flex flex-col gap-y-5">
                            <div className="md:mt-0 mt-6">
                                <Typography variant="h2" color="text-[#24556D]">
                                    Student
                                </Typography>
                            </div>

                            <Typography
                                variant="body"
                                color="text-[#24556D]"
                                semibold
                            >
                                Empower your educational journey and career
                                prospects with SkilTrak's suite of tools
                                designed to support you every step of the way.
                            </Typography>
                            <div className="relative mt-11 md:block hidden">
                                <Image
                                    src="/images/our-story/rto-1.png"
                                    alt="feature-icon"
                                    width={334}
                                    height={211}
                                />
                                <div className="absolute top-20 right-20">
                                    <Image
                                        src="/images/our-story/rto-2.png"
                                        alt="feature-icon"
                                        width={244}
                                        height={77}
                                    />
                                </div>
                                <div className="absolute top-[63%] right-24">
                                    <Image
                                        src="/images/our-story/rto-3.png"
                                        alt="feature-icon"
                                        width={386}
                                        height={173}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <Typography variant="title" color="text-[#24556D]">
                                Features
                            </Typography>
                            <div className="grid grid-cols-2 gap-y-5 md:gap-y-12 gap-x-10 md:gap-x-24 mt-4 md:mt-8">
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
                    <div className="flex justify-center items-center mt-12 md:mt-36">
                        <Link
                            href="/auth/signup"
                            className=" text-white md:text-white md:text-base text-xs font-medium bg-orange-400 rounded-lg px-4 py-2 uppercase"
                        >
                            sign up to your desire portal
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
