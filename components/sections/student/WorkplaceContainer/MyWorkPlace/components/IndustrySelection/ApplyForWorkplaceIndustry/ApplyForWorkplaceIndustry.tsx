import React from 'react'
import { Typography, Button } from '@components'

// query
import { useApplyForWorkplaceMutation } from '@queries'

export const ApplyForWorkplaceIndustry = ({
    industry,
    appliedIndustry,
}: any) => {
    const [applyForWorkplace, applyForWorkplaceResult] =
        useApplyForWorkplaceMutation()

    return (
        <div className="bg-secondary-dark py-2 px-4 rounded-lg flex justify-between items-center">
            <div className="flex items-center gap-x-2">
                <img
                    className="w-12 h-12"
                    src={`https://picsum.photos/100/10${industry?.id}`}
                    alt=""
                />
                <div>
                    {/* <Typography variant={'muted'} color={'gray'}>
                        5km away
                    </Typography> */}
                    <Typography variant={'label'}>
                        {industry?.industry?.businessName}
                    </Typography>
                    <Typography variant={'muted'} color={'gray'}>
                        {industry?.industry?.addressLine1},{' '}
                        {industry?.industry?.addressLine2}
                    </Typography>
                </div>
            </div>
            <Button
                variant={'secondary'}
                text={'Apply Here'}
                disabled={applyForWorkplaceResult.isLoading || appliedIndustry}
                onClick={async () => {
                    await applyForWorkplace(industry?.id)
                }}
                loading={applyForWorkplaceResult.isLoading}
            />
        </div>
    )
}
