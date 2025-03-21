import React from 'react'
import { BarChart } from '../Charts'
import { SubAdminApi } from '@queries'
import { Card } from '@components'

export const HodEmployeeCounts = () => {
    const employeeCounts = SubAdminApi.Kpi.deptEmployeeCounts()
    return (
        <Card fullHeight>
            <BarChart employeeCounts={employeeCounts} />
        </Card>
    )
}
