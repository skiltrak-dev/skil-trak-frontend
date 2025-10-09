'use client'

import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectCoverflow } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'

const sliderData = [
    {
        image: '/images/site/home-page-v3/collaboration-add-ons/collaboration-add-on-1.webp',
        title: 'Industry Partners',
    },
    {
        image: '/images/site/home-page-v3/collaboration-add-ons/collaboration-add-on-3.png',
        title: 'Migration Agents',
    },
    {
        image: '/images/site/home-page-v3/collaboration-add-ons/collaboration-add-on-3.png',
        title: 'Education Consultancies',
    },
    {
        image: '/images/site/home-page-v3/collaboration-add-ons/collaboration-add-on-4.jpg',
        title: 'Another Partner',
    },
]

export const CollabAddOnsSlider = () => {
    const prevRef = useRef<HTMLDivElement | null>(null)
    const nextRef = useRef<HTMLDivElement | null>(null)

    return (
        <div className="relative w-full max-w-6xl mx-auto py-12">
            <Swiper
                modules={[Navigation, EffectCoverflow]}
                effect="coverflow"
                grabCursor
                centeredSlides
                loop
                slidesPerView={1.2}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 150,
                    modifier: 2,
                    scale: 0.9, // side slides smaller
                    slideShadows: false,
                }}
                breakpoints={{
                    768: { slidesPerView: 2.2 },
                    1024: { slidesPerView: 2.8 },
                }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper: any) => {
                    // @ts-ignore
                    swiper.params.navigation.prevEl = prevRef.current
                    // @ts-ignore
                    swiper.params.navigation.nextEl = nextRef.current
                }}
                className="pb-12"
            >
                {sliderData.map((item: any, index: any) => (
                    <SwiperSlide key={index}>
                        <div className="relative rounded-2xl overflow-hidden shadow-lg">
                            {/* Background Image */}
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={400}
                                height={300}
                                className="w-full h-[350px] object-cover"
                            />

                            {/* Title Badge */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                                <span className="bg-[#044866] text-white px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-md">
                                    {item.title}
                                    <span className="bg-[#F7A619] text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
                                        ↗
                                    </span>
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Arrows */}
            <div
                ref={prevRef}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer w-10 h-10 flex items-center justify-center border border-[#9B2000] rounded-full text-[#9B2000] hover:bg-[#9B2000] hover:text-white transition"
            >
                ‹
            </div>
            <div
                ref={nextRef}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer w-10 h-10 flex items-center justify-center border border-[#9B2000] rounded-full text-[#9B2000] hover:bg-[#9B2000] hover:text-white transition"
            >
                ›
            </div>
        </div>
    )
}
