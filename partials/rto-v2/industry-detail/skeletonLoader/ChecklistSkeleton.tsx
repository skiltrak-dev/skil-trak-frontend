import { Skeleton } from '@components/ui/skeleton'

export function ChecklistSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden">
            {/* Header Skeleton */}
            <div className="bg-gradient-to-r from-[#044866] to-[#0D5468] px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-xl bg-white/20" />
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-48 bg-white/30" />
                        <Skeleton className="h-3 w-64 bg-white/20" />
                    </div>
                </div>
                <div className="text-right space-y-2">
                    <Skeleton className="h-3 w-12 ml-auto bg-white/20" />
                    <Skeleton className="h-2 w-32 bg-white/20" />
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Progress Bar Area Skeleton */}
                <div className="p-6 bg-slate-50 rounded-xl space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-32" />
                        </div>
                        <Skeleton className="h-8 w-24" />
                    </div>
                    <Skeleton className="h-3 w-full rounded-full" />
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="p-4 border border-slate-100 rounded-xl space-y-3">
                            <Skeleton className="w-10 h-10 rounded-lg" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-full" />
                            </div>
                            <Skeleton className="h-6 w-24 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
