import { Typography } from '@components'
import { IndustryCellInfo } from '@partials/sub-admin/Industries'
import { Industry } from '@types'
import { studentsListWorkplace } from '@utils'
import React from 'react'
import { IWorkplaceIndustries } from 'redux/queryTypes'

export const SubadminStudentIndustries = ({
    workplace,
    industries,
}: {
    industries: Industry[]
    workplace: IWorkplaceIndustries[]
}) => {
    const appliedIndustry = studentsListWorkplace(workplace)
    return workplace && workplace?.length > 0 && appliedIndustry ? (
        <IndustryCellInfo industry={appliedIndustry} />
    ) : industries && industries?.length > 0 ? (
        <IndustryCellInfo industry={industries?.[0]} />
    ) : (
        <Typography center>N/A</Typography>
    )
}
