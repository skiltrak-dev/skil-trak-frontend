import { Button, Typography } from '@components'
import Image from 'next/image'
import React from 'react'
import { OurServicesProps } from '../OurServices'
import { useMediaQuery } from 'react-responsive'
import { MediaQueries } from '@constants'
import { useRouter } from 'next/router'

export const ServiceCard = ({ service }: { service: OurServicesProps }) => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    const router = useRouter()

    return (
        <div className="shadow-site bg-white p-6 rounded-[10px] flex justify-between items-center">
            <div className="flex items-center gap-x-2.5 md:gap-x-5">
                <Image
                    src={`/images/site/services/${service.image}`}
                    alt={''}
                    width={isMobile ? 25 : 35}
                    height={isMobile ? 25 : 35}
                />
                <Typography normal>
                    <span className="text-[13px] md:text-base xl:text-xl leading-[1px]">
                        {service.text}
                    </span>
                </Typography>
            </div>
            <div>
                <Button
                    onClick={() => {
                        router.push(`/our-services/${service?.link}`)
                    }}
                >
                    <span className="whitespace-pre">View More</span>
                </Button>
            </div>
        </div>
    )
}
