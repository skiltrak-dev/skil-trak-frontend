import React from 'react'
import { BarChart } from '../Charts'
import { AdminApi } from '@queries'

export const EmployeeCounts = () => {
    const employeeCounts = AdminApi.Kpi.employeeCounts()
    return (
        <div>
            <BarChart employeeCounts={employeeCounts?.data} />
        </div>
    )
}
