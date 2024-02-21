import { Typography } from '@components/Typography'
import Image from 'next/image'

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
]

export const OurPartners = () => {
    return (
        <div className="py-8 md:py-[72px] md:px-[140px] px-4">
            {/* <div className="max-w-7xl mx-auto"> */}
            <div className="mb-8 flex justify-center">
                <Typography variant="h2">Our Partners</Typography>
            </div>
            <div className="grid grid-cols-2 items-center md:gap-x-3 md:grid-cols-4 gap-y-12 gap-x-12 md:gap-y-10 mx-auto max-w-7xl">
                {images?.map((image, index) => (
                    <Image
                        key={index}
                        className=""
                        src={`/images/site/partners/${image?.image}`}
                        sizes={'100vw'}
                        width={image?.width}
                        height={100}
                        alt="Partners"
                    />
                ))}
            </div>
        </div>
    )
}
