import React from 'react'
import { BarChart } from '../Charts'
import { SubAdminApi } from '@queries'

export const HodEmployeeCounts = () => {
    const employeeCounts = SubAdminApi.Kpi.deptEmployeeCounts()
    return (
        <div>
            <BarChart employeeCounts={employeeCounts?.data} />
        </div>
    )
}
