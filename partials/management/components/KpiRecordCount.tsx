import { Typography } from '@components'
import React from 'react'
import { PuffLoader } from 'react-spinners'

type KpiRecordCountProps = {
    title: string
    count: number
    classes?: any
    loader?: boolean
}
export const KpiRecordCount = ({ title, count, classes, loader }: any) => {
    return (
        <div
            className={`rounded-lg border-dashed border-2 px-6 py-4 ${classes} flex gap-y-1 w-full`}
        >
            <div className="whitespace-nowrap">
                <Typography variant={'muted'} color="text-gray-400">
                    {title}
                </Typography>
            </div>
            {loader ? (
                <PuffLoader size={28} />
            ) : (
                <Typography variant={'body'} bold>
                    {count > 0 ? count : 0}
                </Typography>
            )}
        </div>
    )
}
