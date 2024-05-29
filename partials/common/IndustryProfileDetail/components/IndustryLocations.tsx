import { Card, Typography } from '@components'
import { IndustryBranchesAddress } from '@partials/common/IndustryBranchesAddress'
import { Industry } from '@types'
import React from 'react'

export const IndustryLocations = ({ industry }: { industry: Industry }) => {
    return (
        <div>
            <IndustryBranchesAddress industry={industry} />
        </div>
    )
}
