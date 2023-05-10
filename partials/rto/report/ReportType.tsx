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
        { label: 'Workplace Request', value: 'workplace-request' },
        { label: 'Student Without Workplace Request', value: 'without-workplace-request' },
        { label: 'Appointments Report', value: 'appointments-report' },
        { label: 'Reported Students', value: 'reported-students' }


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
