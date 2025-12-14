import {
    BookOpen,
    Users,
    Target,
    AlertCircle,
    CheckCircle,
    TrendingUp,
    TrendingDown,
    Activity,
    BarChart3,
} from 'lucide-react'
import { StatisticCard } from './StatisticCard'

interface CoursesStatisticsGridProps {
    totalCourses: number
    totalStudents: number
    totalCapacity: number
    overallCapacity: number
}

export function CoursesStatisticsGrid({
    totalCourses,
    totalStudents,
    totalCapacity,
    overallCapacity,
}: CoursesStatisticsGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <StatisticCard
                icon={BookOpen}
                iconBgColor="from-[#E8F4F8] to-[#D1E7F0]"
                trendIcon={TrendingUp}
                trendColor="text-[#10B981]"
                value={totalCourses}
                label="Total Courses"
            />

            <StatisticCard
                icon={Users}
                iconBgColor="from-[#FEF3C7] to-[#FDE68A]"
                trendIcon={Activity}
                trendColor="text-[#F7A619]"
                value={totalStudents}
                label="Active Students"
            />

            <StatisticCard
                icon={Target}
                iconBgColor="from-[#DBEAFE] to-[#BFDBFE]"
                trendIcon={BarChart3}
                trendColor="text-[#3B82F6]"
                value={totalCapacity}
                label="Total Capacity"
            />

            <StatisticCard
                icon={overallCapacity >= 80 ? AlertCircle : CheckCircle}
                iconBgColor={
                    overallCapacity >= 80
                        ? 'from-[#FEE2E2] to-[#FECACA]'
                        : 'from-[#D1FAE5] to-[#A7F3D0]'
                }
                trendIcon={overallCapacity >= 80 ? TrendingUp : TrendingDown}
                trendColor={
                    overallCapacity >= 80 ? 'text-[#DC2626]' : 'text-[#10B981]'
                }
                value={`${overallCapacity}%`}
                label="Overall Capacity"
                valueColor={
                    overallCapacity >= 80 ? 'text-[#DC2626]' : 'text-[#10B981]'
                }
            />
        </div>
    )
}
