import React, { useRef, useState } from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { RtoReviewCard } from './RtoReviewCard'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { Card } from '@components'

const rtoReviews = [
    {
        rtoName: 'Marcus Sellen',
        instituteName: '(CEO) Hader Institute of Education',
        imageUrl: 'rto-ceo.png',
        review: `Partnering with SkilTrak has been exceptional. The team, from Julie to Quandeel, 
        consistently demonstrates professionalism, efficiency, and a commitment to our success. 
        Their intuitive, user-friendly system makes coordinating work placements seamless, greatly 
        benefiting our team and learners. Ourstaff and students enjoy working with SkilTrak, and 
        their dedication to quality service is evident in every interaction. We look forward to 
        continuing this valuable partnership.`,
    },
    {
        rtoName: 'Kon Kanellopoulos',
        instituteName: '(Operations Manager) ITHEA',
        imageUrl: 'rto-op.png',
        review: `Working with Skiltrak for the past 5 months has been seamless for ITHEA. 
        The entire team, from directors to account managers, has been supportive, accommodating 
        our needs and effectively connecting our students with employers. Their management of student 
        files during work placements and weekly meetings to resolve issues have been invaluable, 
        allowing our trainers to focus more on teaching. Skiltrak’s system also lets us monitor student 
        progress and ensure they are in the correct work sector. We highly recommend Skiltrak to other 
        organizations seeking similar support, and we look forward to continuing our partnership.`,
    },
]

export const RtoReviewSlider = () => {
    const [isBeginning, setIsBeginning] = useState(true)
    const [isEnd, setIsEnd] = useState(false)
    const courseNavigationPrevRef = useRef(null)
    const courseNavigationNextRef = useRef(null)
    const iconClasses =
        'border border-secondary absolute top-1/2 -mt-2 z-10 cursor-pointer bg-orange-400 text-white shadow-md rounded-md hover:scale-150 transition-all hover:opacity-100 w-5 h-5 flex justify-center items-center'
    const disabledClasses =
        'opacity-50 hover:opacity-50 hover:cursor-not-allowed'

    return (
        <div className="mx-auto max-w-7xl my-20">
            <div className="swiper-container w-full relative">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    slidesPerGroup={1}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 1,
                            spaceBetween: 30,
                        },
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={{
                        prevEl: courseNavigationPrevRef.current,
                        nextEl: courseNavigationNextRef.current,
                    }}
                    onSlideChange={(swiper: any) => {
                        setIsBeginning(swiper.isBeginning)
                        setIsEnd(swiper.isEnd)
                    }}
                    onSwiper={(swiper: any) => {
                        setTimeout(() => {
                            swiper.params.navigation.prevEl =
                                courseNavigationPrevRef.current
                            swiper.params.navigation.nextEl =
                                courseNavigationNextRef.current

                            // Re-init navigation
                            swiper.navigation.destroy()
                            swiper.navigation.init()
                            swiper.navigation.update()
                        })
                    }}
                    modules={[Navigation]}
                    className="mySwiper static"
                >
                    {rtoReviews?.map((rtoReview: any, i: any) => (
                        <SwiperSlide key={i}>
                            <RtoReviewCard
                                key={rtoReview?.instituteName}
                                rtoName={rtoReview?.rtoName}
                                review={rtoReview?.review}
                                imageUrl={rtoReview?.imageUrl}
                                instituteName={rtoReview?.instituteName}
                            />
                        </SwiperSlide>
                    ))}
                    <div
                        ref={courseNavigationPrevRef}
                        className={`${iconClasses} left-0 ${
                            isBeginning ? disabledClasses : ''
                        }`}
                    >
                        <MdKeyboardArrowLeft className="text-2xl text-white" />
                    </div>
                    <div
                        ref={courseNavigationNextRef}
                        className={`${iconClasses} right-0 ${
                            isEnd ? disabledClasses : ''
                        }`}
                    >
                        <MdKeyboardArrowRight className="text-2xl text-white" />
                    </div>
                </Swiper>
            </div>
        </div>
    )
}
