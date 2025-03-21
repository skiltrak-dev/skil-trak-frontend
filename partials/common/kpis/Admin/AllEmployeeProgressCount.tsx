import React from 'react'
import { RadialChart } from '../Charts'
import { AdminApi } from '@queries'
import moment, { Moment } from 'moment'
import { Card, LoadingAnimation, NoData } from '@components'

export const AllEmployeeProgressCount = ({
    startDate,
    endDate,
}: {
    startDate?: Moment | null
    endDate?: Moment | null
}) => {
    const overAllEmployeeProgressCounts =
        AdminApi.Kpi.overAllEmployeeProgressCounts(
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
            <RadialChart
                employeeProgressCounts={overAllEmployeeProgressCounts}
            />
        </Card>
    )
}
