import React from 'react'
import {
    Typography,
    Button,
    ActionButton,
    ShowErrorNotifications,
    InitialAvatar,
} from '@components'

// query
import { useApplyForWorkplaceMutation } from '@queries'

const BACKGROUNDS = [
    'bg-[#F7F1E3]',
    'bg-[#F7F1E3]/75',
    'bg-[#F7F1E3]/50',
    'bg-[#F7F1E3]/25',
]
export const ApplyForWorkplace = ({
    index,
    industry,
    appliedIndustry,
}: any) => {
    const [applyForWorkplace, applyForWorkplaceResult] =
        useApplyForWorkplaceMutation()

    return (
        <>
            <ShowErrorNotifications result={applyForWorkplaceResult} />
            <div
                className={`${BACKGROUNDS[index]} p-2 px-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-y-2`}
            >
                <div className="flex items-center gap-x-2">
                    <InitialAvatar
                        name={industry?.industry?.user?.name}
                        imageUrl={industry?.industry?.user?.avatar}
                        large
                    />
                    <div>
                        <Typography variant={'muted'} color={'text-gray-500'}>
                            {Number(industry?.distance)?.toFixed(2)} Km Away
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
                    disabled={
                        applyForWorkplaceResult.isLoading || appliedIndustry
                    }
                    onClick={async () => {
                        await applyForWorkplace(industry?.id)
                    }}
                    loading={applyForWorkplaceResult.isLoading}
                >
                    Apply Here
                </ActionButton>
            </div>
        </>
    )
}
