import { ellipsisText } from '@utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useEffect } from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const sliderData = [
    {
        icon: '/images/site/home-page-v3/who-we-serve/grad-cap.png',
        title: 'Bulk Students Accounts',
        description:
            'Say goodbye to manual entry and hello to seamless onboarding. SkilTrak automates account creation directly...',
    },
    {
        icon: '/images/site/home-page-v3/who-we-serve/video-con.png',
        title: 'Video Conferencing',
        description:
            "Host virtual face-to-face meetings without travel or extra cost. SkilTrak's integrated video conferencing makes...",
    },
    {
        icon: '/images/site/home-page-v3/who-we-serve/esign.png',
        title: 'E-Sign System',
        description:
            "It's easier than ever to sign all your most important documents without the hassle of a printer, scanner...",
    },
    // {
    //     icon: '/images/site/home-page-v3/who-we-serve/esign.png',
    //     title: 'E-Sign System',
    //     description:
    //         "It's easier than ever to sign all your most important documents without the hassle of a printer, scanner...",
    // },
    // {
    //     icon: '/images/site/home-page-v3/who-we-serve/esign.png',
    //     title: 'E-Sign System',
    //     description:
    //         "It's easier than ever to sign all your most important documents without the hassle of a printer, scanner...",
    // },
]

export const WhoWeAreSlider = () => {
    const paginationRef = useRef(null)
    const swiperRef = useRef<any>(null)

    useEffect(() => {
        if (swiperRef.current && paginationRef.current) {
            const swiper = swiperRef.current.swiper
            if (swiper && swiper.pagination) {
                swiper.pagination.destroy()
                swiper.pagination.init()
                swiper.pagination.render()
                swiper.pagination.update()
            }
        }
    }, [])

    return (
        <div className="w-full max-w-6xl mx-auto py-12 who-we-are-slider-container">
            <Swiper
                ref={swiperRef}
                modules={[Pagination]}
                pagination={{
                    el: paginationRef.current,
                    clickable: true,
                    bulletClass: 'who-we-are-bullet',
                    bulletActiveClass: 'who-we-are-bullet-active',
                    renderBullet: (index: any, className: any) => {
                        return `<span class="${className} w-3 h-3 rounded-full inline-block mx-1.5 cursor-pointer transition-all duration-300"></span>`
                    },
                }}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 25 },
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                }}
                className="mb-6"
                onSwiper={(swiper: any) => {
                    if (paginationRef.current) {
                        swiper.params.pagination.el = paginationRef.current
                        swiper.pagination.destroy()
                        swiper.pagination.init()
                        swiper.pagination.render()
                        swiper.pagination.update()
                    }
                }}
            >
                {sliderData.map((item: any, index: any) => (
                    <SwiperSlide key={index} className="">
                        <div className="bg-white h-[220px] shadow-[0_10px_20px_rgba(0,0,0,0.1)] rounded-3xl p-4 flex flex-col justify-center items-center text-center relative">
                            {/* Icon */}
                            <div className="mb-4">
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={50}
                                    height={50}
                                />
                            </div>

                            {/* Title */}
                            <h3 className="font-semibold text-[#044866] text-sm mb-3">
                                {item.title}
                            </h3>

                            {/* Description with orange badge bg */}
                            <p
                                title={item.description}
                                className="text-sm text-[#044866]/70 bg-[#F7A619]/20 rounded-3xl px-4 py-2 h-20"
                            >
                                {ellipsisText(item.description, 50)}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Pagination positioned at bottom center */}
            <div className="w-full">
                <div
                    ref={paginationRef}
                    className="flex items-center justify-center gap-1"
                ></div>
            </div>
            <Link
                href="/features"
                className="flex justify-center text-primaryNew underline"
            >
                View All Features
            </Link>

            {/* Scoped pagination colors */}
            <style jsx>{`
                .who-we-are-slider-container :global(.who-we-are-bullet) {
                    background-color: #e7a348;
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                .who-we-are-slider-container
                    :global(.who-we-are-bullet-active) {
                    background-color: #9b2000 !important;
                    opacity: 1;
                }
                .who-we-are-slider-container :global(.who-we-are-bullet:hover) {
                    background-color: #9b2000;
                    opacity: 0.8;
                }
            `}</style>
        </div>
    )
}
