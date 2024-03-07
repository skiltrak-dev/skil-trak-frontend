import { Typography } from '@components'
import { MediaQueries } from '@constants'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export const TechnicalPartners = () => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    const images = [
        {
            image: 'google.png',
            width: 145,
        },
        {
            image: 'stripe.png',
            width: 140,
        },
        {
            image: 'zoom.png',
            width: 100,
        },
    ]
    return (
        <div className="border-y border-secondary-dark">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center">
                <div
                    data-aos="fade-right"
                    className="px-9 py-5 md:py-3 md:border-r border-secondary-dark"
                >
                    <Typography variant={isMobile ? 'title' : 'h2'}>
                        <span className="whitespace-pre">
                            Our Technical Partners
                        </span>
                    </Typography>
                </div>
                <div
                    // data-aos="fade-left"
                    className="py-5 md:py-0 px-9 w-full border-y md:border-y-0"
                >
                    <div className="w-full  items-center justify-between gap-y-12 md:gap-y-10 mx-auto">
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 1500,
                                disableOnInteraction: false,
                            }}
                            speed={2000}
                            slidesPerView={3}
                            modules={[Autoplay]}
                            className="mySwiper"
                            loop
                        >
                            {images?.map((image, index) => (
                                <SwiperSlide
                                    key={index}
                                    className="min-w-[120px] !flex !items-center !mr-0"
                                >
                                    {/* <div className="py-1.5 px-2.5 flex justify-center items-center min-w-[130px] h-16 shadow-[0px_4px_34px_0px_rgba(177,177,177,0.25)] rounded-[10px]"> */}
                                    {/* <div className="min-w-[200px]"> */}
                                    <Image
                                        key={index}
                                        className="w-[70%] h-full object-contain"
                                        src={`/images/site/partners/${image?.image}`}
                                        width={0}
                                        height={0}
                                        sizes={'100vh 100vw'}
                                        alt="Partners"
                                    />
                                    {/* </div> */}
                                    {/* </div> */}
                                    {index % 2 === 0 ? (
                                        <div className="w-[50%] h-full">
                                            <Image
                                                key={index}
                                                className="min-w-[100%] h-full object-contain"
                                                src={`/images/site/technicalPartnersLeft.png`}
                                                width={0}
                                                height={0}
                                                sizes={'100vh 100vw'}
                                                alt="Partners"
                                            />
                                        </div>
                                    ) : null}
                                    {index % 2 === 1 ? (
                                        <div className="w-[50%] h-full">
                                            <Image
                                                key={index}
                                                className="min-w-[100%] h-full object-contain"
                                                src={`/images/site/technicalPartnersRight.png`}
                                                width={0}
                                                height={0}
                                                sizes={'100vh 100vw'}
                                                alt="Partners"
                                            />
                                        </div>
                                    ) : null}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}
