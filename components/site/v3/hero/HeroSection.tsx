import { Typography } from '@components/Typography'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoArrowForwardOutline } from 'react-icons/io5'
import FlowingRibbon from './FlowingRibbon'

export const HeroSection = () => {
    return (
        <div>
            {/* Top notification bar */}
            <div className="bg-gradient-to-r from-[#F9A307] to-[#FFFFFF] px-4 md:px-6 py-2 w-full">
                <div className="max-w-7xl mx-auto text-center md:text-left">
                    <p className="text-xs sm:text-sm">
                        <span className="text-[#9B2000] font-semibold">
                            SkilTrak Update:{' '}
                        </span>
                        <span className="text-black">
                            AI Matchmaking | Live Placement Tracking | 1-Click
                            Chatbot | Smart Compliance Tools | Faster Admin,
                            Better Results!
                        </span>
                    </p>
                </div>
            </div>

            {/* Hero section */}
            <div
                className="relative min-h-[600px] md:min-h-[600px] flex flex-col"
                style={{
                    backgroundImage:
                        'url(/images/site/home-page-v3/hero/hero-img-1.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Ribbon layer */}
                <div className="absolute top-0 left-0 w-full h-full z-0">
                    <FlowingRibbon />
                </div>
                <div className="absolute inset-0 bg-[#044866]/60 z-10"></div>

                {/* Content */}
                <div className="flex-1 w-full absolute top-0 left-0 z-20">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex flex-col">
                        {/* Top right help section */}
                        <div className="flex items-center justify-center md:justify-end pt-6 md:pt-8">
                            <div className="bg-gradient-to-r from-[#044866] to-[#2A5E8F] shadow-[0_4px_80px_rgba(0,0,0,0.05)] rounded-full px-4 py-2 md:px-6 md:py-3 mr-2">
                                <p
                                    className="text-sm md:text-lg font-bold text-white"
                                    style={{
                                        textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                                    }}
                                >
                                    Here to help!
                                </p>
                            </div>
                            <Image
                                src={
                                    '/images/site/home-page-v3/hero/help-here-play-btn.webp'
                                }
                                width={60}
                                height={60}
                                alt="play"
                                className="cursor-pointer w-12 h-12 md:w-20 md:h-20"
                            />
                        </div>

                        {/* Main content area */}
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-start flex-1 gap-y-10 md:gap-x-6 lg:gap-x-12 mt-8 md:mt-0">
                            {/* Left side - Text content */}
                            <div className="flex flex-col justify-start max-w-xl text-center md:text-left">
                                <div className="space-y-6 md:space-y-8 mb-6 md:mb-8">
                                    <Typography
                                        variant="h1"
                                        color={'text-white'}
                                        bold
                                        capitalize
                                    >
                                        Smart Placements. Simplified
                                        <br className="hidden md:block" />
                                        Management.
                                        <br className="hidden md:block" />
                                        Real Results.
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        color="text-white"
                                        semibold
                                    >
                                        Built by Educators, for Educators
                                    </Typography>
                                </div>

                                <div className="mb-4 p-2 md:p-0">
                                    <Typography
                                        variant="body"
                                        color="text-white"
                                    >
                                        SkilTrak makes student placement
                                        stress-free for Training Organisations,
                                        <br className="hidden md:block" />
                                        students, and industries.
                                    </Typography>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex items-center justify-center flex-col md:flex-row md:justify-start gap-4 mt-6">
                                    <Link href={'/'}>
                                        <div className="bg-[#9B2000] text-white text-center p-2 md:px-6 md:py-4 rounded-lg hover:bg-[#8A1C00] transition-colors cursor-pointer shadow-lg md:w-full w-auto">
                                            <Typography
                                                variant="title"
                                                color="text-white"
                                                medium
                                            >
                                                Book a Demo
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                color="text-white"
                                            >
                                                For Training Organisations
                                            </Typography>
                                            <div className="flex items-center gap-x-1 justify-center">
                                                <Typography
                                                    variant="small"
                                                    color="text-white"
                                                >
                                                    & Employers
                                                </Typography>
                                                <IoArrowForwardOutline className="text-sm" />
                                            </div>
                                        </div>
                                    </Link>

                                    <Link href={'/'}>
                                        <div className="bg-[#F7A619] text-[#043873] text-center p-2 md:px-6 md:py-5 rounded-lg hover:bg-[#E6951A] transition-colors cursor-pointer shadow-lg w-full sm:w-auto">
                                            <Typography
                                                variant="title"
                                                color="text-[#043873]"
                                                medium
                                            >
                                                Enquire Now
                                            </Typography>
                                            <div className="flex items-center gap-x-1 justify-center">
                                                <Typography
                                                    variant="body"
                                                    color="!text-[#043873]"
                                                >
                                                    We're here to help
                                                </Typography>
                                                <IoArrowForwardOutline className="text-sm" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Right side - Logo */}
                            <div className="md:flex hidden items-end justify-end pt-4 md:pt-10 md:pr-20 ">
                                <Image
                                    src={
                                        '/images/site/home-page-v3/hero/light-logo.svg'
                                    }
                                    width={200}
                                    height={280}
                                    alt="SkilTrak Logo"
                                    className="drop-shadow-lg float-light-animate w-40 md:w-72"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
