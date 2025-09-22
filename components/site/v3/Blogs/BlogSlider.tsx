'use client'

import React, { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/pagination'
import { ellipsisText } from '@utils'

const slides = [
    {
        id: 1,
        img: 'https://picsum.photos/500/300?random=1',
        date: 'July 02, 2025',
        title: 'Why Horticulture is Important to a Sustainable Future, SkilTrak can help you get there',
        desc: 'As the world begins to focus on sustainability, climate resilience, and environmental regeneration, horticulture is starting to be recognised as an important player in creating a greener and healthier future. Horticulture goes beyond simply planting flowers or maintaining landscapes;',
        author: 'Maha Zafa',
    },
    {
        id: 2,
        img: 'https://picsum.photos/500/300?random=2',
        date: 'July 15, 2025',
        title: 'Technology and Education: The Future of Learning',
        desc: 'Digital transformation in education enables better access, personalization, and opportunities for students around the globe.',
        author: 'John Doe',
    },
]

export const BlogSlider = () => {
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
        <div className="blog-slider-container">
            <Swiper
                ref={swiperRef}
                modules={[Pagination]}
                pagination={{
                    el: paginationRef.current,
                    clickable: true,
                    bulletClass: 'blog-slider-bullet',
                    bulletActiveClass: 'blog-slider-bullet-active',
                    renderBullet: (index:any, className:any) => {
                        return `<span class="${className} w-4 h-4 rounded-full inline-block mx-1 cursor-pointer"></span>`
                    },
                }}
                spaceBetween={30}
                slidesPerView={1}
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
                {slides.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="relative w-full flex flex-col items-start overflow-hidden">
                            {/* Image floating on the left side */}
                            <div className="absolute left-0 top-10 z-20">
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    width={340}
                                    height={225}
                                    className="rounded-lg shadow-md"
                                />
                            </div>

                            {/* Date on top of image */}

                            {/* Content Card */}
                            <div className="border rounded-lg shadow-sm px-5 py-2 bg-white relative z-10 h-72 w-[80%]">
                                <p className="text-sm text-gray-600">
                                    {item.date}
                                </p>
                                <div className="flex flex-col justify-center items-end w-full">
                                    <div className="">
                                        <h2 className="text-lg font-semibold text-[#9B2000] leading-snug mb-3">
                                            {ellipsisText(item.title, 12)}
                                        </h2>
                                        <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                                            {ellipsisText(item.desc, 20)}
                                        </p>
                                        <button className="px-5 py-2 border border-[#9B2000] text-[#9B2000] rounded-md text-sm font-medium hover:bg-[#9B2000] hover:text-white transition">
                                            READ MORE
                                        </button>
                                    </div>
                                </div>
                                <p className=" text-xs text-gray-500 pt-28">
                                    Published by {item?.author}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Pagination centered */}
            <div className="w-full flex justify-end mt-10">
                <div
                    ref={paginationRef}
                    className="flex items-center justify-center gap-2 ml-72"
                ></div>
            </div>

            {/* Scoped Pagination Styling */}
            <style jsx>{`
                .blog-slider-container :global(.blog-slider-bullet) {
                    background-color: #fcdca6; /* soft yellow */
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                .blog-slider-container :global(.blog-slider-bullet-active) {
                    background-color: #043873 !important; /* dark blue */
                }
                .blog-slider-container :global(.blog-slider-bullet:hover) {
                    background-color: #043873;
                }
            `}</style>
        </div>
    )
}
