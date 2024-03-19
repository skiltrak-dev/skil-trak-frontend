import { Typography } from '@components'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import { useMediaQuery } from 'react-responsive'
import { OurPartnerStyleContainer } from './styles'

const OurPartners = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 })
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 })

    const images = [
        {
            image: 'multicap.png',
            width: 145,
        },
        {
            image: 'bupa.png',
            width: 140,
        },
        {
            image: 'opal-logo.svg',
            width: 100,
        },
        {
            image: 'BlueCross.svg',
            width: 100,
        },
        {
            image: 'next.png',
            width: 100,
        },
        {
            image: 'salvation.png',
            width: 100,
        },
    ]
    return (
        <div className="py-5 md:border-y  border-secondary-dark">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center overflow-hidden">
                <div
                    className="px-9 py-3 md:border-r border-secondary-dark"
                    data-aos="fade-right"
                >
                    <Typography variant={isMobile ? 'title' : 'h2'}>
                        <span className="whitespace-pre">Our Partners</span>
                    </Typography>
                </div>
                <div
                    data-aos="fade-left"
                    className="px-9 w-full border-y md:border-y-0 py-4 md:py-0"
                >
                    <div className="w-full items-center justify-between gap-y-12 md:gap-y-10 mx-auto">
                        <OurPartnerStyleContainer>
                            <Marquee className="w-full py-2" speed={35}>
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
                                                priority
                                            />
                                        </div>
                                        <div className="border border-dashed border-primary w-20" />
                                    </div>
                                ))}
                            </Marquee>
                        </OurPartnerStyleContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurPartners
