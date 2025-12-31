import { Skeleton } from '@components/ui/skeleton'

export function PlacementApprovalSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 space-y-3 pb-10">
            {/* Header Skeleton */}
            <div className="bg-[#044866] text-white sticky top-0 z-50 shadow-2xl border-b-4 border-[#F7A619]">
                <div className="container mx-auto p-3 space-y-2.5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                            <Skeleton className="h-10 w-10 rounded-lg bg-white/20" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32 bg-white/20" />
                                <Skeleton className="h-7 w-64 bg-white/20" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-8 w-32 rounded-full bg-white/20" />
                            <Skeleton className="h-6 w-6 rounded-full bg-white/20" />
                        </div>
                    </div>
                    {/* Progress Indicator Skeleton */}
                    <div className="w-full py-2">
                        <Skeleton className="h-2 w-full bg-white/10 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Status Alert Skeleton */}
            <div className="container mx-auto px-4 md:px-6">
                <Skeleton className="h-20 w-full rounded-md border-2 border-slate-100" />
            </div>

            {/* Main Content Skeleton */}
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Quick Summary Skeleton */}
                        <div className="space-y-3">
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                                <div className="bg-slate-50/50 px-5 py-3 border-b-2 border-slate-100">
                                    <div className="flex items-center gap-2.5">
                                        <Skeleton className="h-10 w-10 rounded-xl" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-5 w-48" />
                                            <Skeleton className="h-3 w-32" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 space-y-4">
                                    <Skeleton className="h-20 w-full rounded-xl bg-slate-50" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <div key={i} className="flex gap-2.5">
                                                <Skeleton className="h-7 w-7 rounded-lg" />
                                                <div className="space-y-1.5 flex-1">
                                                    <Skeleton className="h-3 w-1/3" />
                                                    <Skeleton className="h-4 w-2/3" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Skeleton className="h-24 w-full rounded-xl" />
                        </div>

                        {/* Detailed View Skeleton */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-10 w-10 rounded-xl" />
                                    <Skeleton className="h-6 w-48" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-32 w-full rounded-2xl" />
                                ))}
                            </div>
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="p-4 border border-slate-50 rounded-2xl flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <Skeleton className="h-12 w-12 rounded-xl" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-5 w-40" />
                                                <Skeleton className="h-4 w-64" />
                                            </div>
                                        </div>
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-32 space-y-4">
                            {/* Decision Panel Skeleton */}
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl space-y-3">
                                    <div className="flex justify-between">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-12" />
                                    </div>
                                    <Skeleton className="h-2 w-full rounded-full" />
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-3 w-32" />
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                    </div>
                                </div>
                                <div className="space-y-3 pt-4">
                                    <Skeleton className="h-12 w-full rounded-xl" />
                                    <Skeleton className="h-12 w-full rounded-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
