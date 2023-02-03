import { InitialAvatar } from '@components'
import { Typography } from '@components/Typography'
import { ellipsisText } from '@utils'
import React from 'react'
import { BsDot } from 'react-icons/bs'

export const SmallIndustryCard = ({ industry }: any) => {
    return (
        <div className="w-fit bg-secondary py-1 px-2 rounded-lg flex justify-between items-center gap-x-2">
            <InitialAvatar
                name={industry?.industry?.user?.name}
                imageUrl={industry?.industry?.user?.avatar}
                small
            />
            <div className="flex items-center gap-x-0.5">
                <Typography variant={'label'}>
                    {ellipsisText(industry?.industry?.user?.name, 10)}
                </Typography>
                <BsDot />
                <Typography variant={'badge'} color={'text-gray-400'}>
                    5km away
                </Typography>
            </div>
        </div>
    )
}
