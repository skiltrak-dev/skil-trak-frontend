import { Typography } from '@components'
import { MediaQueries } from '@constants'
import React, { ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'

export const WorkBaseInfoCardData = ({
    title,
    children,
}: {
    title: string
    children: ReactNode[]
}) => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    return (
        <div className="flex flex-col gap-y-3.5">
            <Typography
                variant={isMobile ? 'subtitle' : 'h4'}
                color="text-[#25566B]"
                bold
            >
                {title}
            </Typography>
            <div className="flex flex-col gap-y-3.5">
                {children?.map((child: any, i: number) => (
                    <Typography
                        key={i}
                        variant="small"
                        medium
                        color="text-[#56585a]"
                    >
                        {child}
                    </Typography>
                ))}
            </div>
        </div>
    )
}
