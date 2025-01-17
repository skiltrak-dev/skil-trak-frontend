import { Typography } from '@components'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const OurStorySkiltrakIsWorkingWithSection = () => {
    return (
        <div>
            <div className="skiltrak-is-working-with-bg">
                <div className="pt-16">
                    <Typography variant="h2" medium center>
                        Skiltrak Is Working With
                    </Typography>
                </div>
                <div className="flex flex-col items-center justify-center mx-auto max-w-7xl mt-9">
                    <div
                        data-aos="fade-down"
                        className="bg-white rounded-lg p-3 border-gradient border-2"
                    >
                        <Image
                            src={'/images/our-story/skiltrak-logo.svg'}
                            alt="Logo"
                            width={162}
                            height={48}
                        />
                    </div>
                    <div className="h-6 w-[1px] border-dashed border-[#24536B] border"></div>
                    <div className="h-[1px] w-[80%] mx-auto border-dashed border-[#24536B] border md:block hidden"></div>
                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full">
                        <div className="flex flex-col items-center">
                            <div className="h-6 w-[1px] border-dashed border-[#24536B] border"></div>
                            <div
                                data-aos="fade-right"
                                className="bg-white rounded-lg w-32 h-14 md:w-[255px] md:h-24 p-3 border-gradient border-2 flex flex-col items-center justify-center"
                            >
                                <Image
                                    src={'/images/our-story/rto.svg'}
                                    alt="Logo"
                                    width={35}
                                    height={35}
                                    className="hidden md:block"
                                />
                                <Image
                                    src={'/images/our-story/rto.svg'}
                                    alt="Logo"
                                    width={20}
                                    height={20}
                                    className="block md:hidden"
                                />
                                <p className="m-0 p-0 md:text-base whitespace-nowrap text-xs">
                                    RTO’s
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-6 w-[1px] border-dashed border-[#24536B] border"></div>
                            <div
                                data-aos="fade-up"
                                className="bg-white rounded-lg w-32 h-14 md:w-[255px] md:h-24 p-3 border-gradient border-2 flex flex-col items-center justify-center"
                            >
                                <Image
                                    src={'/images/our-story/industry.svg'}
                                    alt="Logo"
                                    width={35}
                                    height={35}
                                    className="hidden md:block"
                                />
                                <Image
                                    src={'/images/our-story/industry.svg'}
                                    alt="Logo"
                                    width={20}
                                    height={20}
                                    className="block md:hidden"
                                />
                                <p className="m-0 p-0 md:text-base whitespace-nowrap text-xs">
                                    Industries
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-6 w-[1px] border-dashed border-[#24536B] border"></div>
                            <div
                                data-aos="fade-up"
                                className="bg-white rounded-lg w-32 h-14 md:w-[255px] md:h-24 p-3 border-gradient border-2 flex flex-col items-center justify-center"
                            >
                                <Image
                                    src={'/images/our-story/student.svg'}
                                    alt="Logo"
                                    width={35}
                                    height={35}
                                    className="hidden md:block"
                                />
                                <Image
                                    src={'/images/our-story/student.svg'}
                                    alt="Logo"
                                    width={20}
                                    height={20}
                                    className="block md:hidden"
                                />
                                <p className="m-0 p-0 md:text-base whitespace-nowrap text-xs">
                                    Students
                                </p>
                            </div>
                        </div>
                        {/* <div className="flex flex-col items-center">
                            <div className="h-6 w-[1px] border-dashed border-[#24536B] border"></div>
                            <div
                                data-aos="fade-left"
                                className="bg-white rounded-lg w-40 h-16 md:w-[255px] md:h-24 p-3 border-gradient border-2 flex flex-col items-center justify-center"
                            >
                                <Image
                                    src={'/images/our-story/handshake.svg'}
                                    alt="Logo"
                                    width={35}
                                    height={35}
                                    className="hidden md:block"
                                />
                                <Image
                                    src={'/images/our-story/handshake.svg'}
                                    alt="Logo"
                                    width={35}
                                    height={35}
                                    className="block md:hidden"
                                />
                                <p className="m-0 p-0 md:text-base whitespace-nowrap text-xs">
                                    International Ventures
                                </p>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="flex justify-center items-center mt-11">
                    <Link
                        href="/auth/signup"
                        className=" text-white md:text-white md:text-base text-xs font-medium bg-orange-400 rounded-lg px-4 py-2 uppercase"
                    >
                        sign up to your desire portal
                    </Link>
                </div>
            </div>
        </div>
    )
}
