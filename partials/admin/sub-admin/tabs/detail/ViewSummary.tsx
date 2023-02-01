import React from 'react'
import { AdminApi } from '@queries'
import { FigureCard } from '@components/sections/subAdmin'
import { LoadingAnimation } from '@components'

export const ViewSummary = ({ user }: { user: any }) => {
    const summary = AdminApi.SubAdmins.useSummary(user?.id, { skip: !user })
    return (
        <>
            {summary.isLoading ? (
                <LoadingAnimation />
            ) : (
                <div className="grid grid-cols-4 gap-2">
                    {Object.entries(summary?.data).map(([key, value]) => (
                        <FigureCard
                            imageUrl="/images/icons/industry.png"
                            count={Number(value)}
                            title={key}
                        />
                    ))}
                </div>
            )}
        </>
    )
}
