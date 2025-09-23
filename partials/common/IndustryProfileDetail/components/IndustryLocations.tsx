import { IndustryBranchesAddress } from '@partials/common/IndustryBranchesAddress'
import { Industry } from '@types'

export const IndustryLocations = ({ industry }: { industry: Industry }) => {
    return (
        <div className="mt-4">
            <IndustryBranchesAddress industry={industry} />
        </div>
    )
}
