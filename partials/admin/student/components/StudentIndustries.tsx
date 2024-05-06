import { Typography } from '@components'
import { IndustryCell } from '@partials/admin/industry/components'
import { Industry } from '@types'
import { studentsListWorkplace } from '@utils'
import React from 'react'
import { IWorkplaceIndustries } from 'redux/queryTypes'

export const StudentIndustries = ({
    workplace,
    industries,
}: {
    industries: Industry[]
    workplace: IWorkplaceIndustries[]
}) => {
    const appliedIndustry = studentsListWorkplace(workplace)
    return workplace && workplace?.length > 0 && appliedIndustry ? (
        <IndustryCell industry={appliedIndustry} />
    ) : industries && industries?.length > 0 ? (
        <IndustryCell industry={industries?.[0]} />
    ) : (
        <Typography center>N/A</Typography>
    )
}
