import { Typography } from '@components'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { RiStarSFill } from 'react-icons/ri'
import StarRatings from 'react-star-ratings'
export const GoogleReviewCard = ({ review, name, rating, link }: any) => {
    return (
        <div className="bg-white shadow-xl rounded-lg flex flex-col max-h-72 gap-y-6 justify-center m-2 items-center p-8">
            <div className="flex flex-col justify-center items-center gap-y-2">
                <FcGoogle size={35} />
                <div className="flex items-center justify-center gap-x-1">
                    <StarRatings
                        rating={rating}
                        starRatedColor="orange"
                        numberOfStars={5}
                        name="rating"
                        starDimension="20px"
                        starSpacing="1px"
                    />
                </div>
            </div>
            <div>
                <Typography
                    variant="body"
                    color="text-primaryNew"
                    semibold
                    center
                >
                    {name}
                </Typography>
                <a href={`${link}`} target="_blank" rel="noreferrer">
                    <Typography variant="body" color="text-link" center>
                        See it on Google
                    </Typography>
                </a>
            </div>
            <div>
                <Typography variant="small" center>
                    {review}
                </Typography>
            </div>
        </div>
    )
}
