import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

export const OurStoryInternationalVentureSection = () => {
    return (
        <div className="mx-auto max-w-7xl mt-[70px]">
            <div className="px-64">
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
            <div className="philippines-bg relative">
                <div className="flex items-center justify-between gap-x-60 absolute top-1/3 left-[20%]">
                    <p className="country-name">Philippines.</p>
                    <div className="bg-gradient-to-r from-[#24536B] to-[#46A2D1] px-5 py-1.5 border border-white rounded-[10px]">
                        <Typography variant="muted" color="text-white" center>
                            407 Sponsorship Visa
                        </Typography>
                    </div>
                </div>
            </div>
            <div className="france-bg relative">
                <div className="flex items-center justify-between gap-x-60 absolute top-1/4 left-[20%]">
                    <div className="flex flex-col gap-y-2">
                        <div className="bg-gradient-to-r from-[#24536B] to-[#46A2D1] px-5 py-1.5 border border-white rounded-[10px]">
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
                    <p className="country-name">France</p>
                </div>
            </div>
            <div className="mauritius-bg relative">
                <div className="flex items-center justify-between gap-x-60 absolute top-1/3 left-[20%]">
                    <p className="country-name">Mauritius</p>
                    <div className="bg-gradient-to-r from-[#24536B] to-[#46A2D1] px-5 py-1.5 border border-white rounded-[10px]">
                        <Typography variant="muted" color="text-white" center>
                            407 Sponsorship Visa
                        </Typography>
                    </div>
                </div>
            </div>
            <div className="seychelles-bg relative">
                <div className="flex items-center justify-between gap-x-36 absolute top-1/3 left-[20%]">
                    <div className="flex flex-col gap-y-2">
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
                    <p className="country-name">Seychelles</p>
                </div>
            </div>
        </div>
    )
}
