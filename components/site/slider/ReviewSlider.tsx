import { useEffect, useState } from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ReviewSlide } from './ReviewSlide'

import axios from 'axios'
import { ReviewContentLoader } from './ReviewContentLoader'

export const ReviewSlider = () => {
    const [reviewList, setReviewList] = useState<any>([])

    useEffect(() => {
        axios
            .get(`https://www.skiltrak.com.au/api/admin-reviews`)
            .then((res) => {
                setReviewList(res.data)
            })
            .catch((err) => {})
    }, [])

    return reviewList.length > 0 ? (
        <Swiper
            loop
            centeredSlides
            autoplay={{ delay: 3000 }}
            direction={'horizontal'}
            slidesPerView={1}
            spaceBetween={16}
            speed={1000}
            modules={[Autoplay, Pagination]}
            observeParents
            observer
            pagination={{
                clickable: true,
                el: '.review-pagination',
                renderBullet: (index, className) => {
                    return `
          <div
                style="background-image: url('${reviewList[index].image_url}'); background-size: cover; background-position: center center;"
                class="w-14 h-14 lg:w-24 lg:h-24 rounded-full mr-3 mb-2 block"
            ></div>
          `
                },
            }}
        >
            {reviewList.map((slide: any, i: any) => (
                <SwiperSlide key={i}>
                    <ReviewSlide content={slide} />
                </SwiperSlide>
            ))}
        </Swiper>
    ) : (
        <ReviewContentLoader />
    )
}
