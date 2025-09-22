import { InitialAvatar } from '@components/InitialAvatar'
import { Typography } from '@components/Typography'
import React from 'react'

    const reviews = [
        {
            name: "Jimmy III Lacandazo",
            review: `I just want to say a huge thank you to Ryan, or as I like to call him, my brother, for all his incredible help and support with my work placement in aged care. From day one, he was patient, approachable, and genuinely cared about helping me succeed.`,
            rating: 5
        
        },
        {
            name: "Jimmy III Lacandazo",
            review: `I just want to say a huge thank you to Ryan, or as I like to call him, my brother, for all his incredible help and support with my work placement in aged care. From day one, he was patient, approachable, and genuinely cared about helping me succeed.`,
            rating: 4.5
        },{
            name: "Jimmy III Lacandazo",
            review: `I just want to say a huge thank you to Ryan, or as I like to call him, my brother, for all his incredible help and support with my work placement in aged care. From day one, he was patient, approachable, and genuinely cared about helping me succeed.`,
            rating: 4.5
        }
    ]

export const StudentReviews = () => {
  return (
    <div className='flex flex-col gap-y-40 relative'>
        {reviews?.map((review, index)=>(

        <div className={`rounded-xl ${index === 1 ? "bg-[#F7A619] absolute -left-20 top-36" : "bg-[#D9D9D9]"} flex items-center p-5 gap-x-5 max-w-[580px]`}>
            <div className="flex flex-col items-center justify-center">
                <InitialAvatar name='Jimmy III' />
                <Typography variant='label'>{review?.name}</Typography>
            </div>
            <div className="bg-[linear-gradient(90deg,#D9D9D9_18.25%,#2E5793_43.75%,#D9D9D9_86.25%)] w-px h-10"></div>
            <div className="">
                <Typography variant='small'>
                    {review?.review}
                </Typography>
                <div className="flex justify-end">Stars ({review?.rating})</div>
            </div>
        </div>
        ))}
        
    </div>
  )
}
