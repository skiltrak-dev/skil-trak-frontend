import { Typography } from '@components'
import { MediaQueries } from '@constants'
import Image from 'next/image'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { ContactUpSkill, UpSkillsInfo } from './components'

export const UpskillTraineeship = () => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    return (
        <div className="relative">
            <Image
                src={'/images/site/services/webbasetraining/boxShadow.png'}
                alt={'Shadow'}
                width={0}
                height={0}
                sizes={'100vh 100vw'}
                className="w-[438px] h-[494px] absolute top-[310px] right-0 -z-10"
            />
            <Image
                src={'/images/site/services/webbasetraining/boxShadow.png'}
                alt={'Shadow'}
                width={0}
                height={0}
                sizes={'100vh 100vw'}
                className="w-[438px] h-[494px] absolute top-[700px] -left-40 -z-10"
            />

            <div className="ourServicesBg bg-cover pt-5 md:pt-10 xl:pt-[75px] pb-28 relative">
                <div className="max-w-7xl mx-auto ">
                    <div className="max-w-6xl mx-auto flex flex-col gap-y-7 px-8 md:px-6 xl:px-0">
                        <Typography bold center>
                            <span className="text-xl md:text-3xl lg:text-[47px]">
                                Upskill Traineeship Program
                            </span>
                        </Typography>
                        <div className="flex flex-col gap-y-2.5">
                            <Typography
                                center
                                // variant={isMobile ? 'label' : 'body'}
                                color={'text-[#25566B]'}
                                bold
                            >
                                <span className="text-[21px]">
                                    Welcome to Australia: Your Gateway to a
                                    Thriving Hospitality Career!
                                </span>
                            </Typography>
                            <Typography
                                center
                                variant={isMobile ? 'label' : 'body'}
                                color={'text-[#56585a]'}
                            >
                                Are you a skilled hospitality professional
                                seeking new opportunities and experiences? Look
                                no further! Our invitation is extended to the
                                overseas Hospitality Industry and commercial
                                cookery workers working anywhere outside
                                Australia like you, eager to elevate your career
                                in the vibrant Australian hospitality scene.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto -mt-12 relative z-20 pb-16 px-4 xl:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 ">
                    <div className="lg:col-span-7 order-2 lg:order-1 pr-0 lg:pr-28">
                        <UpSkillsInfo />
                    </div>
                    <div className="lg:col-span-5 lg:order-2 order-1">
                        <div className="sticky top-20">
                            <ContactUpSkill />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
