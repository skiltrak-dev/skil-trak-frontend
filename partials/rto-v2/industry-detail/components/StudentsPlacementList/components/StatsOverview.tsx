import { Users, CheckCircle, Clock, Circle } from 'lucide-react'
import { Card } from '@components'
import { useAppSelector } from '@redux/hooks'
import { RtoV2Api } from '@redux'
import { PuffLoader } from 'react-spinners'

interface StatCardProps {
    icon: React.ReactNode
    label: string
    value: string | number
    bgGradient: string
    iconBgGradient: string
    textColor: string
    borderColor: string
    loading: boolean
}

function StatCard({
    icon,
    label,
    value,
    bgGradient,
    iconBgGradient,
    textColor,
    borderColor,
    loading,
}: StatCardProps) {
    return (
        <Card className={`${bgGradient} !rounded-md p-2 border ${borderColor}`}>
            <div className="flex items-center gap-2">
                <div
                    className={`w-6 h-6 ${iconBgGradient} rounded-md flex items-center justify-center shadow-sm`}
                >
                    {icon}
                </div>
                <div>
                    <p
                        className={`text-[10px] mb-0 ${
                            label === 'Completed'
                                ? 'text-[#064E3B]'
                                : label === 'In Progress'
                                ? 'text-[#92400E]'
                                : 'text-[#64748B]'
                        }`}
                    >
                        {label}
                    </p>
                    <p className={`text-sm font-bold ${textColor}`}>
                        {loading ? <PuffLoader size={17} /> : value}
                    </p>
                </div>
            </div>
        </Card>
    )
}

export function StatsOverview() {
    const industry = useAppSelector((state) => state.industry)

    const studentCount = RtoV2Api.Industries.industryStudentStats(
        {
            industryId: industry?.industryDetail?.id ?? 0,
            sectorId: industry?.activeSector ?? 0,
        },
        {
            skip: !industry?.industryDetail?.id || !industry?.activeSector,
        }
    )

    // Configuration array for StatCards
    const statCardsConfig = [
        {
            id: 'total-students',
            icon: Users,
            label: 'Total Students',
            dataKey: 'totalStudents',
            bgGradient: 'bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8]',
            iconBgGradient: 'bg-gradient-to-br from-[#044866] to-[#0D5468]',
            textColor: 'text-[#1A2332]',
            borderColor: 'border-[#E2E8F0]',
            iconSize: 'w-3 h-3',
            value: studentCount?.data?.totalStudents ?? 0,
        },
        {
            id: 'completed',
            icon: CheckCircle,
            label: 'Completed',
            dataKey: 'completedStudents',
            bgGradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0]',
            iconBgGradient: 'bg-gradient-to-br from-[#10B981] to-[#059669]',
            textColor: 'text-[#065F46]',
            borderColor: 'border-[#10B981]/20',
            iconSize: 'w-3 h-3',
            value: studentCount?.data?.completedStudents ?? 0,
        },
        {
            id: 'in-progress',
            icon: Clock,
            label: 'In Progress',
            dataKey: 'inProgress',
            bgGradient: 'bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]',
            iconBgGradient: 'bg-gradient-to-br from-[#F7A619] to-[#EA580C]',
            textColor: 'text-[#B45309]',
            borderColor: 'border-[#F7A619]/20',
            iconSize: 'w-3 h-3',
            value: studentCount?.data?.inProgress ?? 0,
        },
        {
            id: 'pending',
            icon: Circle,
            label: 'Pending',
            dataKey: 'pending',
            bgGradient: 'bg-gradient-to-br from-[#F8FAFB] to-[#E2E8F0]',
            iconBgGradient: 'bg-gradient-to-br from-[#64748B] to-[#475569]',
            textColor: 'text-[#475569]',
            borderColor: 'border-[#E2E8F0]',
            iconSize: 'w-3 h-3',
            value: studentCount?.data?.pending ?? 0,
        },
    ]

    return (
        <div className="grid grid-cols-4 gap-2">
            {statCardsConfig.map((config) => {
                const Icon = config.icon
                return (
                    <StatCard
                        key={config.id}
                        icon={
                            <Icon className={`${config.iconSize} text-white`} />
                        }
                        label={config.label}
                        value={config?.value}
                        bgGradient={config.bgGradient}
                        iconBgGradient={config.iconBgGradient}
                        textColor={config.textColor}
                        borderColor={config.borderColor}
                        loading={studentCount?.isLoading}
                    />
                )
            })}
        </div>
    )
}
