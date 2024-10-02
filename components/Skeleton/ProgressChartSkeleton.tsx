import React from 'react'
import { SkeletonLoader } from './SkeletonLoader'

export const ProgressChartSkeleton = () => {
    return (
        <>
            <div className="bg-white shadow rounded-lg p-4 w-full">
                <div className="flex justify-center mb-4">
                    <SkeletonLoader width="w-32" height="h-6" className="" />
                </div>
                <div className="flex justify-center">
                    <div className="h-48 w-48 rounded-full border-[16px] animate-pulse"></div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-1 items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="">
                            <div className="flex">
                                <SkeletonLoader
                                    width="w-3"
                                    height="h-3"
                                    className="rounded-full"
                                />
                                <div className="flex items-center w-full">
                                    <SkeletonLoader
                                        width="w-full"
                                        height="h-2"
                                        className="ml-2 flex-grow"
                                    />
                                    <SkeletonLoader
                                        width="w-10"
                                        height="h-2"
                                        className="ml-2 flex-grow"
                                    />
                                </div>
                            </div>
                            {/* <SkeletonLoader width="w-12" height="h-4" /> */}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
