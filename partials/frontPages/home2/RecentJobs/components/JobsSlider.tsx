import { CommonApi } from '@queries'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { JobCard } from '../cards'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { Navigation } from 'swiper/modules'
import { LoadingAnimation, NoData } from '@components'
import { Waypoint } from 'react-waypoint'

// import required modules

export const JobsSlider = () => {
    const [jobsView, setJobsView] = useState<boolean>(false)
    const jobs = CommonApi.Industries.getAllAdvertisedJobs(
        {},
        {
            skip: !jobsView,
        }
    )

    const slides =
        jobs?.data?.data && jobs?.data?.data?.length > 0
            ? jobs?.data?.data?.length < 3
                ? [
                      ...jobs?.data?.data,
                      ...jobs?.data?.data,
                      ...jobs?.data?.data,
                  ]
                : [...jobs?.data?.data]
            : []

    // const handleSlideChange = (direction) => {
    //     const newSlide =
    //         direction === 'up' ? currentSlide - 1 : currentSlide + 1
    //     setCurrentSlide(Math.max(0, Math.min(slides.length - 1, newSlide)))
    // }

    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)

    const [activeIndex, setActiveIndex] = useState(0)

    const autoSlideInterval = useRef<any>(null)

    const handleNext = () => {
        setActiveIndex((prevIndex) =>
            prevIndex < slides.length - 1 ? prevIndex + 1 : 0
        )
    }

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : slides.length - 1
        )
    }

    const startAutoSlide = () => {
        autoSlideInterval.current = setInterval(() => {
            handleNext()
        }, 5000)
    }

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval.current)
    }

    useEffect(() => {
        startAutoSlide()

        return () => {
            stopAutoSlide()
        }
    }, [activeIndex])

    const onEnterWaypoint = () => setJobsView(true)
    const onLeaveWaypoint = () => setJobsView(false)

    return (
        <Waypoint
            onEnter={() => {
                onEnterWaypoint()
            }}
            onLeave={() => {
                onLeaveWaypoint()
            }}
        >
            <div className={'h-full'}>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-full h-[380px] md:h-72 overflow-y-hidden px-2">
                        <div className="relative w-full h-auto md:h-56">
                            {jobs?.isError ? (
                                <NoData text="There is some technical issue here" />
                            ) : null}
                            {jobs?.isLoading ? (
                                <LoadingAnimation size={70} />
                            ) : slides && slides?.length > 0 ? (
                                slides?.map((slide: any, index: number) => (
                                    <div
                                        key={index}
                                        className={`py-2 h-auto md:h-full w-full absolute mx-auto transition-transform duration-500 transform ${
                                            index === activeIndex
                                                ? 'translate-y-0'
                                                : ''
                                        }`}
                                        style={{
                                            transform:
                                                index === 0
                                                    ? `translateY(${
                                                          activeIndex * 35
                                                      }px) `
                                                    : index !== activeIndex
                                                    ? `translateY(${
                                                          index * 35
                                                      }px) `
                                                    : '',
                                            left:
                                                index === 0
                                                    ? `${activeIndex * 15}px`
                                                    : index !== activeIndex
                                                    ? `${index * 15}px`
                                                    : '',
                                            zIndex:
                                                index === 0
                                                    ? `-${activeIndex}`
                                                    : index !== activeIndex
                                                    ? `-${index}`
                                                    : '',
                                            width:
                                                index === 0
                                                    ? `calc(100% - ${
                                                          activeIndex * 30
                                                      }px)`
                                                    : index !== activeIndex
                                                    ? `calc(100% - ${
                                                          index * 30
                                                      }px)`
                                                    : '100%',
                                        }}
                                    >
                                        <JobCard
                                            job={slide}
                                            active={index === activeIndex}
                                            index={index}
                                        />
                                    </div>
                                ))
                            ) : (
                                jobs?.isSuccess && (
                                    <NoData text="There is no recent jobs here!" />
                                )
                            )}
                        </div>
                    </div>

                    {jobs?.isSuccess && slides && slides?.length > 0 ? (
                        <div className="flex md:flex-col gap-4">
                            <div
                                ref={navigationPrevRef}
                                onClick={handlePrev}
                                className={`cursor-pointer group min-w-[28px] flex justify-center items-center min-h-[28px] hover:bg-primary rounded-md shadow transition-all bg-white md:rotate-90 left-0 lg:-left-3`}
                            >
                                <MdKeyboardArrowLeft className="text-2xl text-info group-hover:text-white" />
                            </div>
                            <div
                                ref={navigationNextRef}
                                onClick={handleNext}
                                className={`cursor-pointer group min-w-[28px] flex justify-center items-center min-h-[28px] hover:bg-primary transition-all rounded-md shadow bg-white right-0 lg:-right-3 md:rotate-90`}
                            >
                                <MdKeyboardArrowRight className="text-2xl text-info group-hover:text-white" />
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </Waypoint>
    )
}
