import React from 'react'
import { RadialChart } from '../Charts'
import { AdminApi } from '@queries'
import moment, { Moment } from 'moment'
import { LoadingAnimation, NoData } from '@components'

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
        <>
            {overAllEmployeeProgressCounts?.isError && (
                <NoData text="There is Some Technical Error!" />
            )}
            {overAllEmployeeProgressCounts?.isLoading ? (
                <LoadingAnimation />
            ) : overAllEmployeeProgressCounts?.data &&
              overAllEmployeeProgressCounts?.isSuccess ? (
                <RadialChart
                    employeeProgressCounts={overAllEmployeeProgressCounts?.data}
                />
            ) : overAllEmployeeProgressCounts?.isSuccess ? (
                <NoData text="No Counts Found!" />
            ) : null}
        </>
    )
}
