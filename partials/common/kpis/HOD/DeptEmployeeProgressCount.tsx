import React from 'react'
import { RadialChart } from '../Charts'
import { SubAdminApi } from '@queries'
import moment, { Moment } from 'moment'
import { LoadingAnimation, NoData } from '@components'

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
        <>
            {deptEmployeeProgressCounts?.isError && (
                <NoData text="There is Some Technical Error!" />
            )}
            {deptEmployeeProgressCounts?.isLoading ? (
                <LoadingAnimation />
            ) : deptEmployeeProgressCounts?.data &&
              deptEmployeeProgressCounts?.isSuccess ? (
                <RadialChart
                    employeeProgressCounts={deptEmployeeProgressCounts?.data}
                />
            ) : deptEmployeeProgressCounts?.isSuccess ? (
                <NoData text="No Counts Found!" />
            ) : null}
        </>
    )
}
