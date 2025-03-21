import { LineChart } from '../Charts'
import { SubAdminApi } from '@queries'
import moment, { Moment } from 'moment'
import { Card, LoadingAnimation, NoData } from '@components'

export const DeptEmployeeGraphCount = ({
    startDate,
    endDate,
}: {
    startDate?: Moment | null
    endDate?: Moment | null
}) => {
    const deptEmployeeProgressByMonth =
        SubAdminApi.Kpi.deptEmployeeProgressByMonth()

    return (
        <Card fullHeight>
            <LineChart employeeProgress={deptEmployeeProgressByMonth} />
        </Card>
    )
}
