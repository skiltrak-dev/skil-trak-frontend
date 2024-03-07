import { Typography } from '@components'
import { MediaQueries } from '@constants'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import { useMediaQuery } from 'react-responsive'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { TechnicalPartnerStyleContainer } from './styles'

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
            <div className="max-w-[1400px] mx-auto overflow-hidden flex flex-col md:flex-row items-center">
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
                    <div className="w-full items-center justify-between gap-y-12 md:gap-y-10 mx-auto">
                        <TechnicalPartnerStyleContainer>
                            <Marquee className="w-full py-5" speed={50}>
                                {images?.map((image, index) => (
                                    <div
                                        key={index}
                                        className="!flex !items-center !mr-0"
                                    >
                                        <div className="py-1.5 px-2.5 flex justify-center items-center min-w-[130px] max-w-[131px] h-16 shadow-[0px_4px_34px_0px_rgba(177,177,177,0.25)] rounded-[10px]">
                                            <Image
                                                key={index}
                                                className="w-full h-full object-contain"
                                                src={`/images/site/partners/${image?.image}`}
                                                width={0}
                                                height={0}
                                                sizes={'100vh 100vw'}
                                                alt="Partners"
                                            />
                                        </div>
                                        {index % 2 === 0 ? (
                                            <div className="w-24 h-full">
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
                                            <div className="w-24 h-full">
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
                                    </div>
                                ))}
                            </Marquee>
                        </TechnicalPartnerStyleContainer>
                        {/* <Swiper
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
                                    className="min-w-[120px] !flex !items-center !mr-0 "
                                >
                                    <Image
                                        key={index}
                                        className="w-[70%] h-full object-contain shadow-site rounded-[10px]"
                                        src={`/images/site/partners/${image?.image}`}
                                        width={0}
                                        height={0}
                                        sizes={'100vh 100vw'}
                                        alt="Partners"
                                    />

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
                        </Swiper> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
