import { Card, Select } from '@components'
import React from 'react'

type Props = {
    reportType: any
    setReportType: any
}

export const ReportType = ({
    reportType,
    setReportType,
}: Props) => {
    const data = [
        { label: 'Non Contactable', value: 'non-contactable' },
        { label: 'New Students', value: 'new-students' },
        { label: 'Blocked Students', value: 'blocked-students' },
        { label: 'Cancelled Workplace Request', value: 'cancelled-workplace-request' },
        { label: 'Workplace Request Completed', value: 'workplace-request-completed' },
        { label: 'Workplace Request Terminated', value: 'workplace-request-terminated' },
        { label: 'Archived Students', value: 'archived-students' },
    ]

    const reportOptions = data.map((m) => ({
        label: m.label,
        value: m.value,
    }))
    return (
        <>
            <Select
                name="reportType"
                label="Report Type"
                value={reportType}
                options={reportOptions}
                onChange={(e: any) => {
                    setReportType(e)
                }}
            />
        </>
    )
}
