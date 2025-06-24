import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { Typography } from '@components'
import { Course } from '@types'
import { CourseCard } from '../Cards'
import { SliderStyleContainer } from '../styles'

interface CourseSliderProps {
    courses: Course[] | undefined
    selectedCourse: Course | null
    onCourseChange: (course: Course) => void
    onSlideChange: (course: Course) => void
}

export const CourseSlider: React.FC<CourseSliderProps> = ({
    courses,
    selectedCourse,
    onCourseChange,
    onSlideChange,
}) => {
    const courseNavigationPrevRef = useRef(null)
    const courseNavigationNextRef = useRef(null)

    const iconClasses =
        'border border-secondary absolute top-1/2 -mt-2 z-10 cursor-pointer bg-primaryNew text-white shadow-md rounded-full hover:scale-150 transition-all hover:opacity-100 w-5 h-5 flex justify-center items-center'

    return (
        <div className="lg:col-span-2 px-4 py-2.5">
            <Typography variant="small" medium>
                Courses
            </Typography>
            <div className="mt-2.5">
                <SliderStyleContainer className="relative">
                    <div className="swiper-container w-full relative">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            slidesPerGroup={1}
                            pagination={{ clickable: true }}
                            navigation={{
                                prevEl: courseNavigationPrevRef.current,
                                nextEl: courseNavigationNextRef.current,
                            }}
                            onSlideChange={(e: any) => {
                                if (courses && courses?.length > 0) {
                                    onSlideChange(courses[e.activeIndex])
                                }
                            }}
                            onSwiper={(swiper: any) => {
                                setTimeout(() => {
                                    swiper.params.navigation.prevEl =
                                        courseNavigationPrevRef.current
                                    swiper.params.navigation.nextEl =
                                        courseNavigationNextRef.current
                                    swiper.navigation.destroy()
                                    swiper.navigation.init()
                                    swiper.navigation.update()
                                })
                            }}
                            modules={[Navigation]}
                            className="mySwiper static"
                        >
                            {courses?.map((course: Course) => (
                                <SwiperSlide key={course?.id}>
                                    <CourseCard
                                        onClick={() => onCourseChange(course)}
                                        course={course}
                                        active={
                                            selectedCourse?.id === course?.id
                                        }
                                    />
                                </SwiperSlide>
                            ))}
                            <div
                                ref={courseNavigationPrevRef}
                                className={`${iconClasses} left-0 lg:-left-3`}
                            >
                                <MdKeyboardArrowLeft className="text-2xl text-white" />
                            </div>
                            <div
                                ref={courseNavigationNextRef}
                                className={`${iconClasses} right-0 lg:-right-3`}
                            >
                                <MdKeyboardArrowRight className="text-2xl text-white" />
                            </div>
                        </Swiper>
                    </div>
                </SliderStyleContainer>
            </div>
        </div>
    )
}
