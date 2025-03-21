import React from 'react'
import { BarChart } from '../Charts'
import { AdminApi } from '@queries'
import { Card } from '@components'

export const EmployeeCounts = () => {
    const employeeCounts = AdminApi.Kpi.employeeCounts()
    return (
        <Card fullHeight>
            <BarChart employeeCounts={employeeCounts} />
        </Card>
    )
}
