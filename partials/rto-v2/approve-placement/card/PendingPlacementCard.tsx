import { Button, Card } from '@components'
import React from 'react'
import {
    IndustryInfo,
    PlacementTopSection,
    WorkplaceMatchScore,
    WorkplaceStatus,
} from '../components'
import { RtoApprovalWorkplaceRequest } from '@types'
import { Info } from 'lucide-react'
import { useRouter } from 'next/router'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'

export const PendingPlacementCard = ({
    approval,
}: {
    approval: RtoApprovalWorkplaceRequest
}) => {
    const router = useRouter()

    const role = getUserCredentials()?.role

    return (
        <Card className="border border-border/60 shadow-sm hover:shadow-xl hover:border-primaryNew/30 transition-all overflow-hidden">
            {/* Top Section - Always Visible */}
            <PlacementTopSection approval={approval} />
            {/* Quick Actions */}

            {/* Key Info Row */}
            <div className="p-4 bg-background border-t border-border/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Industry */}
                    <IndustryInfo industry={approval?.industry} />

                    {/* Match Score */}
                    <WorkplaceMatchScore approval={approval} />

                    {/* Workplace Status */}
                    <WorkplaceStatus
                        workplaceRequest={approval?.workplaceRequest}
                    />
                </div>

                <Button
                    variant={'primaryNew'}
                    fullWidth
                    onClick={() => {
                        if (role === UserRoles.SUBADMIN) {
                            router.push(
                                `/portals/sub-admin/wp-approval-request/${approval?.id}/detail`
                            )
                        } else if (role === UserRoles.RTO) {
                            if (
                                router.pathname.startsWith(
                                    '/portals/rto/action-required'
                                )
                            ) {
                                router.push(
                                    `/portals/rto/action-required/approve-placement/${approval?.id}`
                                )
                            } else {
                                router.push(
                                    `/portals/rto/approve-placement/${approval?.id}`
                                )
                            }
                        }
                    }}
                >
                    <span className="flex items-center gap-2">
                        <Info className="h-5 w-5" />
                        Show Workplace Eligibility Assessment
                    </span>
                </Button>
            </div>
        </Card>
    )
}
