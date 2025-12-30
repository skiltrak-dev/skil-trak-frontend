import { Skeleton } from '@components/ui/skeleton'

export function HeaderSkeleton() {
    return (
        <div className="relative">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Status Banner Skeleton */}
                <Skeleton className="h-8 w-full" />

                <div className="px-4 py-4">
                    <div className="flex items-start justify-between gap-4">
                        {/* Company Info Skeleton */}
                        <div className="flex items-center gap-4">
                            <Skeleton className="w-16 h-16 rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-48" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons Skeleton */}
                        <div className="flex gap-2">
                            <Skeleton className="h-10 w-24" />
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </div>
                </div>

                {/* Status Controls Skeleton */}
                <div className="flex border-t border-slate-100">
                    <Skeleton className="h-12 flex-1 rounded-none border-r border-slate-100" />
                    <Skeleton className="h-12 flex-1 rounded-none border-r border-slate-100" />
                    <Skeleton className="h-12 flex-1 rounded-none" />
                </div>
            </div>
        </div>
    )
}
