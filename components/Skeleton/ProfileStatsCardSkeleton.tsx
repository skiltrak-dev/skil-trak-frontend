import React from 'react'
import { SkeletonLoader } from './SkeletonLoader'

export const ProfileStatsCardSkeleton = () => {
    return (
        <>
            <div className="p-4  bg-white shadow rounded-lg mt-6">
                <div className="flex relative items-center justify-end">
                    <div className="absolute bottom-10 left-0">
                        <SkeletonLoader width="w-14" height="h-12" />
                    </div> 
                    <div className="text-right">
                        <SkeletonLoader
                            width="w-12"
                            height="h-6"
                            className="mb-2"
                        />
                        <SkeletonLoader width="w-24" height="h-4" />
                    </div>
                </div>
            </div>
        </>
    )
}
