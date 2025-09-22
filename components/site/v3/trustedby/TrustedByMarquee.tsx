'use client'

import Image from 'next/image'
import Marquee from 'react-fast-marquee'

const logos = [
    {
        src: '/images/site/home-page-v3/trustedby/hader-logo.png',
        alt: 'Hader Institute of Education',
    },
    {
        src: '/images/site/home-page-v3/trustedby/alffie-logo.png',
        alt: 'Alffie',
    },
    {
        src: '/images/site/home-page-v3/trustedby/open-colleges-logo.png',
        alt: 'Open Colleges',
    },
    // ➕ Add more here...
]

// Dot separator generator
const DotSeparator = ({ count }: { count: number }) => {
    return (
        <div className="flex gap-2 mx-6">
            {Array.from({ length: count }).map((_, i) => (
                <span
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#044866]"
                ></span>
            ))}
        </div>
    )
}

export const TrustedByMarquee = () => {
    return (
        <section className="pb-4 bg-white">
            {/* Heading */}
            <div className="flex justify-end items-center gap-x-4 mb-4">
                <h2 className="text-center text-[#044866] text-lg md:text-xl font-medium">
                    Trusted By Leading Organizations
                </h2>
                <div className="bg-[linear-gradient(90deg,#E1E1E1_0%,#044866_100%)] w-[652px] h-0.5"></div>
            </div>

            {/* Marquee */}
            <Marquee
                gradient={false}
                speed={40}
                pauseOnHover
                className="flex items-center"
            >
                {/* Left side dots */}
                <DotSeparator count={3} />

                {logos.map((logo, index) => (
                    <div key={index} className="flex items-center">
                        <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={125}
                            height={42}
                            className="object-contain"
                        />

                        {/* Separator dots */}
                        {index < logos.length - 1 && <DotSeparator count={9} />}
                    </div>
                ))}

                {/* Right side dots */}
                <DotSeparator count={3} />
            </Marquee>
        </section>
    )
}
