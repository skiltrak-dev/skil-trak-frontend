import React from 'react'
import { Typography, Button, ActionButton } from '@components'

// query
import { useApplyForWorkplaceMutation } from '@queries'

const BACKGROUNDS = [
    'bg-[#F7F1E3]',
    'bg-[#F7F1E3]/75',
    'bg-[#F7F1E3]/50',
    'bg-[#F7F1E3]/25',
]
export const ApplyForWorkplaceIndustry = ({
    industry,
    appliedIndustry,
    index,
}: any) => {
    const [applyForWorkplace, applyForWorkplaceResult] =
        useApplyForWorkplaceMutation()

    return (
        <div
            className={`${BACKGROUNDS[index]} p-2 rounded-lg flex justify-between items-center`}
        >
            <div className="flex items-center gap-x-2">
                <img
                    className="w-12 h-12 rounded-md"
                    src={`https://picsum.photos/100/10${industry?.id}`}
                    alt=""
                />
                <div>
                    {/* <Typography variant={'muted'} color={'gray'}>
                        5km away
                    </Typography> */}
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
