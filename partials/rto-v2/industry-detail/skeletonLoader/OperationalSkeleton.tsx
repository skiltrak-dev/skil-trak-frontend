import { Skeleton } from '@components/ui/skeleton'

export function OperationalSkeleton() {
    return (
        <div className="space-y-4">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                {/* Tab Bar Skeleton */}
                <div className="flex border-b border-[#E2E8F0] overflow-x-auto">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="px-6 py-4 flex items-center gap-2 border-r border-[#E2E8F0] min-w-[150px]">
                            <Skeleton className="w-4 h-4 rounded-sm" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    ))}
                </div>

                {/* Tab Content Skeleton */}
                <div className="p-6">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-48" />
                                <Skeleton className="h-4 w-64" />
                            </div>
                            <Skeleton className="h-10 w-32" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-48 w-full rounded-xl" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
