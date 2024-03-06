import { Typography } from '@components'
import React from 'react'

export const EmploymentHubCard = ({
    employment,
    lastIndex,
}: {
    lastIndex: boolean
    employment?: any
}) => {
    console.log({ employment: employment?.description })

    const description = employment?.description

    return (
        <div
            className={`pt-7 ${lastIndex ? 'pb-12' : 'pb-24'}  px-14 ${
                employment?.bgColor
            } rounded-t-[60px]`}
        >
            <div className="flex flex-col gap-y-3">
                <Typography
                    variant="h4"
                    color={employment?.dark ? 'text-white' : 'text-[#25566b]'}
                    center
                >
                    {employment?.title}
                </Typography>
                {description && (
                    <Typography
                        variant={'label'}
                        color={
                            employment?.dark
                                ? 'text-white block'
                                : 'text-[#56585A] block'
                        }
                        center
                    >
                        At SkilTrak, we are committed to helping industries
                        seeking talented professionals and qualified individuals
                        ready to set out on their professional pathways. Our new
                        Employment Hub serves as a dynamic platform where
                        registered industries can seamlessly post advertisements
                        for their vacant positions, while prospective candidates
                        who have completed their placements through us gain
                        exclusive access to these opportunities.
                    </Typography>
                )}
            </div>
        </div>
    )
}
