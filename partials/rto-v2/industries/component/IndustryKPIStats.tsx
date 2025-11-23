import { Building2, CheckCircle2, Clock, Target, TrendingUp, Users, Briefcase, Shield } from 'lucide-react'
import { Card } from '@components'
import { Progressbar } from '@partials/rto-v2/components/Progressbar'

interface KPIStatsProps {
    totalIndustries: number
    verifiedIndustries: number
    pendingIndustries: number
    totalCapacity: number
    totalPlacements: number
    totalAvailablePositions: number
    averageComplianceScore: number
    averageRating: string
}

export const IndustryKPIStats = ({
    totalIndustries,
    verifiedIndustries,
    pendingIndustries,
    totalCapacity,
    totalPlacements,
    totalAvailablePositions,
    averageComplianceScore,
    averageRating,
}: KPIStatsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Industries */}
            <Card className="p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2 flex-1">
                        <p className="text-sm text-muted-foreground font-medium">
                            Total Industries
                        </p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-4xl font-bold tabular-nums text-primary">
                                {totalIndustries}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <span className="text-success flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                {verifiedIndustries} verified
                            </span>
                            <span className="text-warning flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {pendingIndustries} pending
                            </span>
                        </div>
                    </div>
                    <div className="p-3 rounded-xl bg-primary/10 shadow-lg">
                        <Building2 className="h-6 w-6 text-primary" />
                    </div>
                </div>
            </Card>

            {/* Capacity Utilization */}
            <Card className="p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2 flex-1">
                        <p className="text-sm text-muted-foreground font-medium">
                            Capacity Utilization
                        </p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-4xl font-bold tabular-nums text-secondary">
                                {totalCapacity > 0
                                    ? Math.round((totalPlacements / totalCapacity) * 100)
                                    : 0}
                                %
                            </p>
                        </div>
                        <div className="space-y-1">
                            <Progressbar
                                variant="secondary"
                                value={totalPlacements}
                                max={totalCapacity}
                                size="xs"
                            />
                            <p className="text-xs text-muted-foreground">
                                {totalPlacements}/{totalCapacity} positions filled
                            </p>
                        </div>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary/10 shadow-lg">
                        <Target className="h-6 w-6 text-secondary" />
                    </div>
                </div>
            </Card>

            {/* Available Positions */}
            <Card className="p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2 flex-1">
                        <p className="text-sm text-muted-foreground font-medium">
                            Available Positions
                        </p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-4xl font-bold tabular-nums text-success">
                                {totalAvailablePositions}
                            </p>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                            <TrendingUp className="h-3 w-3 text-success" />
                            <span className="text-success font-medium">
                                Ready for placements
                            </span>
                        </div>
                    </div>
                    <div className="p-3 rounded-xl bg-success/10 shadow-lg">
                        <Users className="h-6 w-6 text-success" />
                    </div>
                </div>
            </Card>

            {/* Compliance Score */}
            <Card className="p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2 flex-1">
                        <p className="text-sm text-muted-foreground font-medium">
                            Avg. Compliance
                        </p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-4xl font-bold tabular-nums text-accent">
                                {averageComplianceScore}%
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <Shield className="h-3 w-3 text-accent" />
                            <span className="text-muted-foreground">
                                ⭐ {averageRating} rating
                            </span>
                        </div>
                    </div>
                    <div className="p-3 rounded-xl bg-accent/10 shadow-lg">
                        <Briefcase className="h-6 w-6 text-accent" />
                    </div>
                </div>
            </Card>
        </div>
    )
}

