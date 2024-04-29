import { Typography } from '@components'
import React from 'react'
import { DashedCountCard } from './DashedCountCard'

export const OverallKpiCard = ({ title, totalKpi, kpiDoubling }: any) => {
    return (
        <>
            <div className="flex items-center gap-x-2.5 w-full mb-2.5">
                <div className="rounded-md border-2 border-dashed p-4 w-full">
                    <Typography
                        variant="small"
                        color="text-primaryNew"
                        semibold
                    >
                        {title}
                    </Typography>
                </div>
                <div className="flex items-center gap-x-2.5 w-full">
                    <DashedCountCard
                        title="Total KPI"
                        subtitle={totalKpi || 0}
                        align="center"
                    />
                    <DashedCountCard
                        title="KPI Doubling"
                        subtitle={kpiDoubling || 0}
                        align="center"
                    />
                </div>
            </div>
        </>
    )
}
