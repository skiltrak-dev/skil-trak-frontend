import { DepartmentInfo } from '@partials/common/kpis'

export const departmentData: { [key: string]: DepartmentInfo } = {
    'Business 2 Business': {
        name: 'Business 2 Business',
        growth: 9.64,
        metrics: [
            { label: 'Appointment', value: 4, maxValue: 10, color: '#0365F5' },
            {
                label: 'Workplace request',
                value: 6,
                maxValue: 10,
                color: '#F5A70C',
            },
            { label: 'Completed', value: 8, maxValue: 10, color: '#FF0303' },
            {
                label: 'Agreement by student',
                value: 7,
                maxValue: 10,
                color: '#35E100',
            },
            {
                label: 'Agreement by workplace',
                value: 3,
                maxValue: 10,
                color: '#207D04',
            },
        ],
        activities: [
            { label: 'Call industries', value: 4 },
            { label: 'Call Student', value: 6 },
            { label: 'new Signup industries', value: 8 },
            { label: 'new Student added', value: 5 },
            { label: 'Student moved to Flashing', value: 7 },
            { label: 'Student Removed to Flashing', value: 3 },
            { label: 'Flagged Student', value: 4 },
            { label: 'Snoozed Student', value: 9 },
        ],
        chartSegments: [
            { label: 'Appointment', value: 4, color: '#0365F5' },
            { label: 'Workplace request', value: 6, color: '#F5A70C' },
            { label: 'Completed', value: 8, color: '#FF0303' },
            { label: 'Agreement by student', value: 7, color: '#35E100' },
            { label: 'Agreement by workplace', value: 3, color: '#207D04' },
        ],
    },
}
