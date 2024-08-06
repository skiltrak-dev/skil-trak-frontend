import { Typography } from '@components'
import { MediaQueries } from '@constants'
import Image from 'next/image'
import React from 'react'
import { useMediaQuery } from 'react-responsive'

export const OurStoryInternationalVentureSection = () => {
    const isLargeScreen = useMediaQuery(MediaQueries.Large)
    
    return (
        <div className="mx-auto max-w-7xl mt-12 mb-5 md:mt-[70px]">
            <div
                className="md:px-64 px-4"
                // data-aos={isLargeScreen ? 'fade-up' : undefined}
            >
                <Typography variant="h2" medium center>
                    SkilTrak International Ventures
                </Typography>
                <div className="flex flex-col items-center justify-center gap-y-5 mb-6">
                    <Typography
                        variant="title"
                        color="text-[#24556D]"
                        semibold
                        center
                    >
                        A Journey Across Continents: Our International Triumphs
                        Unveiled!
                    </Typography>
                    <Typography variant="small" color="text-[#24556D]" center>
                        SkilTrak has expanded from providing placement services
                        to helping you secure employment. We are glad to
                        announce that we have gone international with our
                        programs assisting talented individuals to prepare and
                        secure jobs in top notch industries. Our experienced and
                        friendly team will guide you to unlock job opportunities
                        through SkilTrak's extensive network.
                    </Typography>
                    <Typography
                        variant="title"
                        color="text-[#24556D]"
                        semibold
                        center
                    >
                        SkilTrak is your support in On-shore employment issues,
                        we are also making waves in new International Markets
                        like
                    </Typography>
                </div>
            </div>
            <div className="flex flex-col md:gap-y-4 gap-y-1 justify-center items-center px-4">
                <div
                    className="group philippines-bg relative"
                    // data-aos="fade-right"
                >
                    <div className="flex items-center justify-between md:gap-x-72 gap-x-3 absolute top-1/3 left-8 md:left-[20%]">
                        <p className="country-name">Philippines</p>
                        <div className="md:inline-block hidden opacity-0 group-hover:opacity-100 group-hover:duration-700 group-hover:transition-all  bg-gradient-to-r from-[#24536B] to-[#46A2D1] px-5 py-1.5 border border-white rounded-[10px]">
                            <Typography variant="xs" color="text-white" center>
                                407 Sponsorship Visa
                            </Typography>
                        </div>
                        <div className="inline-block md:hidden">
                            <Typography variant="xxs" color="text-white" center>
                                407 Sponsorship Visa
                            </Typography>
                        </div>
                    </div>
                </div>
                <div
                    className="group france-bg relative"
                    // data-aos="fade-left"
                >
                    <div className="flex items-center justify-between md:gap-x-72 gap-x-8 absolute md:top-1/4 top-2 left-4 md:left-[20%]">
                        <div className="md:flex hidden flex-col gap-y-2 opacity-0 group-hover:opacity-100 group-hover:duration-700 group-hover:transition-all">
                            <div className=" bg-gradient-to-r from-[#24536B] to-[#46A2D1] px-5 py-1.5 border border-white rounded-[10px]">
                                <Typography
                                    variant="muted"
                                    color="text-white"
                                    center
                                >
                                    407 Sponsorship Visa
                                </Typography>
                            </div>

                            <div className="bg-gradient-to-r from-[#24536B] to-[#46A2D1] px-5 py-1.5 border border-white rounded-[10px]">
                                <Typography
                                    variant="muted"
                                    color="text-white"
                                    center
                                >
                                    Working Holiday Visa ( WHV )
                                </Typography>
                            </div>
                            <div className="bg-gradient-to-r from-[#24536B] to-[#46A2D1] px-5 py-1.5 border border-white rounded-[10px]">
                                <Typography
                                    variant="muted"
                                    color="text-white"
                                    center
                                >
                                    Paid & Unpaid Placement
                                </Typography>
                            </div>
                        </div>
                        <div className="flex flex-col md:hidden items-center justify-center">
                            <Typography variant="xxs" color="text-white" center>
                                407 Sponsorship Visa
                            </Typography>
                            <Typography variant="xxs" color="text-white" center>
                                Working Holiday Visa ( WHV )
                            </Typography>
                            <Typography variant="xxs" color="text-white" center>
                                Paid & Unpaid Placement
                            </Typography>
                        </div>
                        <p className="country-name">France</p>
                    </div>
                </div>
                <div
                    className="group mauritius-bg relative"
                    // data-aos="fade-right"
                >
                    <div className="flex items-center justify-between md:gap-x-72 gap-x-8 absolute top-1/3 left-8 md:left-[20%]">
                        <p className="country-name">Mauritius</p>
                        <div className="md:inline-block hidden opacity-0 group-hover:opacity-100 group-hover:duration-700 group-hover:transition-all bg-gradient-to-r from-[#24536B] to-[#46A2D1] px-5 py-1.5 border border-white rounded-[10px]">
                            <Typography
                                variant="muted"
                                color="text-white"
                                center
                            >
                                407 Sponsorship Visa
                            </Typography>
                        </div>
                        <div className="inline-block md:hidden">
                            <Typography variant="xxs" color="text-white" center>
                                407 Sponsorship Visa
                            </Typography>
                        </div>
                    </div>
                </div>
                <div
                    className="group seychelles-bg relative"
                    // data-aos="fade-left"
                >
                    <div className="flex items-center md:justify-between md:gap-x-40 gap-x-12 absolute top-1/3 left-10 md:left-[20%]">
                        <div className="md:flex hidden opacity-0 group-hover:opacity-100 group-hover:duration-700 group-hover:transition-all flex-col gap-y-2">
                            <div className="bg-gradient-to-r from-[#24536B] to-[#46A2D1] px-5 py-1.5 border border-white rounded-[10px]">
                                <Typography
                                    variant="muted"
                                    color="text-white"
                                    center
                                >
                                    407 Visa Program For Commercial Cookery
                                </Typography>
                            </div>
                        </div>
                        <div
                            className="inline-block md:hidden"
                            title="407 Visa Program For Commercial Cookery"
                        >
                            <Typography variant="xxs" color="text-white" center>
                                407 Visa Program...
                            </Typography>
                        </div>
                        <p className="country-name">Seychelles</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
