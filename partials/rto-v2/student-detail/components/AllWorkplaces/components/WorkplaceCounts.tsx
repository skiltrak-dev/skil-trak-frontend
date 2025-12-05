import { RtoV2Api } from '@queries'
import { Award, CheckCircle2, Hourglass, TrendingUp } from 'lucide-react'
import React from 'react'
import { PulseLoader } from 'react-spinners'

export const WorkplaceCounts = ({ studentId }: { studentId: number }) => {
    const workplaceCount = RtoV2Api.StudentsWorkplace.getStudentWorkplaceCount(
        studentId,
        {
            skip: !studentId,
            refetchOnMountOrArgChange: 30,
        }
    )

    const statsData = [
        {
            id: 1,
            label: 'Active',
            value: workplaceCount?.data?.placementStarted,
            icon: CheckCircle2,
            gradientFrom: 'from-emerald-500',
            gradientTo: 'to-emerald-600',
        },
        {
            id: 2,
            label: 'Completed',
            value: workplaceCount?.data?.placementCompleted,
            icon: Award,
            gradientFrom: 'from-blue-500',
            gradientTo: 'to-blue-600',
        },
        {
            id: 3,
            label: 'Pending',
            value: workplaceCount?.data?.pending,
            icon: Hourglass,
            gradientFrom: 'from-amber-500',
            gradientTo: 'to-amber-600',
        },
        // {
        //     id: 4,
        //     label: 'Total Hours',
        //     value: 265,
        //     icon: TrendingUp,
        //     gradientFrom: 'from-[#F7A619]',
        //     gradientTo: 'to-[#F7A619]/80',
        // },
    ]
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statsData.map((stat) => {
                const IconComponent = stat.icon
                return (
                    <div
                        key={stat.id}
                        className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg p-4 hover:shadow-xl transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradientFrom} ${stat.gradientTo} flex items-center justify-center shadow-lg`}
                            >
                                <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                {' '}
                                <p className="text-slate-500 text-sm">
                                    {stat.label}
                                </p>
                                {workplaceCount?.isLoading ? (
                                    <PulseLoader size={4} color={'#044866'} />
                                ) : (
                                    <p className="text-slate-900 text-xl">
                                        {stat.value}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
