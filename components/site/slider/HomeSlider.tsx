import Image from 'next/image'
import { A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { FeatureSlider } from './FeatureSlider'
import { SlideContent } from './SlideContent'

export const HomeSlider = () => {
    return (
        <div className="relative">
            <Swiper
                // install Swiper modules
                modules={[A11y, Autoplay]}
                loop
                autoplay={{ delay: 5000 }}
            >
                <SwiperSlide>
                    <div className="w-full relative">
                        <Image
                            className="object-cover w-full h-[calc(90vh-66px)]"
                            src={'/images/site/slides/img_0.jpg'}
                            alt=""
                            width={0}
                            height={0}
                            sizes={'100vw'}
                        />
                        <SlideContent
                            title={
                                'SkilTrak is here when you need it the most!'
                            }
                            description={`We have knowledgeable and friendly professionals available to
              schedule an appointment or answer any questions you may have in
              relation to Work Placement. Call us today!`}
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="w-full relative ">
                        <Image
                            className="object-cover w-full h-[calc(90vh-66px)]"
                            src={'/images/site/slides/img_2.jpg'}
                            alt=""
                            width={0}
                            height={0}
                            sizes={'100vw'}
                        />
                        <SlideContent
                            title={
                                'Are you a student with no Industry Experience? Don’t worry!'
                            }
                            description={` We build your confidence right from the start of your student’s
            journey and prepare you for the industry with our Interview
            Tutoring Program.`}
                        />
                    </div>
                </SwiperSlide>
            </Swiper>

            <div className="absolute sm:static lg:absolute bottom-0 w-full">
                <FeatureSlider />
            </div>
        </div>
    )
}
