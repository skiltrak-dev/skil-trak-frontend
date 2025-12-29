import { Skeleton } from '@components/ui/skeleton'
import React from 'react'

export const TicketListSkeleton = () => {
    return (
        <div className="p-4">
            {/* Ticket Cards Skeleton - Ultra-compact single-line design */}
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="mb-2 last:mb-0">
                    <div className="bg-white border border-gray-200 rounded-lg p-2.5 hover:shadow-md transition-all">
                        <div className="flex items-center gap-2">
                            {/* Priority Badge Skeleton */}
                            <Skeleton className="w-16 h-5 rounded-full flex-shrink-0" />

                            {/* Ticket ID Skeleton */}
                            <Skeleton className="w-20 h-4 flex-shrink-0" />

                            {/* Separator */}
                            <div className="w-px h-4 bg-gray-200 flex-shrink-0"></div>

                            {/* Student Name Skeleton */}
                            <Skeleton className="w-28 h-4 flex-shrink-0" />

                            {/* Separator */}
                            <div className="w-px h-4 bg-gray-200 flex-shrink-0"></div>

                            {/* Phase Badge Skeleton */}
                            <Skeleton className="w-24 h-5 rounded flex-shrink-0" />

                            {/* Status Badge Skeleton */}
                            <Skeleton className="w-32 h-5 rounded flex-shrink-0" />

                            {/* Title Skeleton - flex-1 to take remaining space */}
                            <Skeleton className="h-4 flex-1 min-w-0" />

                            {/* Time Badge Skeleton */}
                            <Skeleton className="w-12 h-5 rounded flex-shrink-0" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
