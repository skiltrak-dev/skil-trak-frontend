import { ActionButton, InitialAvatar, Typography } from '@components'
import { ApiCallResult } from '@types'
import { useState } from 'react'

// query

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
    result,
    onClick,
}: {
    industry: any
    appliedIndustry: any
    index: number
    result: any
    onClick: () => void
}) => {
    const [selectedIndustry, setSelectedIndustry] = useState<number>(-1)
    return (
        <div
            className={`${BACKGROUNDS[index]} p-2 rounded-lg flex justify-between items-center`}
        >
            <div className="flex items-center gap-x-2 px-3">
                {industry?.industry?.user?.name && (
                    <InitialAvatar
                        name={industry?.industry?.user?.name}
                        imageUrl={industry?.industry?.user?.avatar}
                        large
                    />
                )}
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
                onClick={() => {
                    onClick()
                    setSelectedIndustry(industry?.id)
                }}
                disabled={result.isLoading || appliedIndustry}
                loading={result.isLoading && industry?.id === selectedIndustry}
            >
                Apply Here
            </ActionButton>
        </div>
    )
}
