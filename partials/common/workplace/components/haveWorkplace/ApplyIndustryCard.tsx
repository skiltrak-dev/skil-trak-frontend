import React, { useEffect } from 'react'
import { Typography, Button } from '@components'

// query
import { useApplyWorkplaceWithAbnIndustryMutation } from '@queries'

export const ApplyIndustryCard = ({
    industry,
    setActive,
    setWorkplaceData,
}: any) => {
    const [applyForWorkplace, applyForWorkplaceResult] =
        useApplyWorkplaceWithAbnIndustryMutation()

    useEffect(() => {
        if (applyForWorkplaceResult.isSuccess) {
            setWorkplaceData(applyForWorkplaceResult?.data?.workplaceRequest)
            setActive((active: number) => active + 1)
        }
    }, [applyForWorkplaceResult])

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
                        {industry?.businessName}
                    </Typography>
                    <Typography variant={'muted'} color={'gray'}>
                        {industry?.addressLine1}, {industry?.addressLine2}
                    </Typography>
                </div>
            </div>
            <Button
                variant={'secondary'}
                text={'Apply Here'}
                // disabled={industries?.map((i: any) => i.applied).includes(true)}
                onClick={async () => {
                    await applyForWorkplace(industry?.id)
                }}
                loading={applyForWorkplaceResult.isLoading}
            />
        </div>
    )
}
