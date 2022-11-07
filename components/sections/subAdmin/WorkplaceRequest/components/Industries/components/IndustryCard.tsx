import { Typography } from '@components/Typography'
import React from 'react'
import { BsDot } from 'react-icons/bs'

// query
import { useApplyForWorkplaceMutation } from '@queries'

export const IndustryCard = ({ industry }: any) => {
    const [applyForWorkplace, applyForWorkplaceResult] =
        useApplyForWorkplaceMutation()
    return (
        <div className="bg-secondary py-1 px-2 rounded-lg flex justify-between items-center">
            <div className="flex items-center gap-x-2">
                <img
                    className="w-6 h-6 rounded-full"
                    src={`https://picsum.photos/100/${industry.id}`}
                    alt=""
                />
                <div>
                    <div className="flex items-center gap-x-0.5">
                        <Typography variant={'label'}>
                            {industry?.industry?.businessName}
                        </Typography>
                        <BsDot />
                        <Typography variant={'xs'} color={'text-gray-400'}>
                            5km away
                        </Typography>
                    </div>
                    <Typography variant={'muted'} color={'gray'}>
                        {industry?.industry?.addressLine1},{' '}
                        {industry?.industry?.addressLine2}
                    </Typography>
                </div>
            </div>

            {!industry.industryResponse && industry.applied ? (
                <Typography variant={'xs'} color={'text-red-800'} center>
                    APPLIED
                </Typography>
            ) : industry.industryResponse &&
              !industry.applied &&
              industry.industryResponse === 'noResponse' ? (
                <Typography variant={'xs'} color={'text-red-500'} center>
                    No Response
                </Typography>
            ) : (
                <Typography variant={'xs'} color={'text-red-800'} center>
                    <span
                        className="cursor-pointer"
                        onClick={() => {
                            applyForWorkplace(industry?.industry?.id)
                        }}
                    >
                        APPLY HERE
                    </span>
                </Typography>
            )}
        </div>
    )
}
