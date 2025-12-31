import { Skeleton } from '@components/ui/skeleton'

export function ComplianceTabSkeleton() {
    return (
        <div className="space-y-6">
            {/* Success Banner Skeleton */}
            <Skeleton className="h-24 w-full rounded-2xl" />

            {/* Highlighted Tasks Card Skeleton */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <Skeleton className="h-5 w-40" />
                </div>
                <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-full max-w-[400px]" />
                        </div>
                    ))}
                </div>
            </div>

            {/* SkilTrak Facility Checklist Skeleton */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-6 w-32 rounded-full" />
                        </div>
                    </div>
                </div>
                <Skeleton className="h-16 w-full rounded-lg bg-slate-50" />
                <Skeleton className="h-20 w-full rounded-xl bg-slate-50" />
            </div>

            {/* RTO Facility Checklist Skeleton */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <Skeleton className="h-5 w-48" />
                </div>
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-full max-w-[350px]" />
                        </div>
                    ))}
                </div>
                <Skeleton className="h-20 w-full rounded-xl bg-slate-50" />
            </div>
        </div>
    )
}

export function ProgramsTabSkeleton() {
    return (
        <div className="space-y-6">
            {/* Streams Banner Skeleton */}
            <Skeleton className="h-24 w-full rounded-lg" />

            {/* Qualification Card Skeleton */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 bg-slate-50/50 flex items-center gap-3 border-b border-slate-100">
                    <Skeleton className="h-9 w-9 rounded-md" />
                    <Skeleton className="h-5 w-64" />
                </div>
                <div className="p-4 space-y-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        {[1, 2].map((i) => (
                            <div key={i} className="p-3 bg-slate-50 rounded-md space-y-3 border border-slate-100">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4 rounded-full" />
                                    <Skeleton className="h-4 w-48" />
                                </div>
                                <div className="p-3 bg-blue-50/50 rounded-md space-y-2 border border-blue-50">
                                    <Skeleton className="h-3 w-24" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats Grid Skeleton */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                        {[1, 2].map((i) => (
                            <div key={i} className="p-4 rounded-md border border-slate-100 bg-slate-50/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <Skeleton className="h-3 w-3" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                                <Skeleton className="h-4 w-12" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Info Note Skeleton */}
            <Skeleton className="h-20 w-full rounded-lg" />
        </div>
    )
}

export function SupervisorTabSkeleton() {
    return (
        <div className="space-y-6">
            {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="space-y-2 flex-1 pt-1">
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-3 w-32" />
                            <Skeleton className="h-6 w-40 rounded-full" />
                        </div>
                    </div>

                    <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <Skeleton className="h-4 w-64 ml-6" />
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-3/4" />
                        </div>

                        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 space-y-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                            <Skeleton className="h-3 w-2/3" />
                        </div>

                        <div className="pt-4 border-t border-slate-100 space-y-3">
                            <Skeleton className="h-3 w-32" />
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-4 w-4" />
                                    <Skeleton className="h-3 w-48" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-4 w-4" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            </div>
                            <Skeleton className="h-3 w-40 italic mt-2" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export function ResourcesTabSkeleton() {
    return (
        <div className="space-y-4">
            {/* Feature Banner Skeleton */}
            <Skeleton className="h-24 w-full rounded-xl" />

            {/* Gallery Section Skeleton */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="h-5 w-56" />
                    </div>
                    <Skeleton className="h-3 w-3/4" />
                </div>

                <div className="pt-4 space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                            <div className="flex items-center gap-4 flex-1">
                                <Skeleton className="h-10 w-10 rounded-lg" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-1/3" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <Skeleton className="h-8 w-8 rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Info Cards Skeleton */}
            <div className="grid md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                    <div key={i} className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-2">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                    </div>
                ))}
            </div>
        </div>
    )
}
