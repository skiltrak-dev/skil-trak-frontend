import React from 'react'
import { RadialChart } from '../Charts'
import { SubAdminApi } from '@queries'
import moment, { Moment } from 'moment'
import { Card, LoadingAnimation, NoData } from '@components'

export const DeptEmployeeProgressCount = ({
    startDate,
    endDate,
}: {
    startDate?: Moment | null
    endDate?: Moment | null
}) => {
    const deptEmployeeProgressCounts =
        SubAdminApi.Kpi.deptEmployeeProgressCounts(
            {
                search: `startDate:${moment(startDate).format(
                    'YYYY-MM-DD'
                )},endDate:${moment(endDate).format('YYYY-MM-DD')}`,
            },
            {
                skip: !startDate || !endDate,
            }
        )

    return (
        <Card fullHeight>
            <RadialChart employeeProgressCounts={deptEmployeeProgressCounts} />
        </Card>
    )
}
