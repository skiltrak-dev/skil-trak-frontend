import { Button, Typography } from '@components'
import { RtoV2Api } from '@queries'
import {
    AlertCircle,
    CheckCircle,
    Clock,
    FileCheck,
    FileText,
    Folder,
    Shield,
    Star,
    TrendingUp,
    Upload,
} from 'lucide-react'

export const DocumentHeader = ({ count }: { count: any }) => {
    console.log({ count })

    const statsData = [
        {
            id: 1,
            title: 'Approved Documents',
            value: count?.data?.approvedDocuments,
            loading: count?.isLoading,
            icon: CheckCircle,
            secondaryIcon: TrendingUp,
            bgColor: 'bg-emerald-500/20',
            iconColor: 'text-emerald-300',
            borderColor: 'border-emerald-500/30',
        },
        {
            id: 2,
            title: 'Pending Review',
            value: count?.data?.pendingDocuments,
            loading: count?.isLoading,
            icon: Clock,
            secondaryIcon: AlertCircle,
            bgColor: 'bg-amber-500/20',
            iconColor: 'text-amber-300',
            borderColor: 'border-amber-500/30',
        },
        {
            id: 3,
            title: 'Industry Checks',
            value: count?.data?.industryCheck,
            loading: count?.isLoading,
            icon: Shield,
            secondaryIcon: Star,
            bgColor: 'bg-[#F7A619]/20',
            iconColor: 'text-[#F7A619]',
            borderColor: 'border-[#F7A619]/30',
        },
        {
            id: 4,
            title: 'Course Documents',
            value: count?.data?.courseDocuments,
            loading: count?.isLoading,
            icon: Folder,
            secondaryIcon: FileText,
            bgColor: 'bg-blue-500/20',
            iconColor: 'text-blue-300',
            borderColor: 'border-blue-500/30',
        },
    ]
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-[#044866] via-[#0D5468] to-[#044866] rounded-xl p-4 shadow-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#F7A619]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>

            <div className="relative space-y-4">
                <div className="flex items-start justify-between">
                    <div className="flex gap-x-2">
                        <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <FileCheck className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <Typography className="text-white">
                                Document Center
                            </Typography>
                            <Typography
                                variant="label"
                                color="text-white"
                                normal
                            >
                                Manage all your compliance and course documents
                                in one place
                            </Typography>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {statsData.map((stat) => {
                        const Icon = stat.icon
                        const SecondaryIcon = stat.secondaryIcon

                        return (
                            <div
                                key={stat.id}
                                className="bg-white/10 backdrop-blur-md rounded-lg p-2 space-y-1 border border-white/20 hover:bg-white/15 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center justify-between">
                                    <div
                                        className={`w-8 h-8 rounded-sm ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                                    >
                                        <Icon
                                            className={`w-4 h-4 ${stat.iconColor}`}
                                        />
                                    </div>
                                    <SecondaryIcon
                                        className={`w-4 h-4 ${stat.iconColor}`}
                                    />
                                </div>
                                <div className="flex justify-between items-center gap-x-1">
                                    <Typography
                                        variant="label"
                                        color="text-white"
                                        normal
                                    >
                                        {stat.title}
                                    </Typography>
                                    <Typography
                                        variant="title"
                                        color="text-white"
                                    >
                                        {stat.value}
                                    </Typography>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
