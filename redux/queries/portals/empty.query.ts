// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/`,
        prepareHeaders: (headers, { getState }) => {
            const token = AuthUtils.getToken()
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: [
        'BulkStatus',
        'BulkUsersDelete',
        'RecentActivities',
        'User',
        'RTOS',
        'Notes',
        'Mails',
        'Avatar',
        'Course',
        'Industry',
        'Appointments',
        'AllCommunications',
        'AllNotifications',
        'Count',
        'Profile',
        'Students',
        'Subscribers',
        'Sectors',
        'SubAdmins',
        'Industries',
        'Courses',
        'Folders',
        'AppointmentTypes',
        'Jobs',
        'Messages',
        'Statistics',
        'Workplaces',
        'SMS',
        'Documents',
        'Setting',
        'SubAdmin',
        'Appointment',
        'SetSchedule',
        'SubAdminRtos',
        'SubAdminStudents',
        'SubAdminWorkplace',
        'AssessmentEvidence',
        'SubAdminIndustries',
        'RTO',
        'RTOMOU',
        'RTOCourses',
        'Rto-Students',
        'RTOWorkplace',
        'RTOIndustries',
        'ContactPersons',
        'RTOAppointment',
        'Rto-Coordinators',
        'RtoAssessmentToolsList',
        'RPL',
        'Employee',
        'Document',
        'EmployeeTask',
        'AvailableShifts',
        'StudentCourses',
        'StudentAppointments',
        'MailsRecent',
        'MailCount',
    ],
    endpoints: () => ({}),
})
