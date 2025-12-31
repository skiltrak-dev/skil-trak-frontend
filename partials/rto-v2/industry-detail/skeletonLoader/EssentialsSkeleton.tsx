import { Skeleton } from '@components/ui/skeleton'

export function EssentialsSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden">
            {/* Header Skeleton */}
            <div className="bg-gradient-to-r from-[#044866] to-[#0D5468] px-4 py-4 flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-xl bg-white/20" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-32 bg-white/30" />
                    <Skeleton className="h-3 w-48 bg-white/20" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 px-4 py-4">
                {/* Left Column */}
                <div className="space-y-3 flex flex-col h-full">
                    {/* Basic Details Skeleton */}
                    <div className="p-4 rounded-xl border border-slate-100 space-y-4">
                        <Skeleton className="h-5 w-32" />
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-4/6" />
                        </div>
                    </div>
                    {/* Interview Availability Skeleton */}
                    <div className="p-4 rounded-xl border border-slate-100 space-y-4">
                        <Skeleton className="h-5 w-40" />
                        <div className="grid grid-cols-2 gap-2">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3 flex flex-col h-full">
                    {/* Assigned Agent Skeleton */}
                    <div className="p-4 rounded-xl border border-slate-100 space-y-4">
                        <Skeleton className="h-5 w-32" />
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-12 h-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-48" />
                            </div>
                        </div>
                    </div>
                    {/* Premium Features Skeleton */}
                    <div className="p-4 rounded-xl border border-slate-100 space-y-4">
                        <Skeleton className="h-5 w-40" />
                        <div className="space-y-2">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
