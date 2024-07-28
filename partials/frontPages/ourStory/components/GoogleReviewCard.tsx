import { Typography } from '@components'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { RiStarSFill } from 'react-icons/ri'
export const GoogleReviewCard = () => {
    return (
        <div
            
            className="bg-white shadow-xl rounded-lg flex flex-col gap-y-8 justify-center items-center p-8"
        >
            <div className="flex flex-col justify-center items-center gap-y-2">
                <FcGoogle size={30} />
                <div className="flex items-center justify-center gap-x-1">
                    <RiStarSFill size={25} className="text-yellow-400" />
                    <RiStarSFill size={25} className="text-yellow-400" />
                    <RiStarSFill size={25} className="text-yellow-400" />
                    <RiStarSFill size={25} className="text-yellow-400" />
                    <RiStarSFill size={25} className="text-yellow-400" />
                </div>
            </div>
            <div>
                <Typography variant="body" center>
                    From: Sophia Jenkins
                </Typography>
                <Typography variant="body" color="text-blue-400" center>
                    See it on Google
                </Typography>
            </div>
            <div>
                <Typography variant="small" center>
                    Et eligendi expedita. Accusantium qui est eius nemo eaque
                    dolore necessitatibus voluptatem. Ut accusamus provident
                    beatae dolorum amet. Omnis sapiente aut saepe aliquam
                    doloribus eaque. Iure sit sed animi molestiae impedit.
                </Typography>
            </div>
        </div>
    )
}
