import { Badge } from '@components'
import {
    Briefcase,
    Calendar,
    CheckCircle2,
    ShieldCheck,
    User,
} from 'lucide-react'
import React from 'react'
import { PlacementApproval } from '../PendingPlacement'
import moment from 'moment'

export const WpEligibilityAssessment = ({
    approval,
    courseInfo,
}: {
    courseInfo: any
    approval: PlacementApproval
}) => {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primaryNew/5 via-primaryNew/5 to-transparent border-2 border-primaryNew/20 p-6 mb-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primaryNew/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primaryNew to-primaryNew/80 flex items-center justify-center shadow-lg shrink-0">
                            <ShieldCheck className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-foreground mb-1">
                                Complete Workplace Eligibility Assessment
                            </h3>
                            <div className="flex items-center gap-2 flex-wrap">
                                <Badge
                                    variant="primaryNew"
                                    outline
                                    Icon={User}
                                    text={courseInfo?.addedBy?.name}
                                />
                                <Badge
                                    variant="primaryNew"
                                    outline
                                    Icon={Briefcase}
                                    text={courseInfo?.addedBy?.role}
                                />
                                <Badge
                                    variant="primaryNew"
                                    outline
                                    Icon={Calendar}
                                    text={moment(courseInfo?.createdAt).format(
                                        'MMM DD, yyyy'
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <Badge
                        text={courseInfo?.status}
                        Icon={CheckCircle2}
                        shape="pill"
                        outline
                        variant="primaryNew"
                    />
                </div>
            </div>
        </div>
    )
}
