import React from 'react'
import { WhoWeServeTitle } from './WhoWeServeTitle'
import { WhoWeServeCard } from './card'
import { SubTitleWhoWeServe } from './SubTitleWhoWeServe'
import { WhoWeAreSlider } from './WhoWeAreSlider'
import Image from 'next/image'

export const WhoWeServe = () => {
    return (
        <div className="w-full">
            <div
                className="relative min-h-[600px] flex flex-col py-16"
                style={{
                    backgroundImage:
                        'url(/images/site/home-page-v3/who-we-serve/who-we-serve-bg.webp)',
                    backgroundSize: 'cover',
                    // backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="md:max-w-7xl md:mx-auto ">
                    <div className="px-4 md:px-0">
                        <WhoWeServeTitle />
                        <WhoWeServeCard />
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-x-14 w-full mt-20 md:mt-40">
                        <div className="flex flex-col gap-y-2 w-3/5">
                            <SubTitleWhoWeServe />
                            <WhoWeAreSlider />
                        </div>
                        <div className="md:w-2/5 relative">
                            <Image
                                src={
                                    'images/site/home-page-v3/who-we-serve/icons/icons-image.webp'
                                }
                                alt="Shapes"
                                width={400}
                                height={400}
                                className=""
                            />
                            <div className="absolute top-0 right-6 animate-float">
                                <Image
                                    src={
                                        'images/site/home-page-v3/who-we-serve/icons/top-triangle.svg'
                                    }
                                    alt="Shapes"
                                    width={50}
                                    height={50}
                                    className=""
                                />
                            </div>
                            <div className="absolute top-20 right-14 ">
                                <Image
                                    src={
                                        'images/site/home-page-v3/who-we-serve/icons/cross.svg'
                                    }
                                    alt="Shapes"
                                    width={80}
                                    height={80}
                                    className="animate-float"
                                />
                            </div>
                            <div className="absolute top-44 right-0 ">
                                <Image
                                    src={
                                        'images/site/home-page-v3/who-we-serve/icons/center-triangle.svg'
                                    }
                                    alt="Shapes"
                                    width={50}
                                    height={50}
                                    className="animate-float"
                                />
                            </div>
                            <div className="absolute top-64 right-16 ">
                                <Image
                                    src={
                                        'images/site/home-page-v3/who-we-serve/icons/circle.svg'
                                    }
                                    alt="Shapes"
                                    width={50}
                                    height={50}
                                    className="animate-float"
                                />
                            </div>
                            <div className="absolute top-70 right-40 ">
                                <Image
                                    src={
                                        'images/site/home-page-v3/who-we-serve/icons/bottom-triangle.svg'
                                    }
                                    alt="Shapes"
                                    width={50}
                                    height={50}
                                    className="animate-float"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
