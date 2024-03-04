import { Typography } from '@components'
import { MediaQueries } from '@constants'
import Image from 'next/image'
import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

export const OperateStates = () => {
    const [active, setActive] = useState(0)

    const isMobile = useMediaQuery(MediaQueries.Mobile)

    const imagesTexts = [
        'Western Australia',
        'Northern Territory',
        'Queens Land',
        'Southern Australia',
        'New South Wales',
        'Victoria',
        'Tasmania',
    ]
    return (
        <div className="pt-10 pb-16">
            <div className="pb-8 flex justify-center" data-aos="fade-up">
                <Typography
                    variant={isMobile ? 'title' : 'h2'}
                    {...(isMobile
                        ? {
                              center: true,
                          }
                        : {})}
                    bold
                >
                    We operate in following states
                </Typography>
            </div>
            <div
                data-aos="fade-up"
                className="max-w-7xl mx-auto overflow-auto md:overflow-hidden box-content px-10"
            >
                <div className="w-full flex justify-between gap-x-2 md:gap-x-0 items-center ">
                    {imagesTexts?.map((text, i) => (
                        <div
                            onMouseEnter={() => setActive(i)}
                            className={`${
                                i === active ? 'min-w-[280px]' : 'min-w-[160px]'
                            } transition-all duration-500 h-[434px] overflow-hidden relative rounded-[5px]`}
                        >
                            <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center pb-6">
                                <Typography
                                    variant={i === active ? 'title' : 'small'}
                                    medium
                                    center
                                    color={
                                        'text-white transition-all duration-500'
                                    }
                                >
                                    {text}
                                </Typography>
                            </div>
                            <Image
                                src={`/images/site/states/state${i + 2}.png`}
                                alt={''}
                                width={0}
                                height={0}
                                sizes={'100vw 100vh'}
                                className={`min-w-full h-full object-cover`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
