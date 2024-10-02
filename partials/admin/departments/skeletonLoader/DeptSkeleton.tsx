import {
    Card,
    ProfileStatsCardSkeleton,
    ProgressChartSkeleton,
    SkeletonLoader,
    TableSkeleton,
} from '@components'
import React from 'react'

// Skeleton Loader

export const DeptSkeleton = () => {
    return (
        <div className="">
            {/* User Info */}
            <div className="my-5">
                <Card>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <SkeletonLoader
                                width="w-20"
                                height="h-20"
                                className="rounded-full"
                            />
                            <div>
                                <SkeletonLoader
                                    width="w-24"
                                    height="h-6"
                                    className="mb-2"
                                />
                                <SkeletonLoader width="w-36" height="h-4" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <SkeletonLoader width="w-72" height="h-10" />
                            <SkeletonLoader width="w-72" height="h-10" />
                        </div>
                        <div className="space-x-2 flex">
                            <SkeletonLoader width="w-24" height="h-10" />
                            <SkeletonLoader width="w-24" height="h-10" />
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex w-full gap-x-5">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 w-full">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <ProfileStatsCardSkeleton key={index} />
                    ))}
                </div>

                {/* Progress */}

                <ProgressChartSkeleton />
            </div>
        </div>
    )
}
