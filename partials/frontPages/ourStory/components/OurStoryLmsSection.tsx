import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

export const OurStoryLmsSection = () => {
    return (
        <div className="max-w-7xl mx-auto mb-20 mt-5 md:mt-0">
            {' '}
            <Typography variant="h2" medium center>
                Our LMS
            </Typography>
            <div className="mt-5 flex items-center gap-x-7 md:px-0 px-4">
                <div className="flex items-center gap-x-5 relative">
                    <Image
                        src="/images/our-story/our-lms-1.png"
                        alt="LMS"
                        width={434}
                        height={380}
                        className="hidden md:block"
                        data-aos="fade-right"
                    />
                    <Image
                        src="/images/our-story/our-lms-1.png"
                        alt="LMS"
                        width={128}
                        height={100}
                        className="md:hidden block"
                        
                    />
                    <Image
                        src="/images/our-story/our-lms-2.png"
                        alt="LMS"
                        width={350}
                        height={436}
                        className="hidden md:block"
                        data-aos="fade-left"
                    />
                    <Image
                        src="/images/our-story/our-lms-2.png"
                        alt="LMS"
                        width={103}
                        height={120}
                        className="block md:hidden"
                       
                    />
                    <div className="absolute md:top-20 top-[4rem] left-28 md:left-52 w-full h-full flex items-center justify-center">
                        <Image
                            src="/images/our-story/our-lms-3.png"
                            alt="LMS"
                            width={500}
                            height={137}
                            className="hidden md:block"
                            data-aos="fade-right"
                        />
                        <Image
                            src="/images/our-story/our-lms-3.png"
                            alt="LMS"
                            width={147}
                            height={40}
                            className="block md:hidden"
                        />
                    </div>
                </div>
                <Image
                    src="/images/our-story/our-lms-4.png"
                    alt="LMS"
                    width={434}
                    height={380}
                    className="hidden md:block"
                    data-aos="fade-left"
                />
                <Image
                    src="/images/our-story/our-lms-4.png"
                    alt="LMS"
                    width={120}
                    height={100}
                    className="block md:hidden"
                />
            </div>
        </div>
    )
}
