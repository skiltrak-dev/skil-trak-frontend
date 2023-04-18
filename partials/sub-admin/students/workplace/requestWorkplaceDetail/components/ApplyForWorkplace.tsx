import React from 'react'
import { Typography, Button, ActionButton, InitialAvatar } from '@components'

// query
import { useSubAdminRequestIndustryWorkplaceMutation } from '@queries'

const BACKGROUNDS = [
    'bg-[#F7F1E3]',
    'bg-[#F7F1E3]/75',
    'bg-[#F7F1E3]/50',
    'bg-[#F7F1E3]/25',
]
export const ApplyForWorkplace = ({
    industry,
    appliedIndustry,
    index,
}: any) => {
    const [applyForWorkplace, applyForWorkplaceResult] =
        useSubAdminRequestIndustryWorkplaceMutation()

    return (
        <div
            className={`${BACKGROUNDS[index]} p-2 rounded-lg flex justify-between items-center`}
        >
            <div className="flex items-center gap-x-2 px-3">
                <InitialAvatar
                    name={industry?.industry?.user?.name}
                    imageUrl={industry?.industry?.user?.avatar}
                    large
                />
                <div>
                    <Typography variant={'muted'} color={'text-gray-500'}>
                        {Number(industry?.distance)?.toFixed(2)} km Away
                    </Typography>
                    <p className="font-semibold text-sm">
                        {industry?.industry?.user?.name}
                    </p>
                    <p className="font-medium text-xs text-gray-500">
                        {industry?.industry?.addressLine1},{' '}
                        {industry?.industry?.addressLine2}
                    </p>
                </div>
            </div>
            <ActionButton
                variant="success"
                disabled={applyForWorkplaceResult.isLoading || appliedIndustry}
                onClick={async () => {
                    await applyForWorkplace(industry?.id)
                }}
                loading={applyForWorkplaceResult.isLoading}
            >
                Apply Here
            </ActionButton>
        </div>
    )
}
