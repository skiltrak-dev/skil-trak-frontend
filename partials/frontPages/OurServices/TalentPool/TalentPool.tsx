import { Typography } from '@components'
import { MediaQueries } from '@constants'
import Image from 'next/image'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import {
    IndustriesTalentPool,
    JoinTalentPool,
    StudentsTalentPool,
} from './components'

export const TalentPool = () => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    return (
        <div className="relative pb-14">
            <Image
                src={'/images/site/services/webbasetraining/boxShadow.png'}
                alt={'Shadow'}
                width={0}
                height={0}
                sizes={'100vh 100vw'}
                className="w-[438px] h-[494px] absolute top-[700px] -left-40 -z-10"
            />

            <div className="ourServicesBg bg-cover pt-5 md:pt-10 xl:pt-[75px] pb-40 relative">
                <Image
                    src={'/images/site/services/webbasetraining/boxShadow.png'}
                    alt={'Shadow'}
                    width={0}
                    height={0}
                    sizes={'100vh 100vw'}
                    className="w-[438px] h-[494px] absolute top-[230px] right-0 z-10"
                />
                <div className="max-w-7xl mx-auto ">
                    <div className="max-w-[1050px] mx-auto flex flex-col gap-y-6 px-8 md:px-6 xl:px-0">
                        <Typography bold center>
                            <span className="text-xl md:text-3xl lg:text-[47px]">
                                Welcome to SkilTrak Talent Pool
                            </span>
                        </Typography>
                        <div
                            className="flex flex-col gap-y-2.5"
                            data-aos="fade-up"
                        >
                            <Typography
                                center
                                // variant={isMobile ? 'label' : 'body'}
                                color={'text-[#25566B]'}
                                bold
                            >
                                <span className="text-[21px]">
                                    Bridging Futures
                                </span>
                            </Typography>
                            <Typography
                                center
                                variant={isMobile ? 'label' : 'body'}
                                color={'text-[#56585a]'}
                            >
                                At SkilTrak, we're excited to introduce our
                                latest service, the Talent Pool, designed to
                                revolutionise the way students and industries
                                connect in the ever-evolving job market. Our
                                Talent Pool is a dynamic platform that
                                seamlessly connects aspiring professionals with
                                industry leaders, fostering mutually beneficial
                                relationships that drive success. Here's how our
                                Talent Pool benefits both candidates and
                                industries
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto flex flex-col gap-y-4 xl:gap-y-14 -mt-28 relative z-20 px-4 xl:px-0">
                <div className="flex flex-col gap-y-12 gap-x-3">
                    <StudentsTalentPool />
                    <IndustriesTalentPool />
                </div>
                <JoinTalentPool />
            </div>
        </div>
    )
}
