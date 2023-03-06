import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'

import NewsSlide from './NewsSlide'

export const NewsSlider = ({ newsList }: any) => {
    return (
        <div>
            <Swiper
                // loop
                centeredSlides
                autoplay={{ delay: 3000 }}
                direction={'horizontal'}
                slidesPerView={1}
                spaceBetween={16}
                speed={3000}
                modules={[Autoplay, Pagination]}
                pagination={{
                    el: '.news-pagination',
                    clickable: true,
                    bulletClass: `swiper-pagination-bullet swiperPaginationBullet`,
                }}
                breakpoints={{
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 3,
                    },
                    // when window width is >= 768px
                    1024: {
                        slidesPerView: 5,
                        pagination: false,
                    },
                }}
            >
                {newsList.map((news: any) => (
                    <SwiperSlide key={news.id}>
                        <NewsSlide news={news} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="news-pagination text-center"></div>
        </div>
    )
}
