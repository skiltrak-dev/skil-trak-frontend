import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

export const EmpoweringRtoSection = () => {
    return (
        <div
            className="bg-no-repeat w-full bg-cover bg-center relative "
            style={{
                backgroundImage:
                    'url(/images/site/services/rto-services/empowering-bg.png)',
            }}
        >
            <div className="bg-white/10 size-[236px] rotate-45 rounded-br-[50px] absolute -top-32 left-10 md:left-48"></div>
            <div className="bg-white/10 size-[236px] rotate-45 rounded-br-[50px] absolute -top-28 left-5 md:left-32"></div>
            <div className="max-w-7xl mx-auto py-10">
                <Typography variant="h1" color={'text-white'} center>
                    Empowering Training Organisation with Smarter
                    <br /> Workflows
                </Typography>
                <div className="rounded-[314.054px] opacity-[0.58] bg-[rgba(249,163,7,0.96)] blur-[80px] w-72 h-60 absolute top-32 left-64 hidden md:block" />
                <div className="grid-cols-2 md:grid-cols-4 gap-10 grid mt-16 md:px-0 px-4 md:mb-0 mb-24">
                    <div className="flex flex-col gap-y-10 items-center justify-center relative">
                        <div className="w-px h-[17.5rem] bg-blue-500 -rotate-[65deg] absolute -right-5 -top-12 hidden md:block"></div>
                        <div className="rounded-full flex items-center justify-center size-8 bg-[#F9B847] absolute -top-5 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-white">
                            1
                        </div>
                        <div className="bg-white rounded-full p-5 inline-block">
                            <Image
                                src="/images/site/services/rto-services/empowering-icon-1.svg"
                                alt="icon"
                                width={40}
                                height={40}
                            />
                        </div>
                        <div className="space-y-2">
                            <Typography
                                variant="title"
                                color={'text-white'}
                                center
                            >
                                Choose A Service
                            </Typography>
                            <Typography
                                variant="small"
                                color={'text-white'}
                                center
                            >
                                Select a package or additional services that fit
                                your needs.
                            </Typography>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-10 items-center justify-center relative">
                        <div className="w-px h-[17.2rem] bg-blue-500 rotate-[65deg] absolute -right-5 -top-12 hidden md:block"></div>
                        <div className="rounded-full flex items-center justify-center size-8 bg-[#F9B847] absolute bottom-20 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-white">
                            2
                        </div>
                        <div className="space-y-2">
                            <Typography
                                variant="title"
                                color={'text-white'}
                                center
                            >
                                Request a Meeting
                            </Typography>
                            <Typography
                                variant="small"
                                color={'text-white'}
                                center
                            >
                                Book a free consultation to discover how
                                SkilTrak can support you.
                            </Typography>
                        </div>
                        <div className="bg-white rounded-full p-5 inline-block">
                            <Image
                                src="/images/site/services/rto-services/empowering-icon-2.svg"
                                alt="icon"
                                width={40}
                                height={40}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-10 items-center justify-center relative">
                        <div className="w-px h-[17.2rem] bg-blue-500 -rotate-[65deg] absolute -right-5 -top-12 hidden md:block"></div>
                        <div className="rounded-full flex items-center justify-center size-8 bg-[#F9B847] absolute -top-5 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-white">
                            3
                        </div>
                        <div className="bg-white rounded-full p-5 inline-block">
                            <Image
                                src="/images/site/services/rto-services/empowering-icon-3.svg"
                                alt="icon"
                                width={40}
                                height={40}
                            />
                        </div>
                        <div className="space-y-2">
                            <Typography
                                variant="title"
                                color={'text-white'}
                                center
                            >
                                Define Requirements
                            </Typography>
                            <Typography
                                variant="small"
                                color={'text-white'}
                                center
                            >
                                Share your goals, and we’ll tailor everything to
                                your training model.
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-10 items-center justify-center relative">
                        <div className="rounded-full flex items-center justify-center size-8 bg-[#F9B847] absolute bottom-20 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-white">
                            4
                        </div>
                        <div className="space-y-2">
                            <Typography
                                variant="title"
                                color={'text-white'}
                                center
                            >
                                Integrate
                            </Typography>
                            <Typography
                                variant="small"
                                color={'text-white'}
                                center
                            >
                                Receive a seamless, compliant solution, ready to
                                integrate with your workflow.
                            </Typography>
                        </div>
                        <div className="bg-white rounded-full p-5 inline-block">
                            <Image
                                src="/images/site/services/rto-services/empowering-icon-4.svg"
                                alt="icon"
                                width={40}
                                height={40}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
