import { Card, Select } from '@components'
import { ReportOptionsEnum } from '@types'
import React from 'react'
import { SubAdminReports } from 'types/sub-admin-reports.type'

type Props = {
    reportType: any
    setReportType: any
}

export const ReportType = ({ reportType, setReportType }: Props) => {
    const reportOptions = [
        {
            label: 'Assigned Students',
            value: SubAdminReports.ASSIGNED_STUDENTS,
        },
        {
            label: 'Student Have Workplace',
            value: SubAdminReports.STUDENT_HAVE_WORKPLACE,
        },
        { label: 'Active Students', value: SubAdminReports.ACTIVE_STUDENTS },
        { label: 'Archive Students', value: SubAdminReports.ARCHIVED_STUDENTS },
        { label: 'Students Calls', value: SubAdminReports.STUDENTS_CALLS },
        {
            label: 'Book Appointments',
            value: SubAdminReports.BOOK_APPOINTMENTS,
        },
        {
            label: 'Terminated Workplace ',
            value: SubAdminReports.TERMINATED_WORKPLACE,
        },
        {
            label: 'Completed Workplace ',
            value: SubAdminReports.COMPLETED_WORKPLACE,
        },
        {
            label: 'Cancelled Workplace ',
            value: SubAdminReports.CANCELLED_WORKPLACE,
        },
        {
            label: 'Placement Started ',
            value: SubAdminReports.PLACEMENT_STARTED,
        },
        {
            label: 'Students with no Workplace Requests',
            value: SubAdminReports.NO_WORKPLACE,
        },
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
