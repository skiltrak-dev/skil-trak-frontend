import { Card, SkeletonLoader } from '@components'
import React from 'react'

export const DepartmentListSkeleton = () => {
    return (
        <div className='flex flex-col gap-y-4 m-5'>
            {Array.from({ length: 6 }).map((_, i) => (
                <Card noPadding>
                    <div className="flex justify-between w-full items-center">
                        <SkeletonLoader width="w-80" height="h-20" />
                        <SkeletonLoader width="w-72" height="h-16" />
                        <SkeletonLoader width="w-64" height="h-16" />
                        <SkeletonLoader width="w-48" height="h-16" />
                        <div className="mr-4">
                            <SkeletonLoader width="w-24" height="h-10" />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}
