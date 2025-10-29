import moment from 'moment'
import { Target } from 'lucide-react'
import { RtoApprovalWorkplaceRequest } from '@types'

export const WorkplaceMatchScore = ({
    approval,
}: {
    approval: RtoApprovalWorkplaceRequest
}) => {
    return (
        <div>
            {/* <div className="flex items-center gap-1.5 mb-1">
                <Target className="h-3.5 w-3.5 text-primaryNew" />
                <span className="text-xs text-muted-foreground">
                    Match Quality
                </span>
            </div> */}
            {/* <div className="flex items-center gap-2">
                <span
                    className={`font-semibold text-sm ${getMatchScoreColor(
                        Number(approval.matchScore)
                    )}`}
                >
                    {approval.matchScore}%
                </span>
                <Progressbar
                    size="xs"
                    variant="primaryNew"
                    value={approval.matchScore}
                />
            </div> */}
            <p className="text-xs text-muted-foreground mt-0.5">
                Student approved{' '}
                {moment(approval?.updatedAt).format('MMM DD, YYYY')}
            </p>
        </div>
    )
}
