import { Button, Typography } from '@components'
import { MediaQueries } from '@constants'
import React from 'react'
import { useMediaQuery } from 'react-responsive'

export const EmploymentHubCard = ({
    employment,
    lastIndex,
}: {
    lastIndex: boolean
    employment?: any
}) => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    return (
        <div
            className={`pt-7 ${
                lastIndex ? 'pb-12' : 'pb-24'
            } h-auto md:h-56 px-2 md:px-14 ${
                employment?.bgColor
            } rounded-t-[60px]`}
        >
            <div className="flex flex-col gap-y-3">
                <Typography
                    variant={isMobile ? 'label' : 'h4'}
                    color={employment?.dark ? 'text-white' : 'text-[#25566b]'}
                    center
                    bold
                >
                    {employment?.title}
                </Typography>

                <Typography
                    variant={isMobile ? 'small' : 'label'}
                    color={
                        employment?.dark
                            ? 'text-white block'
                            : 'text-[#56585A] block'
                    }
                    center
                >
                    {employment?.description}
                </Typography>
                {lastIndex ? (
                    <div className="flex justify-center items-center pt-8">
                        <Button text={'Get Started Today'} />
                    </div>
                ) : null}
            </div>
        </div>
    )
}
