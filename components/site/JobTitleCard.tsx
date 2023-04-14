import { Typography } from '@components/Typography'
import React from 'react'

type Props = {
    onClick: Function
    title:string
}

export const JobTitleCard = ({
    onClick,
    title
}: Props) => {
    return (
        <>
            <div className='bg-gray-200 rounded-2xl px-16 py-10 text-center'>
                <div>
                    <Typography variant="title">{title}</Typography>
                </div>
                <div className='cursor-pointer' onClick={()=>{onClick()}}>
                    <Typography variant="muted" color='text-orange-300'>View More</Typography>
                </div>
            </div>
        </>
    )
}
