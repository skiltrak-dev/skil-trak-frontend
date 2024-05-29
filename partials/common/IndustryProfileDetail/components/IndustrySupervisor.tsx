import { Card, Typography } from '@components'
import { Supervisor } from '@partials/common/IndustrySupervisor'
import { Industry } from '@types'
import React from 'react'

export const IndustrySupervisor = ({ industry }: { industry: Industry }) => {
    return (
        <div>
            {/*  */}
            <Supervisor industry={industry} />
        </div>
    )
}
