import { Card, Typography } from '@components'
import React from 'react'

export const HistoryCountCard = ({
    active,
    countData,
}: {
    countData: any
    active?: boolean
}) => {
    return (
        <Card shadowType="profile2" noPadding>
            <div
                className={`rounded-xl cursor-pointer flex flex-col justify-center items-center h-[75px] ${
                    active ? 'bg-primaryNew' : ''
                }`}
                onClick={() => {
                    if (countData?.onClick) {
                        countData.onClick()
                    }
                }}
            >
                <Typography
                    variant="h3"
                    bold
                    color={active ? 'text-white' : 'text-primaryNew'}
                >
                    {countData?.count}
                </Typography>
                <Typography
                    variant="xs"
                    color={active ? 'text-white' : 'text-primaryNew'}
                >
                    {countData?.title}
                </Typography>
            </div>
        </Card>
    )
}
