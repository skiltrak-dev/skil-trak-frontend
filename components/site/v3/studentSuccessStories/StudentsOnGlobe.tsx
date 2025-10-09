import { Typography } from '@components/Typography'
import Image from 'next/image'
import React from 'react'
import { SiTrustpilot } from 'react-icons/si'

export const StudentsOnGlobe = () => {
    return (
        <div className="">
            <div className="relative flex flex-col justify-center items-center mb-4">
                <div className="flex gap-x-28">
                    <Image
                        src={
                            '/images/site/home-page-v3/student-success-stories/student-avatar/1.png'
                        }
                        alt={`avatar`}
                        height={85}
                        width={85}
                        className=""
                    />
                    <Image
                        src={
                            '/images/site/home-page-v3/student-success-stories/student-avatar/3.png'
                        }
                        alt={`avatar`}
                        height={85}
                        width={85}
                        className=""
                    />
                </div>
                <div className="-mt-10">
                    <Image
                        src={
                            '/images/site/home-page-v3/student-success-stories/student-avatar/2.png'
                        }
                        alt={`avatar`}
                        height={85}
                        width={85}
                        className=""
                    />
                </div>
                <div className="ml-28">
                    <Image
                        src={
                            '/images/site/home-page-v3/student-success-stories/student-avatar/4.png'
                        }
                        alt={`avatar`}
                        height={85}
                        width={85}
                        className=""
                    />
                </div>
                <div className="">
                    <Image
                        src={
                            '/images/site/home-page-v3/student-success-stories/student-avatar/5-8.png'
                        }
                        alt={`avatar`}
                        height={50}
                        width={50}
                        className=""
                    />
                </div>
                <div className="mr-20">
                    <Image
                        src={
                            '/images/site/home-page-v3/student-success-stories/student-avatar/6.png'
                        }
                        alt={`avatar`}
                        height={40}
                        width={40}
                        className=""
                    />
                </div>
                <div className="absolute md:top-80 top-[22rem] md:left-72 left-48">
                    <Image
                        src={
                            '/images/site/home-page-v3/student-success-stories/student-avatar/7.png'
                        }
                        alt={`avatar`}
                        height={36}
                        width={36}
                        className=""
                    />
                </div>
                <div className="absolute top-96 md:left-48 left-32">
                    <Image
                        src={
                            '/images/site/home-page-v3/student-success-stories/student-avatar/5-8.png'
                        }
                        alt={`avatar`}
                        height={28}
                        width={28}
                        className=""
                    />
                </div>
                <div className="absolute bottom-32 left-28">
                    <Image
                        src={
                            '/images/site/home-page-v3/student-success-stories/student-avatar/9.png'
                        }
                        alt={`avatar`}
                        height={78}
                        width={78}
                        className=""
                    />
                </div>
                <div className="absolute bottom-32 md:right-32 right-5">
                    <Image
                        src={
                            '/images/site/home-page-v3/student-success-stories/student-avatar/10.png'
                        }
                        alt={`avatar`}
                        height={60}
                        width={60}
                        className=""
                    />
                </div>

                <Image
                    src={
                        '/images/site/home-page-v3/student-success-stories/globe.webp'
                    }
                    alt={`title line`}
                    height={310}
                    width={329}
                    className=""
                />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-x-6 gap-y-2 mb-4 md:mb-0">
                <div className="bg-white w-[287px] h-[61px] px-4 py-2 flex items-center gap-x-6  border-[#F7A619] border-2 rounded-2xl">
                    <Typography>Review Us On</Typography>
                    <div className="rounded-sm px-2">
                        <a
                            href="https://www.trustpilot.com/review/skiltrak.com.au"
                            target="_blank"
                            rel="noopener"
                        >
                            <Image
                                src={
                                    '/images/site/home-page-v3/student-success-stories/trust-pilot.svg'
                                }
                                alt={`title line`}
                                height={60}
                                width={100}
                                className=""
                            />
                        </a>
                    </div>
                </div>
                <div className="bg-white w-[287px] h-[61px] px-4 py-2 flex items-center gap-x-8  border-[#F7A619] border-2 rounded-2xl">
                    <Typography>Review Us On</Typography>
                    <div className="">
                        <Image
                            src={
                                '/images/site/home-page-v3/student-success-stories/google.png'
                            }
                            alt={`title line`}
                            width={100}
                            height={50}
                            className="mt-4"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
