import { Card, Select, Typography } from '@components'
import { ReportOptionsEnum } from '@types'
import { useRouter } from 'next/router'
import React from 'react'
import { SubAdminReports } from 'types/sub-admin-reports.type'

type Props = {
    reportType: any
    onReportChange: (e: SubAdminReports) => void
}

export const ReportType = ({ reportType, onReportChange }: Props) => {
    const router = useRouter()
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
        // { label: 'Archive Students', value: SubAdminReports.ARCHIVED_STUDENTS },
        { label: 'Students Calls', value: SubAdminReports.STUDENTS_CALLS },
        {
            label: 'Book Appointments',
            value: SubAdminReports.BOOK_APPOINTMENTS,
        },
        {
            label: 'Terminated Students ',
            value: SubAdminReports.TERMINATED_STUDENTS,
        },
        {
            label: 'Completed Students',
            value: SubAdminReports.COMPLETED_STUDENTS,
        },
        {
            label: 'Cancelled Students',
            value: SubAdminReports.CANCELLED_STUDENTS,
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
        <div className="flex items-center gap-x-4">
            <Typography variant="label">Reports Type:</Typography>
            <Select
                name="reportType"
                value={reportOptions?.find(
                    (report) => report?.value === reportType
                )}
                options={reportOptions}
                onChange={(e: SubAdminReports) => {
                    onReportChange(e)
                }}
                onlyValue
                showError={false}
            />
        </div>
    )
}
