import Link from 'next/link'
import Image from 'next/image'
import { Typography } from '@components'
import Marquee from 'react-fast-marquee'
import { useMediaQuery } from 'react-responsive'
import { OurPartnerStyleContainer } from '@partials/frontPages/home2/OurPartners/styles'

export const OurTrustedPartner = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 })
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 })

    const images = [
        {
            image: 'abt.svg',
            width: 145,
            link: 'https://aibtglobal.edu.au/',
            className: 'bg-gray-400',
        },
        {
            image: 'altec.png',
            width: 140,
            link: 'https://www.altec.edu.au/',
        },
        {
            image: 'gmc.png',
            width: 100,
            link: 'https://getmycourse.com.au/',
        },
        {
            image: 'hader-institute.svg',
            width: 100,
            link: 'https://www.haderinstitute.edu.au/',
        },
        {
            image: 'ithea.png',
            width: 100,
            link: 'https://ithea.vic.edu.au/',
        },
        {
            image: 'jti.svg',
            width: 100,
            link: 'https://jti.edu.au/',
        },
        {
            image: 'ntca.png',
            width: 100,
            link: 'https://www.ntca.edu.au/',
        },
        {
            image: 'hillshire.jpg',
            width: 100,
            link: 'https://hillshire.edu.au/',
        },
    ]
    return (
        <div className="py-5 md:border-y border-secondary-dark">
            <div className="max-w-[1100px] flex flex-col-reverse xl:flex-row items-center">
                <div className="px-9 w-full border-y md:border-y-0 py-4 md:py-0">
                    <div className="w-full items-center justify-between gap-y-12 md:gap-y-10 mx-auto">
                        <OurPartnerStyleContainer>
                            <Marquee
                                className="w-full py-2"
                                speed={35}
                                direction="right"
                            >
                                {images?.map((image, index) => (
                                    <div
                                        key={index}
                                        className="!flex !items-center !mr-0"
                                    >
                                        <div
                                            className={`${image?.className}  py-1.5 px-2.5 flex justify-center gap-x-12 mx-4 md:mx-0 items-center min-w-[130px] max-w-[131px] h-16 shadow-[0px_4px_34px_0px_rgba(177,177,177,0.25)] rounded-[10px]`}
                                        >
                                            <Link
                                                href={image?.link || '#'}
                                                className="w-full h-full"
                                                target="_blank"
                                            >
                                                {' '}
                                                <Image
                                                    key={index}
                                                    className="w-full h-full object-contain"
                                                    src={`/images/our-story/trusted-partner/${image?.image}`}
                                                    width={0}
                                                    height={0}
                                                    sizes={'100vh 100vw'}
                                                    alt="Partners"
                                                    priority
                                                />{' '}
                                            </Link>
                                        </div>
                                        <div className="border border-dashed border-primary w-20 md:block hidden" />
                                    </div>
                                ))}
                            </Marquee>
                        </OurPartnerStyleContainer>
                    </div>
                </div>
                <div className="px-9 py-3 md:border-l border-secondary-dark">
                    <Typography variant={isMobile ? 'title' : 'h2'}>
                        <span className="whitespace-pre">
                            Our Trusted Partners
                        </span>
                    </Typography>
                </div>
            </div>
        </div>
    )
}
