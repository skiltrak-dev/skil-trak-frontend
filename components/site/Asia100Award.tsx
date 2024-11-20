import { Typography } from '@components/Typography'
import Image from 'next/image'
import React from 'react'

export const Asia100Award = () => {
    return (
        <Image
            src={'/images/site/asiaLogoBg.png'}
            alt={'asiaLogoBg'}
            width={0}
            height={0}
            sizes="100vh 100vw"
            className="w-full"
        />
    )
    return (
        <div className="w-full h-[114px] bg-[url('/images/site/asiaLogoBg.png')] mt-7 mb-0 md:mb-20 ">
            <div className="max-w-[1280px] mx-auto h-full flex items-center gap-x-12 px-4">
                {/* Left side with image */}
                <div className="relative h-[149px] w-[149px] bg-black rounded-[10px]">
                    <img
                        src="/images/site/top100Asia.png"
                        alt="Logo"
                        className="absolute w-full h-full  bottom-0 object-cover"
                    />
                </div>

                {/* Right side text */}
                <div className="text-xl font-semibold">
                    <Typography variant="h4" color="text-white" normal>
                        Victoria Top 100 innovation Business Leader Award to
                        SkilTrak in the Category of
                    </Typography>
                    <Typography variant="h4" color="text-white" bold>
                        Digital Transformation Innovation!
                    </Typography>
                </div>
            </div>
        </div>
    )
}
