import { Typography } from '@components'
import React from 'react'
import { ServiceCardType } from './service.type'
import { useRouter } from 'next/router'

export const ServiceCard = ({ data }: { data: ServiceCardType }) => {
    const router = useRouter()
    return (
        <div
            className="rounded-[10px] w-full h-full"
            style={{
                background: `
        linear-gradient(
          rgba(0, 0, 0, 0.5), 
          rgba(0, 0, 0, 0.5)
        ), 
        url(${data?.image}) no-repeat
      `,
                backgroundSize: 'cover',
            }}
        >
            <div className="flex flex-col items-center justify-center h-full">
                <Typography center variant="label" semibold color="text-white">
                    {data?.title}
                </Typography>
                <Typography
                    center
                    variant="xxs"
                    underline
                    color="text-white"
                    cursorPointer
                >
                    <span
                        onClick={() => {
                            router.push(data?.link)
                        }}
                    >
                        {data?.linkText}
                    </span>
                </Typography>
            </div>
        </div>
    )
}
