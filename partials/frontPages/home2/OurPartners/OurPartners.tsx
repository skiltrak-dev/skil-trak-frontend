import { Typography } from '@components'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import { useMediaQuery } from 'react-responsive'
import { OurPartnerStyleContainer } from './styles'
import Link from 'next/link'

const OurPartners = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 })
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 })

    const images = [
        {
            image: 'woolWorths.jpeg',
            width: 145,
            link: 'https://www.woolworths.com.au/',
        },
        {
            image: 'officeWorks.jpeg',
            width: 145,
            link: 'https://www.officeworks.com.au/',
        },
        {
            image: 'harrisScarfe.jpeg',
            width: 145,
            link: 'http://www.harrisscarfe.com.au/',
        },
        {
            image: 'harvey.jpeg',
            width: 145,
            link: 'http://www.harveynormanholdings.com.au/',
        },
        {
            image: 'multicap.png',
            width: 145,
            link: 'https://multicap.org.au/',
        },
        {
            image: 'bupa.png',
            width: 140,
            link: 'https://www.bupa.com.au/',
        },
        {
            image: 'opal-logo.svg',
            width: 100,
            link: 'https://www.opalhealthcare.com.au/',
        },
        {
            image: 'BlueCross.svg',
            width: 100,
            link: 'https://www.bluecross.com.au/',
        },
        {
            image: 'next.png',
            width: 100,
            link: 'https://www.nextt.com.au/',
        },
        {
            image: 'salvation.png',
            width: 100,
            link: 'https://www.salvationarmy.org.au/',
        },
    ]
    return (
        <div className="py-5 md:border-y  border-secondary-dark">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center overflow-hidden">
                <div className="px-9 py-3 md:border-r border-secondary-dark">
                    <Typography variant={isMobile ? 'title' : 'h2'}>
                        <span className="whitespace-pre">Our Partners</span>
                    </Typography>
                </div>
                <div className="px-9 w-full border-y md:border-y-0 py-4 md:py-0">
                    <div className="w-full items-center justify-between gap-y-12 md:gap-y-10 mx-auto">
                        <OurPartnerStyleContainer>
                            <Marquee className="w-full py-2" speed={35}>
                                {images?.map((image, index) => (
                                    <div
                                        key={index}
                                        className="!flex !items-center !mr-0"
                                    >
                                        <div className="py-1.5 px-2.5 flex justify-center mx-4 md:mx-0 items-center min-w-[130px] max-w-[131px] h-16 shadow-[0px_4px_34px_0px_rgba(177,177,177,0.25)] rounded-[10px]">
                                            <Link
                                                href={image?.link || '#'}
                                                className="w-full h-full"
                                            >
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
                                            </Link>
                                        </div>
                                        <div className="border border-dashed border-primary w-20 md:block hidden" />
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
