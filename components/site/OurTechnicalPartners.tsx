import { Typography } from '@components/Typography'
import Image from 'next/image'

export const OurTechnicalPartners = () => {
    return (
        <div className="md:px-[140px] md:py-[72px] px-4 py-8">
            <div className="mb-8 flex justify-center items-center text-center">
                <Typography variant="h1">Our Technical Partners</Typography>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center md:gap-x-24 gap-y-8 mx-auto max-w-7xl">
                <div>
                    <Image
                        src="/images/site/partners/logos_google.svg"
                        width={150}
                        height={60}
                        alt="Our Technical Partners"
                        sizes="100vw"
                    />
                </div>
                <div>
                    <Image
                        src="/images/site/partners/logos_stripe.svg"
                        width={150}
                        height={60}
                        alt="Our Technical Partners"
                        sizes="100vw"
                    />
                </div>
                <div>
                    <Image
                        src="/images/site/partners/logos_zoom.svg"
                        width={150}
                        height={60}
                        alt="Our Technical Partners"
                        sizes="100vw"
                    />
                </div>
            </div>
        </div>
    )
}
