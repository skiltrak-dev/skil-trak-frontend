import React, { useRef, useState } from 'react'
import { UpcomingAppointmentCard } from './UpcomingAppointmentCard'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SwiperContainer } from '@partials/notes/style'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'
import { HeroSliderContainer } from './style'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

export const FutureAppointments = ({ appointments }: { appointments: any }) => {
    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)
    const [iconClasses] = useState(
        'absolute top-1/2 -mt-2 z-10 cursor-pointer bg-white shadow-md rounded-full hover:scale-150 transition-all hover:opacity-100 w-5 h-5 flex justify-center items-center'
    )

    return (
        <HeroSliderContainer className="mt-4 relative">
            <div className="swiper-container w-full relative">
                <Swiper
                    breakpoints={{
                        300: {
                            width: 300,
                            slidesPerView: 1,
                        },
                        992: {
                            width: 992,
                            slidesPerView: 2,
                        },
                        1536: {
                            width: 1536,
                            slidesPerView: 3,
                        },
                    }}
                    // slidesPerView={2}
                    spaceBetween={10}
                    slidesPerGroup={1}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }}
                    onSwiper={(swiper: any) => {
                        // Delay execution for the refs to be defined
                        setTimeout(() => {
                            // Override prevEl & nextEl now that refs are defined
                            swiper.params.navigation.prevEl =
                                navigationPrevRef.current
                            swiper.params.navigation.nextEl =
                                navigationNextRef.current

                            // Re-init navigation
                            swiper.navigation.destroy()
                            swiper.navigation.init()
                            swiper.navigation.update()
                        })
                    }}
                    modules={[Navigation]}
                    className="mySwiper static"
                >
                    {appointments?.map((appointment: any, index: number) => {
                        const ap =
                            appointment?.appointmentFor[
                                appointment?.appointmentFor['role'] ===
                                'subadmin'
                                    ? appointment?.appointmentFor['role']
                                    : appointment?.appointmentFor
                                          ?.coordinator[0]
                            ]
                        return (
                            <SwiperSlide key={appointment.id}>
                                <UpcomingAppointmentCard
                                    key={index}
                                    date={appointment?.date}
                                    time={appointment?.startTime}
                                    totalMinutes={appointment?.type?.duration}
                                    address={`${ap?.addressLine1}, ${ap?.addressLine2}`}
                                    name={appointment?.appointmentFor?.name}
                                    imageUrl={
                                        '/images/card-images/video-icon.png'
                                    }
                                    type={appointment?.type?.title}
                                    role={appointment?.appointmentFor?.role}
                                />
                            </SwiperSlide>
                        )
                    })}
                    <div
                        ref={navigationPrevRef}
                        className={`${iconClasses} left-0 lg:-left-3`}
                    >
                        <MdKeyboardArrowLeft className="text-2xl text-info" />
                    </div>
                    <div
                        ref={navigationNextRef}
                        className={`${iconClasses} right-0 lg:-right-3`}
                    >
                        <MdKeyboardArrowRight className="text-2xl text-info" />
                    </div>
                </Swiper>
            </div>
        </HeroSliderContainer>
    )
}
