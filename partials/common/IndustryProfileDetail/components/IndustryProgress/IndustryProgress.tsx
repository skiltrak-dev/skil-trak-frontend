import { createElement, ReactNode } from 'react'
import {
    Check,
    X,
    User,
    BookOpen,
    Users,
    Clock,
    Shield,
    Heart,
    CheckCircle,
    Mail,
    UserCheck,
    Building,
    FileText,
} from 'lucide-react'
import { Badge, Card, Typography } from '@components'
import { SubAdminApi } from '@queries'
import { Industry } from '@types'
import { IndustryProgressBar } from './IndustryProgressBar'

interface StatusItem {
    id: string
    label: string
    status: 'complete' | 'incomplete'
    icon: React.ComponentType<{ className?: string }>
}

const checkIsCompleted = (isCompleted: boolean) =>
    isCompleted ? 'complete' : 'incomplete'

export const IndustryProgress = ({ industry }: { industry: Industry }) => {
    const industryProgress = SubAdminApi.Industry.industryProgress(
        industry?.id,
        {
            skip: !industry?.id,
        }
    )

    const statusItems: StatusItem[] = [
        {
            id: 'courses',
            label: 'Courses',
            status: checkIsCompleted(industryProgress?.data?.courseAdded),
            icon: BookOpen,
        },
        {
            id: 'capacity',
            label: 'Capacity',
            status: checkIsCompleted(industryProgress?.data?.CapacityUpdated),
            icon: Users,
        },
        {
            id: 'profile',
            label: 'Profile',
            status: checkIsCompleted(industryProgress?.data?.ProfileUpdated),
            icon: User,
        },
        {
            id: 'trading-hours',
            label: 'Trading Hours',
            status: checkIsCompleted(
                industryProgress?.data?.trading_hours_and_shifts
            ),
            icon: Clock,
        },
        {
            id: 'industry-checks',
            label: 'Industry Checks',
            status: checkIsCompleted(industryProgress?.data?.hasIndustryChecks),
            icon: Shield,
        },
        {
            id: 'insurance-documents',
            label: 'Insurance Documents',
            status: checkIsCompleted(
                industryProgress?.data?.hasInsuranceDocuments
            ),
            icon: FileText, // you can replace with a better fitting icon
        },
        {
            id: 'favorite',
            label: 'Favorite',
            status: checkIsCompleted(industryProgress?.data?.hasBookmarked),
            icon: Heart,
        },
        {
            id: 'course-approved',
            label: 'Course Approved',
            status: checkIsCompleted(industryProgress?.data?.hasCourseApproved),
            icon: CheckCircle,
        },
        {
            id: 'email-verified',
            label: 'Email Verified',
            status: checkIsCompleted(industryProgress?.data?.hasEmailVerified),
            icon: Mail,
        },
        {
            id: 'supervisor',
            label: 'Supervisor',
            status: checkIsCompleted(industryProgress?.data?.hasSupervisor),
            icon: UserCheck,
        },
        {
            id: 'workplace-type',
            label: 'Workplace Type',
            status: checkIsCompleted(industryProgress?.data?.hasWorkplaceType),
            icon: Building,
        },
    ]

    const completedItems = statusItems.filter(
        (item) => item.status === 'complete'
    ).length
    const totalItems = statusItems.length
    const missingItems = totalItems - completedItems

    return (
        <Card fullHeight>
            <div className="max-w-sm mx-auto space-y-4 h-full">
                {/* Header Card */}
                <div>
                    <div className="flex items-center justify-between  mb-1">
                        <Typography variant="muted">
                            Profile Completion
                        </Typography>
                        <Badge
                            variant={
                                Number(
                                    industryProgress?.data
                                        ?.profileCompletionPercentage
                                ) === 100
                                    ? 'primary'
                                    : 'secondary'
                            }
                            text={`${Number(
                                industryProgress?.data
                                    ?.profileCompletionPercentage
                            )}%`}
                            loading={industryProgress?.isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <IndustryProgressBar
                            percentage={
                                industryProgress?.data
                                    ?.profileCompletionPercentage
                            }
                        />

                        <div className="flex justify-between">
                            <Typography variant="xxs" color="text-gray-500">
                                {completedItems}/{totalItems} done
                            </Typography>
                            <Typography variant="xxs" color="text-gray-500">
                                {missingItems} left
                            </Typography>
                        </div>
                    </div>
                </div>

                <div>
                    {/* Status Items Card */}
                    <Typography variant="muted" color="text-gray-700">
                        Status Overview
                    </Typography>

                    <div className="space-y-1 mt-1">
                        {statusItems.map((item) => {
                            const IconComponent = item.icon
                            return (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-1.5 rounded border bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-1.5">
                                        <div
                                            className={`flex items-center justify-center w-4 h-4 rounded-full ${
                                                item.status === 'complete'
                                                    ? 'bg-green-100 text-green-500'
                                                    : 'bg-red-200 text-red-700'
                                            }`}
                                        >
                                            <IconComponent className="w-2.5 h-2.5" />
                                        </div>
                                        <Typography variant="small" medium>
                                            {item.label}
                                        </Typography>
                                    </div>
                                    <div
                                        className={`flex items-center justify-center w-3 h-3 rounded-full ${
                                            item.status === 'complete'
                                                ? 'bg-green-500 text-white'
                                                : 'bg-red-500 text-white'
                                        }`}
                                    >
                                        {item.status === 'complete' ? (
                                            <Check className="w-2 h-2" />
                                        ) : (
                                            <X className="w-2 h-2" />
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Card>
    )
}
