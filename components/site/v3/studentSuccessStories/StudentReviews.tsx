import React from 'react'
import { Typography } from '@components/Typography'
import { InitialAvatar } from '@components/InitialAvatar'
import { ellipsisText } from '@utils'

const reviews = [
    {
        name: 'Preeti Arora',
        review: 'Great support by Sophia Flores from Skiltrak, she was able to locate a placement during the holiday period. I am very happy with the overall service provided.',
        rating: 5,
        link: 'https://g.co/kgs/wySbjGe',
    },
    {
        name: 'Allen Lahaylahay',
        review: `Layla Ballard has been incredibly helpful and respectful throughout the process of 
        arranging my work placement. She efficiently managed all the requirements she called to provide 
        updates, and today, she informed me that everything is set. I truly appreciate all her help—thank 
        God for her assistance.`,
        rating: 5,
        link: 'https://maps.app.goo.gl/Gr7oMkbB1CswFCGK9',
    },
    {
        name: 'Vikashni Mudaliar',
        review: 'Had a great Guidance from my coordinator Lucas. He made my work easier in guiding me on how I can complete my WBT sessions and even helped in understanding on how to fill my log books.Thank you Sir for your help.',
        rating: 5,
        link: 'https://maps.app.goo.gl/eDJjfCVBFf7EbsJV6',
    },
]

export const StudentReviews = () => {
    return (
        <div className="flex flex-col gap-y-4 md:gap-y-40 relative px-4 md:px-0">
            {reviews?.map((review, index) => (
                <div
                    key={index}
                    className={`rounded-xl ${
                        index === 1
                            ? 'bg-[#F7A619] md:absolute -left-20 top-[8.5rem]'
                            : 'bg-[#D9D9D9]'
                    } flex items-center p-5 gap-x-5 max-w-[580px]`}
                >
                    <div className="flex flex-col items-center justify-center">
                        <InitialAvatar name="Jimmy III" />
                        <Typography variant="label">{review?.name}</Typography>
                    </div>
                    <div className="bg-[linear-gradient(90deg,#D9D9D9_18.25%,#2E5793_43.75%,#D9D9D9_86.25%)] w-px h-10"></div>
                    <div className="" title={review?.review}>
                        <Typography variant="small">
                            {ellipsisText(review?.review, 200)}
                        </Typography>
                        <div className="flex justify-end">
                            Stars ({review?.rating})
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
