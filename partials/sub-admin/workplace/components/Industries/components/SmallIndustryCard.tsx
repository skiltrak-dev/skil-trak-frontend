import { Typography } from '@components/Typography'
import { ellipsisText } from '@utils'
import React from 'react'
import { BsDot } from 'react-icons/bs'

export const SmallIndustryCard = ({ industry }: any) => {
    return (
        <div className="w-fit bg-secondary py-1 px-2 rounded-lg flex justify-between items-center gap-x-2">
            <img
                className="w-6 h-6 rounded-full"
                src={`https://picsum.photos/100/100`}
                alt=""
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
