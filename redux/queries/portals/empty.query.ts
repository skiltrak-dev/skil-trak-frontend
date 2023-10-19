// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'

// initialize an empty api service that we'll inject endpoints into later as needed

const adminTagTypes = [
    'SMS',
    'RPL',
    'Jobs',
    'RTOS',
    'Notes',
    'Folders',
    'Profile',
    'Message',
    'Sectors',
    'Tickets',
    'Courses',
    'Students',
    'Documents',
    'Volunteer',
    'SubAdmins',
    'Industries',
    'Workplaces',
    'Subscribers',
    'AppointmentTypes',
]

const subadminTagTypes = [
    'Setting',
    'SubAdmin',
    'SetSchedule',
    'Appointment',
    'SubAdminRtos',
    'SubAdminReports',
    'SubAdminStudents',
    'SetUnAvailability',
    'SubAdminWorkplace',
    'AssessmentEvidence',
    'SubAdminIndustries',
]

const rtoTagTypes = [
    'RTO',
    'RTOMOU',
    'RTOCourses',
    'Rto-Students',
    'RTOWorkplace',
    'RTOIndustries',
    'RTOAppointment',
    'ContactPersons',
    'Rto-Coordinators',
    'RtoAssessmentToolsList',
]

const industryTagTypes = [
    'RPL',
    'Job',
    'MOU',
    'Course',
    'Message',
    'Branches',
    'Employee',
    'Document',
    'Students',
    'HeadQuarter',
    'EmployeeTask',
    'Notifications',
    'AvailableShifts',
    'RequestAVolunteer',
    'IndustryWorkplace',
    'IndustryAppointment',
]

const studentTagTypes = [
    'Workplace',
    'StudentJobs',
    'StudentCourses',
    'StudentProfile',
    'StudentSchedule',
    'StudentAppointments',
    'StudentAssessmentEvidence',
    'StudentAssessmentEvidence',
]

const commonTagTypes = [
    'RTO',
    'User',
    'Count',
    'Draft',
    'Notes',
    'Mails',
    'Avatar',
    'Course',
    'Profile',
    'Messages',
    'Industry',
    'MailCount',
    'Agreement',
    'Statistics',
    'BulkStatus',
    'MailsRecent',
    'Appointments',
    'BulkUsersDelete',
    'RecentActivities',
    'AllNotifications',
    'AllCommunications',
    'StudentAppointments',
]
export const emptySplitApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/`,
        prepareHeaders: (headers, { getState }) => {
            // const token = AuthUtils.getToken()
            const token = AuthUtils.token()

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: [
        ...rtoTagTypes,
        ...adminTagTypes,
        ...commonTagTypes,
        ...studentTagTypes,
        ...industryTagTypes,
        ...subadminTagTypes,
    ],

    endpoints: () => ({}),
})
