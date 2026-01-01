import { IndustryProgressBar } from '@partials/common/IndustryProfileDetail/components'
import { Industry } from '@types'
import { IndustryCell } from './IndustryCell'

export const ProgressIndustryCell = ({ industry }: { industry: Industry }) => {
    return (
        <div className="flex flex-col gap-y-2">
            <IndustryCell industry={industry} />
            {/* {Number(industry?.profileCompletionPercentage) ? (
                <IndustryProgressBar
                    height={12}
                    showPercentage
                    missingAttributes={industry?.missingAttributes}
                    percentage={Number(industry?.profileCompletionPercentage)}
                />
            ) : null} */}
        </div>
    )
}
