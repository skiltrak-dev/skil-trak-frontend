import { CheckCircle2, ShieldCheck } from 'lucide-react'
import React from 'react'
import { Badge } from '@components'
import { WorkplaceStatusLabels } from '@utils'

export const WorkplaceStatus = ({
    workplaceRequest,
}: {
    workplaceRequest: any
}) => {
    return (
        <div>
            <div className="flex items-center gap-1.5 mb-1">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />
                <span className="text-xs text-muted-foreground">
                    Workplace Status
                </span>
            </div>
            <Badge
                Icon={CheckCircle2}
                text={
                    WorkplaceStatusLabels[
                        workplaceRequest?.currentStatus as keyof typeof WorkplaceStatusLabels
                    ]
                }
                shape="pill"
                variant="primaryNew"
                outline
            />

            <p className="text-xs text-muted-dark">
                By {workplaceRequest?.assignedTo?.user?.name}
            </p>
        </div>
    )
}
