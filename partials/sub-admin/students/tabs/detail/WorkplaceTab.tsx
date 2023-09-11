import { WorkplaceHistory } from './WorkplaceHistory'
import { WorkplaceInfo } from './WorkplaceInfo'

export const WorkplaceTab = ({ studentId }: { studentId: number }) => {
    return (
        <div>
            <WorkplaceInfo studentId={studentId} />
            <WorkplaceHistory />
        </div>
    )
}
