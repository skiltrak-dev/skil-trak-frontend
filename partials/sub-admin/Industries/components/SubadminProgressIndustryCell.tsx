import React from 'react'
import { Industry } from '@types'
import { IndustryCellInfo } from './IndustryCellInfo'
import { IndustryProgressBar } from '@partials/common/IndustryProfileDetail/components'

export const SubadminProgressIndustryCell = ({
    industry,
}: {
    industry: Industry
}) => {
    return (
        <div className="flex flex-col gap-y-2">
            <IndustryCellInfo industry={industry} />
            {/* {Number(industry?.profileCompletionPercentage) ? (
                <IndustryProgressBar
                    showPercentage
                    percentage={Number(industry?.profileCompletionPercentage)}
                    height={12}
                    missingAttributes={industry?.missingAttributes}
                />
            ) : null} */}
        </div>
    )
}
