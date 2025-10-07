import { Button, Typography } from '@components'
import SiteButtonV3 from '@components/site/v3/button/SiteButtonV3'
import Image from 'next/image'
import React from 'react'
import { CiLocationOn, CiFaceSmile } from 'react-icons/ci'
import { GoThumbsup, GoGift } from 'react-icons/go'
import { LiaBoxSolid } from 'react-icons/lia'
import { IoMdAlarm } from 'react-icons/io'
import Link from 'next/link'

export const HeroSection = () => {
    return (
        <div
            className="h-[500px]"
            style={{
                backgroundImage:
                    'url(/images/site/services/student-services/hero/student-services-hero-bg.webp)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="md:mx-auto md:max-w-7xl py-6 md:py-10 px-4 md:px-0 grid md:grid-cols-3 md:gap-40 h-full relative">
                <div className="col-span-2 flex flex-col gap-y-5">
                    <h1 className="text-primaryNew font-bold text-2xl md:text-5xl lg:text-6xl leading-tight">
                        Your First Step Towards A<br /> Brighter Career
                    </h1>
                    <Typography variant="body" color={'text-primaryNew'}>
                        At SkilTrak, we help students find eligible industries
                        that align with their career goals, ensuring that your
                        placement is not just a requirement but a launchpad.
                        Through structured documentation, industry connections,
                        and professional mentorship, we support you from your
                        first application to the completion of your placement.
                        With SkilTrak, your journey begins not just with
                        training but with career direction and confidence.
                    </Typography>
                    <Link
                        href="/auth/signup/student?step=account-info"
                        className="mt-10 inline-block"
                    >
                        <Button text="Sign Up" />
                    </Link>
                </div>
                <div
                    // style={{
                    //     backgroundImage:
                    //         'url(/images/site/services/student-services/hero/ellipse.png)',
                    //     backgroundSize: 'cover',
                    //     backgroundRepeat: 'no-repeat',
                    // }}
                    className="relative self-end md:block hidden"
                >
                    <div className="relative">
                        <div className="p-1 bg-white rounded-full inline-block absolute -top-12 right-24">
                            <CiLocationOn className="text-red-500" size={25} />
                        </div>
                        <div className="p-1 bg-white rounded-full inline-block absolute top-24 -left-5">
                            <CiFaceSmile className="text-red-500" size={25} />
                        </div>
                        <div className="p-1 bg-white rounded-full inline-block absolute top-36 -left-10">
                            <GoThumbsup className="text-red-500" size={25} />
                        </div>
                        <div className="p-1 bg-white rounded-full inline-block absolute top-[19rem] right-24">
                            <LiaBoxSolid className="text-red-500" size={25} />
                        </div>

                        <Image
                            src={
                                '/images/site/services/student-services/hero/ellipse.png'
                            }
                            alt="student"
                            width={450}
                            height={450}
                            className=""
                        />
                        <div className="absolute -top-6 -right-16">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="197"
                                height="350"
                                viewBox="0 0 197 465"
                                fill="none"
                            >
                                <path
                                    d="M11.7697 1.42374C229.679 45.644 284.595 385.604 2.00001 463.488"
                                    stroke="#6C6C6C"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeDasharray="8 8"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="absolute -top-14 left-0">
                        <Image
                            src={
                                '/images/site/services/student-services/hero/student.png'
                            }
                            alt="student"
                            width={350}
                            height={350}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-x-4 justify-center absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <Button text="FAST Placement" Icon={IoMdAlarm} />
                    <Button
                        text="End-to-End Support"
                        Icon={GoGift}
                        variant="secondary"
                    />
                </div>
            </div>
        </div>
    )
}
