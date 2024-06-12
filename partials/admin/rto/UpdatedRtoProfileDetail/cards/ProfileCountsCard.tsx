import { Card, Typography } from '@components'
import React from 'react'
import { LabelCard } from './LabelCard'
import { RtoProfileCountDataType } from '../components'
import { PulseLoader } from 'react-spinners'
import { useRouter } from 'next/router'

export const ProfileCountsCard = ({
    data,
}: {
    data: RtoProfileCountDataType
}) => {
    const router = useRouter()
    return (
        <Card noPadding>
            <div
                onClick={() => {
                    if (data?.link) {
                        router.push(data?.link)
                    }
                }}
                className={`px-3.5 py-3 flex flex-col gap-y-1 relative ${
                    data?.link ? 'cursor-pointer' : ''
                }`}
            >
                <LabelCard
                    left={16}
                    top={-20}
                    background={data.background}
                    Icon={data.Icon}
                />

                <div className="flex flex-col gap-y-1.5 items-end justify-end">
                    <Typography light>
                        <span className="text-[13px] text-[#7B809A]">
                            {data?.title}
                        </span>
                    </Typography>
                    <Typography variant="h3" bold>
                        {data?.loading ? (
                            <PulseLoader size={4} />
                        ) : (
                            data?.count || 0
                        )}
                    </Typography>
                </div>
            </div>
        </Card>
    )
}
