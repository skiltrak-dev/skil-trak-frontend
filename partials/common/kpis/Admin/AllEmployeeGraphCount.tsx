import { AdminApi } from '@queries'
import { LineChart } from '../Charts'
import moment, { Moment } from 'moment'
import { Card, LoadingAnimation, NoData } from '@components'

export const AllEmployeeGraphCount = () => {
    const overAllEmployeeProgressByMonth =
        AdminApi.Kpi.overAllEmployeeProgressByMonth()

    return (
        <Card fullHeight>
            <LineChart employeeProgress={overAllEmployeeProgressByMonth} />
        </Card>
    )
}
