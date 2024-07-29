import { Typography } from '@components'
import React from 'react'
import Marquee from 'react-fast-marquee'

export const ServiceCard = ({ data }: { data: any }) => {
    return (
        <div className={`${data?.bgColor} py-2`}>
            <Marquee
                className="w-full py-2 flex items-center gap-x-9"
                direction={data?.direction}
                speed={35}
            >
                {[...Array(10)].map((_, index: any) => (
                    <div key={index} className="flex items-center">
                        <Typography
                            variant="body"
                            semibold
                            color="text-white"
                            center
                            uppercase
                        >
                            {data?.text}
                        </Typography>
                        <div className="w-[2px] h-9 bg-white mx-9"></div>
                    </div>
                ))}
            </Marquee>
        </div>
    )
}
