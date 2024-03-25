import { Typography } from '@components/Typography'
import React from 'react'

export const SignerCard = ({ signer }: { signer: any }) => {
    return (
        <div className="w-1/4  border border-dashed rounded-[10px] border-secondary-dark bg-[#24556D0D] pt-3.5 pb-2.5 h-40 flex flex-col justify-between items-center">
            <Typography
                variant="xxs"
                color={'text-[#767F8C]'}
                center
                capitalize
            >
                {signer?.user?.role}
            </Typography>

            <div>
                <Typography
                    variant="small"
                    color="text-[#18191C]"
                    medium
                    center
                >
                    {signer?.user?.name}
                </Typography>
                <Typography variant="xxs" color="text-[#767F8C]" center>
                    {signer?.user?.email}
                </Typography>
            </div>

            <div>
                <Typography
                    variant="badge"
                    color="text-[#18191C]"
                    medium
                    center
                >
                    Sign Status
                </Typography>
                <Typography
                    variant="small"
                    color="text-[#FBA82A]"
                    bold
                    center
                    capitalize
                >
                    {signer?.status}
                </Typography>
            </div>

            {/*  */}
            <div>
                <Typography
                    variant="badge"
                    color="text-[#767F8C] block"
                    medium
                    center
                >
                    Dated
                </Typography>
                <Typography variant="small" color="text-[#18191C]" bold center>
                    Not Found
                </Typography>
            </div>
        </div>
    )
}
