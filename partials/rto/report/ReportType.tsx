import { Card, Select } from '@components'
import { ReportOptionsEnum } from '@types'
import React from 'react'

type Props = {
    reportType: any
    setReportType: any
}

export const ReportType = ({
    reportType,
    setReportType,
}: Props) => {
    const reportOptions = [
        { label: 'Non Contactable', value: ReportOptionsEnum.NON_CONTACTABLE },
        { label: 'New Students', value: ReportOptionsEnum.NEW_STUDENTS },
        { label: 'Blocked Students', value: ReportOptionsEnum.BLOCKED_STUDENTS },
        { label: 'Cancelled Workplace Request', value: ReportOptionsEnum.CANCELLED_WORKPLACE_REQUEST },
        { label: 'Workplace Request Completed', value: ReportOptionsEnum.WORKPLACE_REQUEST_COMPLETED },
        { label: 'Workplace Request Terminated', value: ReportOptionsEnum.WORKPLACE_REQUEST_TERMINATED },
        { label: 'Archived Students', value: ReportOptionsEnum.ARCHIVED_STUDENTS },
        { label: 'Workplace Request', value: ReportOptionsEnum.WORKPLACE_REQUEST },
        { label: 'Student Without Workplace Request', value: ReportOptionsEnum.STUDENT_WITHOUT_WORKPLACE_REQUEST },
        { label: 'Appointments Report', value: ReportOptionsEnum.APPOINTMENTS_REPORT },
        { label: 'Reported Students', value: ReportOptionsEnum.REPORTED_STUDENTS }
    ]

   
    return (
        <>
            <Select
                name="reportType"
                label="Reports Type"
                value={reportType}
                options={reportOptions}
                onChange={(e: any) => {
                    setReportType(e)
                }}
            />
        </>
    )
}
