import { Typography } from '@components/Typography'
import Image from 'next/image'

export const OurPartners = () => {
    return (
        <div className="py-8 md:py-[72px] md:px-[140px] px-4">
            {/* <div className="max-w-7xl mx-auto"> */}
            <div className="mb-8 flex justify-center">
                <Typography variant="h2">Our Partners</Typography>
            </div>
            <div className="grid grid-cols-2 items-center md:gap-x-3 md:grid-cols-4 gap-y-12 gap-x-12 md:gap-y-10 mx-auto max-w-7xl">
                <Image
                    className=""
                    src="/images/site/partners/pv-2.png"
                    sizes={'100vw'}
                    width={160}
                    height={100}
                    alt="Partners"
                />

                <Image
                    className=""
                    src="/images/site/partners/pv-1.png"
                    sizes={'100vw'}
                    width={160}
                    height={100}
                    alt="Partners"
                />
                <Image
                    className=""
                    src="/images/site/partners/pv-6.png"
                    sizes={'100vw'}
                    width={160}
                    height={100}
                    alt="Partners"
                />
                <Image
                    className=""
                    src="/images/site/partners/pv-7.webp"
                    sizes={'100vw'}
                    width={160}
                    height={100}
                    alt="Partners"
                />
                <Image
                    className=""
                    src="/images/site/partners/pv-9.png"
                    sizes={'100vw'}
                    width={160}
                    height={100}
                    alt="Partners"
                />

                <Image
                    className=""
                    src="/images/site/partners/pv-4.png"
                    sizes={'100vw'}
                    width={160}
                    height={100}
                    alt="Partners"
                />
                <Image
                    className=""
                    src="/images/site/partners/pv-5.png"
                    sizes={'100vw'}
                    width={160}
                    height={100}
                    alt="Partners"
                />
                <Image
                    className=""
                    src="/images/site/partners/pv-3.png"
                    sizes={'100vw'}
                    width={160}
                    height={100}
                    alt="Partners"
                />
            </div>
        </div>
    )
}
