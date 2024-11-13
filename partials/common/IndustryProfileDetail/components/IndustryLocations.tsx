import { Card, Typography } from '@components'
import { IndustryBranchesAddress } from '@partials/common/IndustryBranchesAddress'
import { Industry } from '@types'
import React from 'react'

export const IndustryLocations = ({ industry }: { industry: Industry }) => {
    return (
        <div className='mt-4'>
            <IndustryBranchesAddress industry={industry} />
        </div>
    )
}
