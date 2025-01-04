// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthUtils } from '@utils'
import { getSession } from 'next-auth/react'

// initialize an empty api service that we'll inject endpoints into later as needed

const adminTagTypes = [
    'Blog',
    'Tags',
    'SMS',
    'RPL',
    'Jobs',
    'RTOS',
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
    'Departments',
    'Subscribers',
    'Generate-Key',
    'NotesTemplates',
    'Insurance-Type',
    'WorkplaceTypes',
    'BlogCategories',
    'AllowRtoListing',
    'AppointmentTypes',
    'AutoAssignWorkplace',
    'TalentPoolProfiles',
]

const subadminTagTypes = [
    'TODO',
    'Setting',
    'Logbook',
    'SubAdmin',
    'SetSchedule',
    'Appointment',
    'RtosListing',
    'SubAdminRtos',
    'SubAdminReports',
    'SubAdminStudents',
    'SetUnAvailability',
    'SubAdminWorkplace',
    'AssessmentEvidence',
    'Coordinates',
    'SubAdminIndustries',
    'Department',
    'RequestToAddCourse',
]

const rtoTagTypes = [
    'RTO',
    'RTOMOU',
    'RTOCourses',
    'Rto-Students',
    'RTOWorkplace',
    'RtoDocuments',
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
    'MatchingProfiles',
    'RequestAVolunteer',
    'IndustryWorkplace',
    'IndustryAppointment',
    'TalentPoolCount',
]

const studentTagTypes = [
    'Workplace',
    'StudentJobs',
    'HighPriority',
    'StudentCourses',
    'StudentProfile',
    'Workplace-Apply',
    'StudentSchedule',
    'StudentDocuments',
    'StudentAppointments',
    'TalentPoolRequiredDocs',
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
    'E-Sign',
    'Avatar',
    'Course',
    'Country',
    'States',
    'Profile',
    'Messages',
    'Industry',
    'MailCount',
    'Agreement',
    'WorkBased',
    'Statistics',
    'BulkStatus',
    'Email Sign',
    'MailsRecent',
    'Traineeship',
    'Appointments',
    'Impersonation',
    'BulkUsersDelete',
    'RecentActivities',
    'AllNotifications',
    'AllCommunications',
    'StudentAppointments',
]

const managementTypes = [
    'KpiReportDocument',
    'KpiReportList',
    'TeamManagement',
    'KpiProgress',
    'TeamMembers',
    'RemoveTeam',
]
export const emptySplitApi = createApi({
    reducerPath: 'allApis',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/`,
        prepareHeaders: async (headers, { getState }) => {
            // const token = AuthUtils.getToken()
            const token = AuthUtils.token()

            // const session: any = await getSession()

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            // if (session?.accessToken) {
            //     headers.set('authorization', `Bearer ${session?.accessToken}`)
            // }
            return headers
        },
    }),
    tagTypes: [
        ...rtoTagTypes,
        ...adminTagTypes,
        ...commonTagTypes,
        ...studentTagTypes,
        ...managementTypes,
        ...industryTagTypes,
        ...subadminTagTypes,
    ],

    endpoints: () => ({}),
})
