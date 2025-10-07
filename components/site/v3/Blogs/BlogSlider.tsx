'use client'

import React, { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/pagination'
import { ellipsisText } from '@utils'
import Link from 'next/link'

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

export const BlogSlider = ({ featuredBlogs }: any) => {
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
        <div className="blog-slider-container w-full px-4 sm:px-6 lg:px-8">
            <Swiper
                ref={swiperRef}
                modules={[Pagination]}
                pagination={{
                    el: paginationRef.current,
                    clickable: true,
                    bulletClass: 'blog-slider-bullet',
                    bulletActiveClass: 'blog-slider-bullet-active',
                    renderBullet: (index: any, className: any) => {
                        return `<span class="${className} w-3 h-3 sm:w-4 sm:h-4 rounded-full inline-block mx-1 cursor-pointer"></span>`
                    },
                }}
                spaceBetween={20}
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
                {featuredBlogs?.slice(0, 3)?.map((item: any) => (
                    <SwiperSlide key={item.id}>
                        {/* Mobile Layout (stacked) */}
                        <div className="block md:hidden w-full">
                            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                                {/* Image on top for mobile */}
                                <div className="w-full">
                                    <Image
                                        src={`${item?.featuredImage}`}
                                        alt={item?.title}
                                        width={500}
                                        height={250}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>

                                {/* Content below image for mobile */}
                                <div className="p-4">
                                    <p className="text-xs text-gray-600 mb-2">
                                        {item?.updatedAt?.slice(0, 10) ?? 'NA'}
                                    </p>
                                    <h2 className="text-base font-semibold text-[#9B2000] leading-snug mb-3">
                                        {ellipsisText(item?.title, 15)}
                                    </h2>
                                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                                        {ellipsisText(
                                            item?.shortDescription,
                                            25
                                        )}
                                    </p>
                                    <Link
                                        href={`/blogs/${item?.slug}`}
                                        className="px-4 py-2 border border-[#9B2000] text-[#9B2000] rounded-md text-xs font-medium hover:bg-[#9B2000] hover:text-white transition w-full sm:w-auto"
                                    >
                                        READ MORE
                                    </Link>
                                    <p className="text-xs text-gray-500 mt-3">
                                        Published by {item?.author}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Desktop/Tablet Layout (side by side) */}
                        <div className="hidden md:block relative w-full">
                            <div className="flex items-center overflow-hidden">
                                {/* Image floating on the left side */}
                                <div className="relative z-20 flex-shrink-0 mr-6">
                                    <p className="text-sm text-gray-600 mb-2">
                                        {item?.updatedAt?.slice(0, 10)}
                                    </p>
                                    <Image
                                        src={item.featuredImage}
                                        alt={item.title}
                                        width={340}
                                        height={225}
                                        className="rounded-lg shadow-md w-64 lg:w-80 h-auto"
                                    />
                                    <p className="text-xs text-gray-500 mt-4">
                                        Published by {item?.author}
                                    </p>
                                </div>

                                {/* Content Card */}
                                <div className="border rounded-lg shadow-sm px-5 py-4 bg-white relative z-10 flex-1 min-h-[280px] lg:min-h-[300px]">
                                    {/* <p className="text-sm text-gray-600 mb-2">
                                        {item.date}
                                    </p> */}
                                    <div className="flex flex-col justify-between h-full">
                                        <div>
                                            <h2 className="text-lg lg:text-xl font-semibold text-[#9B2000] leading-snug mb-3">
                                                {ellipsisText(item.title, 12)}
                                            </h2>
                                            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                                                {ellipsisText(
                                                    item?.shortDescription,
                                                    200
                                                )}
                                            </p>
                                            <Link
                                                href={`/blogs/${item?.slug}`}
                                                className="px-5 py-2 border border-[#9B2000] text-[#9B2000] rounded-md text-sm font-medium hover:bg-[#9B2000] hover:text-white transition"
                                            >
                                                READ MORE
                                            </Link>
                                        </div>
                                        {/* <p className="text-xs text-gray-500 mt-4">
                                            Published by {item?.author}
                                        </p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Pagination */}
            <div className="w-full flex justify-center md:justify-end mt-6 md:mt-10">
                <div
                    ref={paginationRef}
                    className="flex items-center justify-center md:justify-end gap-2"
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
